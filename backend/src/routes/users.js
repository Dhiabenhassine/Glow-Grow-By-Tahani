import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { getDb } from '../lib/db.js';
import bcrypt from "bcryptjs";

const router = express.Router();

router.put("/me/update-password", requireAuth, async (req, res, next) => {
  try {
    const { User } = getDb();
    const { oldPassword, newPassword } = req.body;

    // Validate input
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Old and new passwords are required." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters long." });
    }

    // Find user and explicitly select password field
    const user = await User.findById(req.user.id).select('+password_hash');
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if password exists
    if (!user.password_hash) {
      return res.status(400).json({ error: "User does not have a password set." });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Old password is incorrect." });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    // Save new password to the correct field
    user.password_hash = hashed;
    await user.save();

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Error updating password:", err);
    next(err);
  }
});




router.put("/me/update-profile", requireAuth, async (req, res, next) => {
  try {
    const { User } = getDb();
    const userId = req.user.id;
    const { name, email } = req.body;

    // Validate at least one field
    if (!name && !email) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    const updateFields = {};
    if (name) {
      if (typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({ error: "Invalid name" });
      }
      updateFields.name = name.trim();
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Check if email already exists
      const existing = await User.findOne({ email, _id: { $ne: userId } });
      if (existing) {
        return res.status(400).json({ error: "Email already in use" });
      }

      updateFields.email = email.trim().toLowerCase();
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("name email role created_at");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("PUT /me/update-profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const { User, Pack, Subscription } = getDb();

    const me = await User.findById(req.user.id)
      .select('email name role created_at')
      .lean();
    if (!me) return res.status(404).json({ error: 'User not found' });

    const subscription = await Subscription.findOne({ user_id: req.user.id })
      .sort({ createdAt: -1 }) // latest one
      .lean();

    let pack = null;
    let subscriptionStatus = "none";
    let subscriptionEnd = null;

    if (subscription) {
      if (subscription.end_date && new Date(subscription.end_date) < new Date()) {
        subscriptionStatus = "expired";
        subscriptionEnd = subscription.end_date;
      } else {
        subscriptionStatus = "active";
        subscriptionEnd = subscription.end_date;
      }

      if (subscription.pack_id) {
        pack = await Pack.findById(subscription.pack_id).lean();
      }
    }

    res.json({
      user: me,
      subscription: {
        status: subscriptionStatus,
        end_date: subscriptionEnd,
        ...(subscription ? { _id: subscription._id, pack_id: subscription.pack_id } : {}),
      },
      pack
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