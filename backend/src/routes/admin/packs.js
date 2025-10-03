import express from "express";
import { getDb } from "../../lib/db.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { Pack } = getDb();
    const rows = await Pack.find({}).sort({ _id: -1 }).lean();
    res.json(rows.map(p => ({ id: p._id, ...p })));
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const { Pack, PackCourse } = getDb();
    const { name, description, price_cents, is_published, course_ids = [] } = req.body;
    const pack = await Pack.create({ name, description, price_cents, is_published: !!is_published });

    if (Array.isArray(course_ids)) {
      for (const cid of course_ids) {
        await PackCourse.create({ pack_id: pack._id, course_id: cid });
      }
    }

    res.json({ id: pack._id });
  } catch (e) { next(e); }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { Pack, PackCourse } = getDb();
    const { name, description, price_cents, is_published, course_ids } = req.body;
    const updateData = {};
    ["name", "description", "price_cents"].forEach(f => {
      if (req.body[f] !== undefined) updateData[f] = req.body[f];
    });
    if (is_published !== undefined) updateData.is_published = !!is_published;

    await Pack.findByIdAndUpdate(req.params.id, { $set: updateData });

    if (Array.isArray(course_ids)) {
      await PackCourse.deleteMany({ pack_id: req.params.id });
      for (const cid of course_ids) {
        await PackCourse.create({ pack_id: req.params.id, course_id: cid });
      }
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { Pack } = getDb();
    await Pack.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
