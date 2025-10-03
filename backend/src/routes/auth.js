// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { getDb } from '../lib/db.js';
import { signJwt } from '../utils/jwt.js';

const router = express.Router();

/* =======================
   Helper: Check subscription
======================= */
async function checkSubscriptionOnLogin(userId) {
  const { Subscription } = getDb();
  const now = new Date();

  const subscription = await Subscription.find({ user_id: userId });

  if (subscription && subscription.status === 'active') {
    if (subscription.current_period_end < now) {
      subscription.status = 'expired';
      await subscription.save();
      console.log(`⚠️ Subscription expired for user ${userId}`);
    }
  }

  return subscription;
}

/* =======================
   Register
======================= */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
    body('name').isLength({ min: 2 }).withMessage('Nom trop court'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password, name } = req.body;
      const { User } = getDb();

      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ error: 'Email déjà utilisé' });

      const password_hash = await bcrypt.hash(password, 10);

      const user = await User.create({ email, password_hash, name, role: 'user' });

      const token = signJwt({
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      });

      res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token,
      });
    } catch (e) {
      next(e);
    }
  }
);

/* =======================
   Login
======================= */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const { User } = getDb();

      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: 'Identifiants invalides' });

      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) return res.status(401).json({ error: 'Identifiants invalides' });

      const token = signJwt({
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      });

      // ✅ Check subscription and update status if expired
      const subscription = await checkSubscriptionOnLogin(user._id);

      res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token,
        subscription, // ✅ return subscription so frontend knows status
      });
    } catch (e) {
      next(e);
    }
  }
);

/* =======================
   Logout
======================= */
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

export default router;
