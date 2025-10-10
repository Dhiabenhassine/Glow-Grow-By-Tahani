import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getDb } from '../lib/db.js';
import dotenv from 'dotenv';
import paypal from '@paypal/checkout-server-sdk';

dotenv.config();
const router = express.Router();

/* =======================
   PayPal Setup
======================= */
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  // FIXED: Sandbox for development/testing, Live for production
  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function paypalClient() {
  return new paypal.core.PayPalHttpClient(environment());
}
console.log(`🟢 PayPal running in: ${process.env.NODE_ENV === 'production' ? 'LIVE' : 'SANDBOX'}`);

/* =======================
   Subscription Logic
======================= */
export async function handlePaymentCompletion(userId, packId, planLabel) {
  const { Pack, Subscription } = getDb();

  const pack = await Pack.findById(packId);
  if (!pack) throw new Error('Pack not found');

  // Find plan inside pack
  const plan = pack.plans.find(p => p.label === planLabel);
  if (!plan) throw new Error('Plan not found in pack');

  let subscription = await Subscription.findOne({ user_id: userId, pack_id: packId });
  const now = new Date();

  const newEndDate =
    subscription && subscription.current_period_end > now
      ? new Date(subscription.current_period_end.getTime() + plan.duration_days * 86400000)
      : new Date(now.getTime() + plan.duration_days * 86400000);

  if (subscription) {
    subscription.current_period_end = newEndDate;
    subscription.status = 'active';
    await subscription.save();
  } else {
    await Subscription.create({
      user_id: userId,
      pack_id: packId,
      plan: planLabel,
      current_period_end: newEndDate,
      status: 'active'
    });
  }
}

/* =======================
   Subscribe Route
======================= */
router.post('/subscribe', requireAuth, async (req, res) => {
  try {
    const client = paypalClient();
    const { packId, planLabel } = req.body;
    const userId = req.user.id;
    const { Pack, PackPurchase, Promotion } = getDb();

    // 1. Find the pack
    const pack = await Pack.findById(packId);
    if (!pack) return res.status(404).json({ message: 'Pack not found' });

    // 2. Find the selected plan
    const plan = pack.plans.find(p => p.label === planLabel);
    if (!plan) return res.status(400).json({ message: 'Plan not found in pack' });

    let finalPriceCents = plan.price_cents;
    let activePromo = null;

    // 3. Check if a promotion is currently active
    const now = new Date();
    activePromo = await Promotion.findOne({
      valid_from: { $lte: now },
      valid_to: { $gte: now }
    });

    if (activePromo) {
      // Apply percentage-based or fixed-value discount automatically
      if (activePromo.value > 0) {
        if (activePromo.value <= 100) {
          // Treat as percentage discount
          finalPriceCents = Math.round(plan.price_cents * (1 - activePromo.value / 100));
        } else {
          // Treat as fixed discount in cents
          finalPriceCents = Math.max(plan.price_cents - activePromo.value, 0);
        }
      }
    }

    // 4. Create a pending purchase record
    const purchase = await PackPurchase.create({
      user_id: userId,
      pack_id: packId,
      amount_cents: finalPriceCents,
      currency: 'USD',
      status: 'pending',
      promotion_applied: activePromo ? activePromo.type : null // store which promo applied
    });

    // 5. Create PayPal order
    const orderRequest = new paypal.orders.OrdersCreateRequest();
    orderRequest.prefer('return=representation');
    orderRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: (finalPriceCents / 100).toFixed(2)
          },
          description: `${pack.name} - ${plan.label}${activePromo ? ` (Promo: ${activePromo.type})` : ''}`,
          custom_id: JSON.stringify({ userId, planLabel }),
          invoice_id: packId.toString()
        }
      ],
      application_context: {
        brand_name: 'MyApp',
        return_url: `${process.env.FRONTEND_URL}/paypal/success?purchaseId=${purchase._id}`,
        cancel_url: `${process.env.FRONTEND_URL}/paypal/cancel?purchaseId=${purchase._id}`
      }
    });

    const order = await client.execute(orderRequest);

    // 6. Save PayPal order ID
    purchase.paypal_order_id = order.result.id;
    await purchase.save();

    res.json({
      ...order.result,
      applied_promotion: activePromo ? activePromo.type : null,
      final_price_usd: (finalPriceCents / 100).toFixed(2)
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    res.status(500).json({ error: err.message });
  }
});


/* =======================
   PayPal Webhook
======================= */
router.post('/paypal-webhook', async (req, res) => {
  try {
    const event = req.body;
    const { PackPurchase } = getDb();

    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const resource = event.resource || {};
      const purchaseUnit = resource.purchase_units?.[0] || {};

      // Parse userId and planLabel from custom_id
      let userId, planLabel;
      try {
        const custom = JSON.parse(purchaseUnit.custom_id || '{}');
        userId = custom.userId;
        planLabel = custom.planLabel;
      } catch {
        console.warn('⚠️ Invalid custom_id format');
      }
      
      console.log('user', userId);
      console.log('label', planLabel);
      
      const packId = purchaseUnit.invoice_id;

      if (!userId || !packId || !planLabel) {
        console.warn('⚠️ Missing userId/packId/plan in webhook payload');
        return res.status(400).send('Invalid webhook payload');
      }

      // Find purchase record
      const purchase = await PackPurchase.findOne({ user_id: userId, pack_id: packId });
      if (!purchase) {
        console.warn(`⚠️ Purchase not found for user ${userId}, pack ${packId}`);
        return res.status(404).send('Purchase not found');
      }

      purchase.status = 'completed';
      purchase.paypal_order_id = resource.id || purchase.paypal_order_id;
      await purchase.save();

      // Extend subscription
      await handlePaymentCompletion(userId, packId, planLabel);

      console.log(`✅ Subscription updated for user ${userId}, pack ${packId}, plan ${planLabel}`);
    }

    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Server error');
  }
});

export default router;