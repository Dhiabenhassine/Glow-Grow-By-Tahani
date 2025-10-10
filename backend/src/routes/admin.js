import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { getDb } from '../lib/db.js';
//import { uploadFile } from "../middleware/upload.js";
import { uploadImage, uploadVideo } from '../middleware/upload.js';
const router = express.Router();
//router.use(requireAuth, requireRole('admin'));

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
router.post('/categories', uploadImage.single('file'), async (req, res, next) => {
  try {
    const { Category } = getDb();
    const { name, slug } = req.body;

    const image_url = req.file?.path || null; // ✅ handle uploaded image if provided

    const c = await Category.create({ name, slug, image_url });
    res.json({ id: c._id, data: c });
  } catch (e) { next(e); }
});


// PATCH category
router.patch('/categories/:id', uploadImage.single('file'), async (req, res, next) => {
  try {
    const { Category } = getDb();
    const { name, slug } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (slug) updateData.slug = slug;

    // ✅ Handle new image upload (if provided)
    if (req.file?.path) {
      updateData.image_url = req.file.path;
    }

    await Category.findByIdAndUpdate(req.params.id, { $set: updateData });
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
router.patch('/courses/lessons/:lessonId/video',uploadVideo.single('file'),
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
    const {  type, value, valid_from, valid_to } = req.body;
    const promo = await Promotion.create({
      type,
      value,
      valid_from,
      valid_to,
    });
    res.json({ id: promo._id });
  } catch (e) { next(e); }
});

router.patch('/promos/:id', async (req, res, next) => {
  try {
    const { Promotion } = getDb();
    const updateData = {};
    [ 'type', 'value', 'valid_from', 'valid_to'].forEach(f => {
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
// Healthy Packages
router.get("/healthy-packages", async (req, res, next) => {
  try {
    const { HealthyPackage } = getDb();
    const rows = await HealthyPackage.find({}).sort({ _id: -1 }).lean();
    res.json(rows.map((hp) => ({ id: hp._id, ...hp })));
  } catch (e) {
    next(e);
  }
});

/* ==============================
   CREATE Healthy Package (with multiple image upload)
============================== */
router.post(  "/healthy-packages",uploadImage.array("images"), // ✅ no file limit
  async (req, res, next) => {
    try {
      const { HealthyPackage } = getDb();
      const { name, description, duration_days, price_cents, features, is_published } = req.body;

      // Handle uploaded images
      const uploadedImages = (req.files || []).map((file, index) => ({
        url: file.path || file.secure_url,
        caption: `Image ${index + 1}`,
        position: index,
      }));

      // Parse features if sent as a string (JSON format)
      const parsedFeatures =
        typeof features === "string" ? JSON.parse(features) : features || [];

      const healthyPackage = await HealthyPackage.create({
        name,
        description,
        duration_days,
        price_cents,
        features: Array.isArray(parsedFeatures) ? parsedFeatures : [],
        images: uploadedImages,
        is_published: !!is_published,
      });

      res.json({ success: true, id: healthyPackage._id, data: healthyPackage });
    } catch (e) {
      next(e);
    }
  }
);

/* ==============================
   UPDATE Healthy Package (with multiple image upload)
============================== */
router.patch("/healthy-packages/:id",  uploadImage.array("images"), // ✅ unlimited
  async (req, res, next) => {
    try {
      const { HealthyPackage } = getDb();
      const { name, description, duration_days, price_cents, features, is_published } = req.body;

      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (duration_days !== undefined) updateData.duration_days = duration_days;
      if (price_cents !== undefined) updateData.price_cents = price_cents;
      if (is_published !== undefined) updateData.is_published = !!is_published;

      // Handle features
      if (features) {
        const parsedFeatures =
          typeof features === "string" ? JSON.parse(features) : features;
        if (Array.isArray(parsedFeatures)) updateData.features = parsedFeatures;
      }

      // Handle new uploaded images
      if (req.files && req.files.length > 0) {
        const uploadedImages = req.files.map((file, index) => ({
          url: file.path || file.secure_url,
          caption: `Image ${index + 1}`,
          position: index,
        }));
        updateData.images = uploadedImages;
      }

      const updated = await HealthyPackage.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ success: false, message: "Healthy Package not found" });
      }

      res.json({ success: true, data: updated });
    } catch (e) {
      next(e);
    }
  }
);

/* ==============================
   DELETE Healthy Package
============================== */
router.delete("/healthy-packages/:id", async (req, res, next) => {
  try {
    const { HealthyPackage } = getDb();
    await HealthyPackage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});


export default router;
