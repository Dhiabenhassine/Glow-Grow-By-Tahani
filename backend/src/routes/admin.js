import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { v2 as cloudinary } from "cloudinary";
import { getDb } from '../lib/db.js';
import { uploadImage, uploadVideo } from '../middleware/upload.js';
const router = express.Router();
router.use(requireAuth, requireRole('admin'));
// ✅ Check subscription status when a user logs in
async function checkSubscriptionOnLogin(userId) {
  const { Subscription } = getDb();
  const now = new Date();

  // Use findOne instead of find
  const subscription = await Subscription.findOne({ user_id: userId });

  if (subscription && subscription.status === 'active') {
    if (subscription.current_period_end < now) {
      subscription.status = 'expired';
      await subscription.save();
      console.log(`⚠️ Subscription expired for user ${userId}`);
    }
  }

  return subscription;
}

// ✅ Fetch users and their subscription status
router.get('/users', requireAuth,async (req, res, next) => {
  try {
    const { User } = getDb();

    const users = await User.find({})
      .select('email name role created_at')
      .sort({ _id: -1 })
      .lean();

    // Optionally, check subscriptions for all users in parallel
    const usersWithSubscription = await Promise.all(
      users.map(async (u) => {
        const subscription = await checkSubscriptionOnLogin(u._id);
        return {
          id: u._id,
          ...u,
          subscriptionStatus: subscription ? subscription.status : 'none',
        };
      })
    );

    res.json(usersWithSubscription);
  } catch (e) {
    next(e);
  }
});


