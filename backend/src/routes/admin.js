import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { getDb } from '../lib/db.js';
//import { uploadFile } from "../middleware/upload.js";
import { uploadImage, uploadVideo } from '../middleware/upload.js';
const router = express.Router();
router.use(requireAuth, requireRole('admin'));

router.get('/users', async (req, res, next) => {
  try {
    const { User } = getDb();
    const rows = await User.find({}).select('email name role created_at').sort({ _id: -1 }).lean();
    res.json(rows.map(u => ({ id: u._id, ...u })));
  } catch (e) { next(e); }
});

router.patch('/users/:id', async (req, res, next) => {
  try {
    const { User } = getDb();
    const { name, role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { $set: { ...(name && { name }), ...(role && { role }) } });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete('/users/:id', async (req, res, next) => {
  try {
    const { User } = getDb();
    await User.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Categories
// GET categories
router.get('/categories', async (req, res, next) => {
  try {
    const { Category } = getDb();
    const rows = await Category.find({}).sort({ name: 1 }).lean();
    res.json(rows.map(c => ({ id: c._id, ...c })));
  } catch (e) { next(e); }
});

// POST category
router.post('/categories', async (req, res, next) => {
  try {
    const { Category } = getDb();
    const { name, slug } = req.body;
    const c = await Category.create({ name, slug });
    res.json({ id: c._id });
  } catch (e) { next(e); }
});

// PATCH category
router.patch('/categories/:id', async (req, res, next) => {
  try {
    const { Category } = getDb();
    const { name, slug } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { 
      $set: { 
        ...(name && { name }), 
        ...(slug && { slug }),
      } 
    });
    res.json({ ok: true });
  } catch (e) { next(e); }
});


router.delete('/categories/:id', async (req, res, next) => {
  try {
    const { Category } = getDb();
    await Category.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});
//Packs

router.get("/packs", async (req, res, next) => {
  try {
    const { Pack } = getDb();
    const rows = await Pack.find({}).sort({ _id: -1 }).lean();
    res.json(rows.map(p => ({ id: p._id, ...p })));
  } catch (e) { next(e); }
});

router.post("/packs", async (req, res, next) => {
  try {
    const { Pack } = getDb();
    const { category_id, name, description, is_published, plans } = req.body;

    const pack = await Pack.create({
      category_id,
      name,
      description,
      is_published: !!is_published,
      plans: Array.isArray(plans) ? plans : []
    });

    res.json({ id: pack._id });
  } catch (e) { next(e); }
});


router.patch("/packs/:id", async (req, res, next) => {
  try {
    const { Pack } = getDb();
    const { name, description, is_published, plans } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (is_published !== undefined) updateData.is_published = !!is_published;
    if (Array.isArray(plans)) updateData.plans = plans;

    await Pack.findByIdAndUpdate(req.params.id, { $set: updateData });
    res.json({ ok: true });
  } catch (e) { next(e); }
});


router.delete("/packs/:id", async (req, res, next) => {
  try {
    const { Pack } = getDb();
    await Pack.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});
// Courses
router.get('/courses', async (req, res, next) => {
  try {
    const { Course, Category } = getDb();
    const rows = await Course.find({})
      .populate('category_id', 'name')
      .sort({ _id: -1 })
      .lean();

    const formatted = rows.map(c => ({
      id: c._id,
      ...c,
      category_name: c.category_id?.name || null
    }));

    res.json(formatted);
  } catch (e) { next(e); }
});

router.post('/courses', async (req, res, next) => {
  try {
    const { Course } = getDb();
    const { title, description, price_cents, category_id, level, is_published, coach_name } = req.body;
    const c = await Course.create({
      title,
      description,
      price_cents: price_cents ,
      category_id,
      level: level ,
      is_published: !!is_published,
      coach_name : coach_name || 'Tahani Kochrad'
    });
    res.json({ id: c._id });
  } catch (e) { next(e); }
});

router.patch('/courses/:id', async (req, res, next) => {
  try {
    const { Course } = getDb();
    const updateData = {};
    ['title', 'description', 'price_cents', 'category_id', 'level', 'coach_name'].forEach(f => {
      if (req.body[f] !== undefined) updateData[f] = req.body[f];
    });
    if (req.body.is_published !== undefined) updateData.is_published = !!req.body.is_published;

    await Course.findByIdAndUpdate(req.params.id, { $set: updateData });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete('/courses/:id', async (req, res, next) => {
  try {
    const { Course } = getDb();
    await Course.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Lessons
router.get('/courses/:id/lessons', async (req, res, next) => {
  try {
    const { Lesson } = getDb();
    const rows = await Lesson.find({ course_id: req.params.id }).sort({ position: 1 }).lean();
    res.json(rows.map(l => ({ id: l._id, ...l })));
  } catch (e) { next(e); }
});
/*
// Create lesson with video upload
router.post('/courses/:id/lessons', uploadFile.single("file"), async (req, res, next) => {
  try {
 console.log("REQ.BODY:", req.body);
  console.log("REQ.FILE:", req.file)
      const { Lesson } = getDb();
    const { title, content, position } = req.body;

    const videoUrl = req.file ? req.file?.secure_url || null : null;

    const l = await Lesson.create({
      course_id: req.params.id,
      title,
      video_url: videoUrl,
      content: content || '',
      position: position || 0
    });
console.log("Created lesson:", l);
    res.json({ success: true, id: l._id, data: l });
  } catch (e) { 
    next(e); 
  }
});
*/
// Create lesson without video 
router.post('/courses/:id/lessons', async (req, res, next) => {
  try {
    const { Lesson } = getDb();
    const { title, content, position } = req.body;

    const lessonData = {
      course_id: req.params.id,
      title: title || '',
      content: content || '',
      position: position || 0,
      video_url: '' 
    };

    const lesson = await Lesson.create(lessonData);

    res.json({ success: true, id: lesson._id, data: lesson });
  } catch (err) {
    next(err);
  }
});
//Upload Videp
router.patch(
  '/courses/lessons/:lessonId/video',
  uploadVideo.single('file'),
  async (req, res, next) => {
    try {
      const { Lesson } = getDb();

      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Video file is required' });
      }

      const videoUrl = req.file.path || req.file.secure_url;

      const updatedLesson = await Lesson.findByIdAndUpdate(
        req.params.lessonId,
        { $set: { video_url: videoUrl } },
        { new: true }
      );

      if (!updatedLesson) {
        return res.status(404).json({ success: false, message: 'Lesson not found' });
      }

      res.json({ success: true, data: updatedLesson });
    } catch (err) {
      next(err);
    }
  }
);

router.patch('/courses/lessons/:lessonId',  async (req, res, next) => {
    try {
      const { Lesson } = getDb();

      const updateData = {};

      // Pick fields from body
      ['title', 'content', 'position'].forEach(f => {
        if (req.body[f] !== undefined) updateData[f] = req.body[f];
      });


      const updatedLesson = await Lesson.findByIdAndUpdate(
        req.params.lessonId,
        { $set: updateData },
        { new: true } // return updated doc
      );

      if (!updatedLesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      res.json({ ok: true, lesson: updatedLesson });
    } catch (e) {
      next(e);
    }
  }
);


router.delete('/courses/lessons/:lessonId', async (req, res, next) => {
  try {
    const { Lesson } = getDb();
    await Lesson.findByIdAndDelete(req.params.lessonId);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Course images
router.get('/courses/:id/images', async (req, res, next) => {
  try {
    const { CourseImage } = getDb();
    const images = await CourseImage.find({ course_id: req.params.id }).sort({ pos: 1 }).lean();
    res.json(images.map(img => ({ id: img._id, ...img })));
  } catch (err) {
    next(err);
  }
});

/*
// Upload image for a course
router.post('/courses/:id/images', uploadFile.single("file"), async (req, res, next) => {
  try {
    const { CourseImage } = getDb();
console.log("REQ.FILE:", req.file);
console.log("REQ.BODY:", req.body);

   console.log("Headers:", req.headers["content-type"]);
console.log("Body keys:", Object.keys(req.body));


const fileUrl = req.file?.path || req.file?.secure_url || null;

    const newImage = await CourseImage.create({
      course_id: req.params.id,
      image_url: fileUrl,
      pos: 1, // you can later add sorting/ordering logic
    });
console.log("Uploaded image:", newImage);
console.log("File URL:", fileUrl);
    res.json({ success: true, data: newImage });
  } catch (err) {
    next(err);
  }
});
*/
// Upload image for a course
// Upload image for a course
router.post('/courses/:id/images', uploadImage.single("file"), async (req, res, next) => {
  try {
    const { CourseImage } = getDb();

    
    const fileUrl = req.file?.path || null;
    console.log("REQ.FILE:", req.file); // check what multer-storage-cloudinary gives you

    const newImage = await CourseImage.create({
      course_id: req.params.id,
      image_url: fileUrl,
      pos: 1,
    });

    res.json({ success: true, data: newImage });
  } catch (err) {
    next(err);
  }
});


router.delete('/images/:imageId', async (req, res, next) => {
  try {
    const { CourseImage } = getDb();
    await CourseImage.findByIdAndDelete(req.params.imageId);
    res.json({ ok: true });
  } catch (e) { next(e); }
});
/*
// Packs
router.get('/packs', async (req, res, next) => {
  try {
    const { Pack } = getDb();
    const rows = await Pack.find({}).sort({ _id: -1 }).lean();
    res.json(rows.map(p => ({ id: p._id, ...p })));
  } catch (e) { next(e); }
});

router.post('/packs', async (req, res, next) => {
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

router.patch('/packs/:id', async (req, res, next) => {
  try {
    const { Pack, PackCourse } = getDb();
    const { name, description, price_cents, is_published, course_ids } = req.body;
    const updateData = {};
    ['name', 'description', 'price_cents'].forEach(f => {
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

router.delete('/packs/:id', async (req, res, next) => {
  try {
    const { Pack } = getDb();
    await Pack.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});
*/
// Promotions
router.get('/promos', async (req, res, next) => {
  try {
    const { Promotion } = getDb();
    const rows = await Promotion.find({}).sort({ _id: -1 }).lean();
    res.json(rows.map(p => ({ id: p._id, ...p })));
  } catch (e) { next(e); }
});

router.post('/promos', async (req, res, next) => {
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

router.patch('/promos/:id', async (req, res, next) => {
  try {
    const { Promotion } = getDb();
    const updateData = {};
    ['code', 'type', 'value', 'valid_from', 'valid_to', 'max_redemptions', 'redemptions'].forEach(f => {
      if (req.body[f] !== undefined)
        updateData[f] = f === 'code' ? req.body[f].toUpperCase() : req.body[f];
    });
    await Promotion.findByIdAndUpdate(req.params.id, { $set: updateData });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete('/promos/:id', async (req, res, next) => {
  try {
    const { Promotion } = getDb();
    await Promotion.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
