import express from "express";
import { getDb } from "../../lib/db.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { Promotion } = getDb();
    const rows = await Promotion.find({}).sort({ _id: -1 }).lean();
    res.json(rows.map(p => ({ id: p._id, ...p })));
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const { Promotion } = getDb();
    const { code, type, value, valid_from, valid_to, max_redemptions } = req.body;
    const promo = await Promotion.create({
      code: code.toUpperCase(),
      type,
      value,
      valid_from,
      valid_to,
      max_redemptions
    });
    res.json({ id: promo._id });
  } catch (e) { next(e); }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { Promotion } = getDb();
    const updateData = {};
    ["code", "type", "value", "valid_from", "valid_to", "max_redemptions", "redemptions"].forEach(f => {
      if (req.body[f] !== undefined)
        updateData[f] = f === "code" ? req.body[f].toUpperCase() : req.body[f];
    });
    await Promotion.findByIdAndUpdate(req.params.id, { $set: updateData });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { Promotion } = getDb();
    await Promotion.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