router.patch('/users/:id',requireAuth, async (req, res, next) => {
  try {
    const { User } = getDb();
    const { name, role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { $set: { ...(name && { name }), ...(role && { role }) } });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete('/users/:id',requireAuth, async (req, res, next) => {
  try {
    const { User } = getDb();
    await User.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Categories
// GET categories
router.get('/categories',requireAuth, async (req, res, next) => {
  try {
    const { Category } = getDb();
    const rows = await Category.find({}).sort({ name: 1 }).lean();
    res.json(rows.map(c => ({ id: c._id, ...c })));
  } catch (e) { next(e); }
});

// POST category
router.post('/categories',requireAuth, async (req, res, next) => {
  try {
    const { Category } = getDb();
    const { name, slug } = req.body;

    const c = await Category.create({ name, slug });
    console.log('Created category:', c);
    res.json({ id: c._id, data: c });
  } catch (e) { next(e); }
});



// PATCH category
router.patch('/categories/:id',requireAuth, uploadImage.single('file'), async (req, res, next) => {
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


router.delete('/categories/:id',requireAuth, async (req, res, next) => {
  try {
    const { Category } = getDb();
    await Category.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

//add image or update image for category
router.post( "/categories/:id/image", requireAuth, uploadImage.single("file"), async (req, res, next) => {
    try {
      const { Category } = getDb();
      const fileUrl = req.file?.path || null;
      console.log("UPLOADED FILE:", req.file);

      if (!fileUrl) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      // 1️⃣ Find existing category
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      // 2️⃣ If an old image exists, delete it from Cloudinary
      if (category.image_url) {
        try {
          const oldUrl = category.image_url;
          const publicIdMatch = oldUrl.match(/\/([^/]+)\.[a-zA-Z]+$/);

          if (publicIdMatch && publicIdMatch[1]) {
            const publicId = `courses/images/${publicIdMatch[1]}`;
            console.log("Deleting old image:", publicId);
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (deleteErr) {
          console.warn("⚠️ Failed to delete old image:", deleteErr.message);
          // continue — not fatal
        }
      }

      // 3️⃣ Update the category with the new image URL
      category.image_url = fileUrl;
      category.pos = 1; // optional if your schema supports it
      await category.save();

      res.json({
        success: true,
        message: category.image_url
          ? "Image added/updated successfully"
          : "Image added successfully",
        data: category,
      });
    } catch (err) {
      console.error("Error handling image:", err);
      next(err);
    }
  }
);


//Packs

router.get("/packs",requireAuth, async (req, res, next) => {
  try {
    const { Pack } = getDb();
    const rows = await Pack.find({}).sort({ _id: -1 }).lean();
    res.json(rows.map(p => ({ id: p._id, ...p })));
  } catch (e) { next(e); }
});

router.post("/packs",requireAuth, async (req, res, next) => {
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


router.patch("/packs/:id",requireAuth, async (req, res, next) => {
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


router.delete("/packs/:id",requireAuth, async (req, res, next) => {
  try {
    const { Pack } = getDb();
    await Pack.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});
// Courses
router.get('/courses', requireAuth, async (req, res, next) => {
  try {
    const { Course, Category } = getDb();

    const courses = await Course.find({})
      .populate('category_id', 'name')
      .sort({ created_at: -1 }) // better than _id for chronological order
      .lean();

    const formatted = courses.map(c => ({
      id: c._id,
      title: c.title,
      description: c.description,
      category_id: c.category_id?._id || null,
      category_name: c.category_id?.name || null,
      level: c.level,
      pack_id: c.pack_id || null,
      is_published: c.is_published,
      coach_name: c.coach_name,
      created_at: c.created_at
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

router.post('/courses', requireAuth, async (req, res, next) => {
  try {
    const { Course } = getDb();
    const { title, description, category_id,pack_id, level, is_published, coach_name } = req.body;

    if (!title || !category_id || !pack_id) {
      return res.status(400).json({ error: 'Title , pack_idand category_id are required' });
    }

    const course = await Course.create({
      title,
      description: description || '',
      category_id,
      pack_id,
      level: level || 'Beginner',
      is_published: !!is_published,
      coach_name: coach_name || 'Tahani Kochrad'
    });

    res.status(201).json({ id: course._id, message: 'Course created successfully' });
  } catch (err) {
    // Handle duplicate key errors or other MongoDB errors
    if (err.code === 11000) return res.status(400).json({ error: 'Duplicate course detected' });
    next(err);
  }
});

router.patch('/courses/:id', requireAuth, async (req, res, next) => {
  try {
    const { Course } = getDb();
    const { id } = req.params;

    const allowedFields = ['title', 'description', 'category_id', 'level', 'coach_name', 'is_published'];
    const updateData = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = field === 'is_published' ? !!req.body[field] : req.body[field];
      }
    });

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ ok: true, course: updatedCourse });
  } catch (err) {
    next(err);
  }
});


router.delete('/courses/:id', requireAuth, async (req, res, next) => {
  try {
    const { Course } = getDb();
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ ok: true, message: 'Course deleted successfully' });
  } catch (err) {
    next(err);
  }
});


// Lessons
router.get('/courses/:id/lessons',requireAuth, async (req, res, next) => {
  try {
    const { Lesson } = getDb();
    const rows = await Lesson.find({ course_id: req.params.id }).sort({ position: 1 }).lean();
    res.json(rows.map(l => ({ id: l._id, ...l })));
  } catch (e) { next(e); }
});

// Create lesson without video 
router.post('/courses/:id/lessons',requireAuth, async (req, res, next) => {
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
router.patch('/courses/lessons/:lessonId/video',uploadVideo.single('file'),requireAuth,
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

router.patch('/courses/lessons/:lessonId',requireAuth,  async (req, res, next) => {
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


router.delete('/courses/lessons/:lessonId',requireAuth, async (req, res, next) => {
  try {
    const { Lesson } = getDb();
    await Lesson.findByIdAndDelete(req.params.lessonId);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Course images
router.get('/courses/:id/images',requireAuth, async (req, res, next) => {
  try {
    const { CourseImage } = getDb();
    const images = await CourseImage.find({ course_id: req.params.id }).sort({ pos: 1 }).lean();
    res.json(images.map(img => ({ id: img._id, ...img })));
  } catch (err) {
    next(err);
  }
});


// Upload image for a course
router.post('/courses/:id/images',requireAuth, uploadImage.single("file"), async (req, res, next) => {
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

router.patch('/courses/:courseId/images/:imageId', requireAuth, uploadImage.single("file"), async (req, res, next) => {
  try {
    const { CourseImage } = getDb(); // get your model from DB setup
    const { courseId, imageId } = req.params;

    // Get the new image file path (Cloudinary or local depending on your setup)
    const fileUrl = req.file?.path || null;
    if (!fileUrl) {
      return res.status(400).json({ success: false, message: "No image file provided." });
    }

    // Find and update the existing image document
    const updatedImage = await CourseImage.findOneAndUpdate(
      { _id: imageId, course_id: courseId },
      { image_url: fileUrl },
      { new: true } // return the updated document
    );

    if (!updatedImage) {
      return res.status(404).json({ success: false, message: "Course image not found." });
    }

    res.json({ success: true, data: updatedImage });
  } catch (err) {
    next(err);
  }
});


router.delete('/images/:imageId',requireAuth, async (req, res, next) => {
  try {
    const { CourseImage } = getDb();
    await CourseImage.findByIdAndDelete(req.params.imageId);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Promotions
router.get('/promos',requireAuth, async (req, res, next) => {
  try {
    const { Promotion } = getDb();
    const rows = await Promotion.find({}).sort({ _id: -1 }).lean();
    res.json(rows.map(p => ({ id: p._id, ...p })));
  } catch (e) { next(e); }
});

router.post('/promos',requireAuth, async (req, res, next) => {
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

router.patch('/promos/:id',requireAuth, async (req, res, next) => {
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

router.delete('/promos/:id',requireAuth, async (req, res, next) => {
  try {
    const { Promotion } = getDb();
    await Promotion.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});
// Healthy Packages
router.get("/healthy-packages",requireAuth, async (req, res, next) => {
  try {
    const { HealthyPackage } = getDb();
    const rows = await HealthyPackage.find({}).sort({ _id: -1 }).lean();
    res.json(rows.map((hp) => ({ id: hp._id, ...hp })));
  } catch (e) {
    next(e);
  }
});

router.post(  "/healthy-packages",uploadImage.array("images"),requireAuth, // ✅ no file limit
  async (req, res, next) => {
    try {
      const { HealthyPackage } = getDb();
      const { name, description, duration_days,  features, is_published } = req.body;

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

router.patch("/healthy-packages/:id",  uploadImage.array("images"),requireAuth, // ✅ unlimited
  async (req, res, next) => {
    try {
      const { HealthyPackage } = getDb();
      const { name, description, duration_days, features, is_published } = req.body;

      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (duration_days !== undefined) updateData.duration_days = duration_days;
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

router.delete("/healthy-packages/:id",requireAuth, async (req, res, next) => {
  try {
    const { HealthyPackage } = getDb();
    await HealthyPackage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

router.get('/healthy-subscriptions', requireAuth,async (req, res, next) => {
  try {
    const { healthyPrice } = getDb();
    const hs = await healthyPrice.findOne().sort({ _id: -1 }).lean();
    if (!hs) return res.json({});

    const flatPlans = {};
    hs.plans.forEach(p => {
      flatPlans[p.plan] = p.price_cents;
    });

    res.json(flatPlans);
  } catch (e) {
    next(e);
  }
});

router.post('/healthy-subscriptions',requireAuth, async (req, res, next) => {
  try {
    const { healthyPrice } = getDb();
    const { plan, price_cents } = req.body;

    if (!plan || price_cents === undefined) {
      return res.status(400).json({ error: 'plan and price_cents are required' });
    }

    if (!['monthly', 'quarterly'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan type' });
    }

    let hs = await healthyPrice.findOne().sort({ _id: -1 });

    const current_period_end = plan === 'monthly'
      ? new Date(new Date().setMonth(new Date().getMonth() + 1))
      : new Date(new Date().setMonth(new Date().getMonth() + 3));

    if (!hs) {
      hs = await healthyPrice.create({
        plans: [{ plan, price_cents }],
        current_period_end,
        status: 'active'
      });
    } else {
      const existingPlan = hs.plans.find(p => p.plan === plan);
      if (existingPlan) return res.status(409).json({ error: 'Subscription plan already exists' });

      hs.plans.push({ plan, price_cents });
      hs.updated_at = new Date();
      await hs.save();
    }

    const flatPlans = {};
    hs.plans.forEach(p => {
      flatPlans[p.plan] = p.price_cents;
    });

    res.status(201).json(flatPlans);
  } catch (e) {
    next(e);
  }
});

router.patch('/healthy-subscriptions/:id',requireAuth, async (req, res, next) => {
  try {
    const { healthyPrice } = getDb();
    const { id } = req.params;
    const { plan, price_cents, status, current_period_end } = req.body;

    const hs = await healthyPrice.findById(id);
    if (!hs) return res.status(404).json({ error: 'Subscription not found' });

    if (plan && price_cents !== undefined) {
      const planIndex = hs.plans.findIndex(p => p.plan === plan);
      if (planIndex === -1) return res.status(404).json({ error: 'Plan not found in subscription' });

      hs.plans[planIndex].price_cents = price_cents;
    }

    if (status) {
      if (!['active', 'expired', 'canceled'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      hs.status = status;
    }

    if (current_period_end) hs.current_period_end = new Date(current_period_end);
    hs.updated_at = new Date();

    await hs.save();

    const flatPlans = {};
    hs.plans.forEach(p => {
      flatPlans[p.plan] = p.price_cents;
    });

    res.json(flatPlans);
  } catch (e) {
    next(e);
  }
});



export default router;
