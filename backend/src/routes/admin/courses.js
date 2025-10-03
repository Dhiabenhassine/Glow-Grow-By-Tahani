import express from "express";
import { getDb } from "../../lib/db.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { Course } = getDb();
    const rows = await Course.find({})
      .populate("category_id", "name")
      .sort({ _id: -1 })
      .lean();

    res.json(rows.map(c => ({
      id: c._id,
      ...c,
      category_name: c.category_id?.name || null
    })));
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const { Course } = getDb();
    const { title, description, price_cents, category_id, level, is_published, coach_name } = req.body;
    const c = await Course.create({
      title,
      description,
      price_cents: price_cents || 0,
      category_id,
      level: level || "debutant",
      is_published: !!is_published,
      coach_name
    });
    res.json({ id: c._id });
  } catch (e) { next(e); }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { Course } = getDb();
    const updateData = {};
    ["title", "description", "price_cents", "category_id", "level", "coach_name"].forEach(f => {
      if (req.body[f] !== undefined) updateData[f] = req.body[f];
    });
    if (req.body.is_published !== undefined) updateData.is_published = !!req.body.is_published;

    await Course.findByIdAndUpdate(req.params.id, { $set: updateData });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { Course } = getDb();
    await Course.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
