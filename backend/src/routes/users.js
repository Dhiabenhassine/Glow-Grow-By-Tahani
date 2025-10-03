import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { getDb } from '../lib/db.js';

const router = express.Router();

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const { User } = getDb();

    // Find the logged-in user by ID (req.user.id comes from JWT)
    const me = await User.findById(req.user.id)
      .select('email name role created_at')
      .lean();

    if (!me) return res.status(404).json({ error: 'User not found' });

    res.json({
      id: me._id,
      email: me.email,
      name: me.name,
      role: me.role,
      created_at: me.created_at
    });
  } catch (e) {
    next(e);
  }
});

router.get('/admin', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const { User } = getDb();

    const users = await User.find({})
      .select('email name role created_at')
      .sort({ _id: -1 })
      .lean();

    // Normalize _id to id for frontend
    res.json(
      users.map((u) => ({
        id: u._id,
        email: u.email,
        name: u.name,
        role: u.role,
        created_at: u.created_at
      }))
    );
  } catch (e) {
    next(e);
  }
});

export default router;
