import express from "express";
import { getDb } from "../../lib/db.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { Category } = getDb();
    const rows = await Category.find({}).sort({ name: 1 }).lean();
    res.json(rows.map(c => ({ id: c._id, ...c })));
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const { Category } = getDb();
    const { name, slug } = req.body;
    const c = await Category.create({ name, slug });
    res.json({ id: c._id });
  } catch (e) { next(e); }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { Category } = getDb();
    const { name, slug } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { $set: { ...(name && { name }), ...(slug && { slug }) } });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { Category } = getDb();
    await Category.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
