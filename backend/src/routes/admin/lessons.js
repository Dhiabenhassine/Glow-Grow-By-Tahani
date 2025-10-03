import express from "express";
import { getDb } from "../../lib/db.js";

const router = express.Router();

router.get("/:courseId", async (req, res, next) => {
  try {
    const { Lesson } = getDb();
    const rows = await Lesson.find({ course_id: req.params.courseId }).sort({ position: 1 }).lean();
    res.json(rows.map(l => ({ id: l._id, ...l })));
  } catch (e) { next(e); }
});

router.post("/:courseId", async (req, res, next) => {
  try {
    const { Lesson } = getDb();
    const { title, video_url, content, position } = req.body;
    const l = await Lesson.create({
      course_id: req.params.courseId,
      title,
      video_url,
      content: content || "",
      position: position || 0
    });
    res.json({ id: l._id });
  } catch (e) { next(e); }
});

router.patch("/:lessonId", async (req, res, next) => {
  try {
    const { Lesson } = getDb();
    const updateData = {};
    ["title", "video_url", "content", "position"].forEach(f => {
      if (req.body[f] !== undefined) updateData[f] = req.body[f];
    });
    await Lesson.findByIdAndUpdate(req.params.lessonId, { $set: updateData });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete("/:lessonId", async (req, res, next) => {
  try {
    const { Lesson } = getDb();
    await Lesson.findByIdAndDelete(req.params.lessonId);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
