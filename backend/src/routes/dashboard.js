import { getDb } from '../lib/db.js';
import express from 'express';
const router = express.Router();

/* ============================================================
   1️⃣  Total Users
============================================================ */
router.get('/total-users', async (req, res) => {
  const { User } = getDb();
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({ error: 'Failed to fetch total users' });
  }
});

/* ============================================================
   2️⃣  Active Subscriptions
============================================================ */
router.get('/active-subscriptions', async (req, res) => {
  const { Subscription } = getDb();
  try {
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    res.json({ activeSubscriptions });
  } catch (error) {
    console.error('Error fetching active subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch active subscriptions' });
  }
});

/* ============================================================
   3️⃣  Expired Subscriptions
============================================================ */
router.get('/expired-subscriptions', async (req, res) => {
  const { Subscription } = getDb();
  try {
    const expiredSubscriptions = await Subscription.countDocuments({ status: 'expired' });
    res.json({ expiredSubscriptions });
  } catch (error) {
    console.error('Error fetching expired subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch expired subscriptions' });
  }
});

/* ============================================================
   4️⃣  Total Income (All Time)
============================================================ */
router.get('/total-income', async (req, res) => {
  const { PackPurchase } = getDb();
  try {
    const result = await PackPurchase.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount_cents' } } }
    ]);

    const totalIncomeUSD = ((result[0]?.total || 0) / 100).toFixed(2);
    res.json({ totalIncomeUSD });
  } catch (error) {
    console.error('Error fetching total income:', error);
    res.status(500).json({ error: 'Failed to fetch total income' });
  }
});

/* ============================================================
   5️⃣  Monthly Income (Current Month)
============================================================ */
router.get('/monthly-income', async (req, res) => {
  const { PackPurchase } = getDb();
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const result = await PackPurchase.aggregate([
      {
        $match: {
          status: 'completed',
          created_at: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$amount_cents' } } }
    ]);

    const monthlyIncomeUSD = ((result[0]?.total || 0) / 100).toFixed(2);
    res.json({ monthlyIncomeUSD });
  } catch (error) {
    console.error('Error fetching monthly income:', error);
    res.status(500).json({ error: 'Failed to fetch monthly income' });
  }
});

/* ============================================================
   6️⃣  Top 5 Selling Packs
============================================================ */
router.get('/top-packs', async (req, res) => {
  const { PackPurchase } = getDb();
  try {
    const topPacks = await PackPurchase.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: '$pack_id', totalSales: { $sum: '$amount_cents' }, count: { $sum: 1 } } },
      { $sort: { totalSales: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'packs',
          localField: '_id',
          foreignField: '_id',
          as: 'pack_info'
        }
      },
      { $unwind: '$pack_info' },
      {
        $project: {
          _id: 0,
          name: '$pack_info.name',
          totalSalesUSD: { $divide: ['$totalSales', 100] },
          purchases: '$count'
        }
      }
    ]);

    res.json({ topPacks });
  } catch (error) {
    console.error('Error fetching top packs:', error);
    res.status(500).json({ error: 'Failed to fetch top packs' });
  }
});

/* ============================================================
   7️⃣  Daily Income Trend (For Charts)
============================================================ */
router.get('/daily-income-trend', async (req, res) => {
  const { PackPurchase } = getDb();
  try {
    const dailyIncome = await PackPurchase.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
          total: { $sum: '$amount_cents' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    const formatted = dailyIncome.map(item => ({
      date: item._id,
      incomeUSD: (item.total / 100).toFixed(2)
    }));

    res.json({ dailyIncome: formatted });
  } catch (error) {
    console.error('Error fetching daily income trend:', error);
    res.status(500).json({ error: 'Failed to fetch daily income trend' });
  }
});

/* ============================================================
   8️⃣  User Signup Trend
============================================================ */
router.get('/user-signup-trend', async (req, res) => {
  const { User } = getDb();
  try {
    const userSignups = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    const formatted = userSignups.map(item => ({
      date: item._id,
      signups: item.count
    }));

    res.json({ userSignups: formatted });
  } catch (error) {
    console.error('Error fetching user signup trend:', error);
    res.status(500).json({ error: 'Failed to fetch user signup trend' });
  }
});

export default router;
