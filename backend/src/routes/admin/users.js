import express from "express";
import { getDb } from "../../lib/db.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const { User } = getDb();
    const rows = await User.find({})
      .select("email name role created_at")
      .sort({ _id: -1 })
      .lean();
    res.json(rows.map(u => ({ id: u._id, ...u })));
  } catch (e) { next(e); }
});

// Update user
router.patch("/:id", async (req, res, next) => {
  try {
    const { User } = getDb();
    const { name, role } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
      $set: { ...(name && { name }), ...(role && { role }) }
    });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Delete user
router.delete("/:id", async (req, res, next) => {
  try {
    const { User } = getDb();
    await User.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
