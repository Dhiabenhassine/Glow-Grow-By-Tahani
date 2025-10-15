// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { getDb } from '../lib/db.js';
import { signJwt } from '../utils/jwt.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { requireAuth } from '../middleware/auth.js';

dotenv.config();
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
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const { User } = getDb();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    // Generate token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://yourfrontend.com/reset-password/${token}`;
console.log('token', token)
    await transporter.sendMail({
      to: user.email,
      subject: 'Réinitialisation du mot de passe',
      html: `<p>Vous avez demandé une réinitialisation de mot de passe.</p>
             <p>Cliquez <a href="${resetUrl}">ici</a> pour réinitialiser votre mot de passe.</p>`
    });

    res.json({ ok: true, message: 'Email de réinitialisation envoyé' });
  } catch (err) {
    next(err);
  }
});

router.post('/reset-password/:token', async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const { User } = getDb();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } // token not expired
    });

    if (!user) return res.status(400).json({ error: 'Token invalide ou expiré' });

    // Hash new password
if (!password || typeof password !== 'string') {
  return res.status(400).json({ error: 'Mot de passe invalide' });
}
user.password_hash = await bcrypt.hash(String(password), 10);

    // Clear reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ ok: true, message: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    next(err);
  }
});
export default router;
