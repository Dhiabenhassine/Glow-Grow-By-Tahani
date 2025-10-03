import express from "express";
import { getDb } from "../../lib/db.js";
import { uploadFile } from "../../middleware/upload.js";

const router = express.Router();

router.post("/:type/:id", uploadFile.single("file"), async (req, res) => {
  try {
    const { type, id } = req.params; 
    const { CourseImage, Lesson } = getDb();
    const fileUrl = req.file.path;

    if (type === "course") {
      const newImage = await CourseImage.create({
        course_id: id,
        image_url: fileUrl,
        pos: 1,
      });
      return res.json({ success: true, data: newImage });
    }

    if (type === "lesson") {
      const updatedLesson = await Lesson.findByIdAndUpdate(
        id,
        { video_url: fileUrl },
        { new: true }
      );
      return res.json({ success: true, data: updatedLesson });
    }

    return res.status(400).json({ success: false, message: "Invalid type" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/:courseId", async (req, res, next) => {
  try {
    const { CourseImage } = getDb();
    const { image_url, position } = req.body;
    const img = await CourseImage.create({ course_id: req.params.courseId, image_url, position: position || 0 });
    res.json({ id: img._id });
  } catch (e) { next(e); }
});

router.delete("/:imageId", async (req, res, next) => {
  try {
    const { CourseImage } = getDb();
    await CourseImage.findByIdAndDelete(req.params.imageId);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
