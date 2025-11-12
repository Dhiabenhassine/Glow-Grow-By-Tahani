import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getDb } from '../lib/db.js';

const router = express.Router();

router.get('/categories', async (req, res, next) => {
  try {
    const { Category } = getDb();
    const categories = await Category.find().sort({ name: 1 }).lean();

    res.json(categories.map(c => ({
      id: c._id,
      name: c.name,
      slug: c.slug,
      image_url: c.image_url,
    })));
  } catch (err) {
    next(err);
  }
});
router.get('/categories/:_id/packs', async (req, res, next) => {
  try {
    const { Category, Pack } = getDb();
    const category = await Category.findOne({ _id: req.params._id }).lean();
    if (!category) return res.status(404).json({ error: 'Catégorie introuvable' });

    const packs = await Pack.find({ category_id: category._id, is_published: true })
      .populate('category_id', 'name')
      .sort({ created_at: -1 })
      .lean();

    res.json(
      packs.map(p => ({
        id: p._id,
        name: p.name,
        description: p.description,
        category_name: p.category_id?.name,
        plans: p.plans,
        is_published: p.is_published,
      }))
    );
  } catch (err) {
    next(err);
  }
});
router.get('/packs/:id', async (req, res, next) => {
  try {
    const { Pack, Course } = getDb();
    const pack = await Pack.findById(req.params.id)
      .populate('category_id', 'name slug')
      .lean();

    if (!pack) return res.status(404).json({ error: 'Pack introuvable' });

    const courses = await Course.find({ pack_id: pack._id, is_published: true })
      .select('title description coach_name created_at')
      .lean();

    res.json({
      id: pack._id,
      name: pack.name,
      description: pack.description,
      category_name: pack.category_id?.name,
      plans: pack.plans,
      courses: courses.map(c => ({
        id: c._id,
        title: c.title,
        description: c.description,
        coach_name: c.coach_name,
      })),
    });
  } catch (err) {
    next(err);
  }
});

router.post('/packs/:id/purchase', requireAuth, async (req, res, next) => {
  try {
    const { Pack, PackPurchase } = getDb();
    const userId = req.user.id;
    const { plan, payment_method, paypal_order_id } = req.body;

    const pack = await Pack.findById(req.params.id).lean();
    if (!pack) return res.status(404).json({ error: 'Pack introuvable' });

    // Check if already purchased
    const existingPurchase = await PackPurchase.findOne({ user_id: userId, pack_id: pack._id });
    if (existingPurchase) {
      return res.status(400).json({ error: 'Vous avez déjà acheté ce pack.' });
    }

    // Find selected plan
    const selectedPlan = pack.plans.find(p => p.label === plan);
    if (!selectedPlan) {
      return res.status(400).json({ error: 'Plan invalide' });
    }

    // Simulate payment (you’ll integrate PayPal/Stripe here)
    const paymentSuccess = true; // Replace this with actual payment verification logic

    if (!paymentSuccess) {
      return res.status(400).json({ error: 'Échec du paiement' });
    }

    // Save purchase
    const newPurchase = new PackPurchase({
      user_id: userId,
      pack_id: pack._id,
      amount_cents: selectedPlan.price_cents,
      currency: 'USD',
      status: 'completed',
      paypal_order_id,
    });

    await newPurchase.save();

    res.json({ success: true, message: 'Pack acheté avec succès.' });
  } catch (err) {
    next(err);
  }
});
router.get('/packs/:id/courses', requireAuth, async (req, res, next) => {
  try {
    const { Pack, Course, PackPurchase } = getDb();
    const userId = req.user.id;

    // Check if the user purchased this pack
    const hasAccess = await PackPurchase.findOne({
      user_id: userId,
      pack_id: req.params.id,
      status: 'completed',
    });

    if (!hasAccess) {
      return res.status(403).json({ error: 'Accès refusé : vous devez acheter ce pack.' });
    }

    const courses = await Course.find({ pack_id: req.params.id })
      .select('title description coach_name created_at')
      .lean();

    res.json(courses.map(c => ({
      id: c._id,
      title: c.title,
      description: c.description,
      coach_name: c.coach_name,
      created_at: c.created_at,
    })));
  } catch (err) {
    next(err);
  }
});

/*
router.get('/', async (req, res, next) => {
  try {
    const { Course, Category, CourseImage } = getDb();
    const categorySlug = req.query.category;

    let filter = { is_published: true };
    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug }).lean();
      if (!category) return res.json([]);
      filter.category_id = category._id;
    }

    const courses = await Course.find(filter)
      .populate('category_id', 'name')
      .sort({ _id: -1 })
      .lean();

    // Attach cover image + normalize _id
    const result = await Promise.all(
      courses.map(async (c) => {
        const coverImage = await CourseImage.findOne({ course_id: c._id })
          .sort({ position: 1, _id: 1 })
          .lean();

        return {
          id: c._id,
          title: c.title,
          description: c.description,
          category_name: c.category_id?.name,
          cover_image: coverImage?.image_url || null,
          is_published: c.is_published,
          created_at: c.created_at,
        };
      })
    );

    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get('/categories', async (req, res, next) => {
  try {
    const { Category } = getDb();

    const categories = await Category.find({})
      .sort({ name: 1 })
      .lean();

    res.json(
      categories.map((cat) => ({
        id: cat._id,
        name: cat.name,
        slug: cat.slug,
      }))
    );
  } catch (e) {
    next(e);
  }
});
router.get('/:id', requireAuth, async (req, res, next) => {
  console.log('User from JWT:', req.user);
  try {
    const { Course, Category, Lesson, CourseImage, Subscription } = getDb();

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Utilisateur non authentifié' });

    // ✅ Use findOne instead of find to get a single active subscription
    const subscription = await Subscription.findOne({
      user_id: userId,
      status: 'active',
      current_period_end: { $gt: new Date() }
    });

    if (!subscription) {
      return res.status(403).json({ error: 'Accès refusé: abonnement inactif ou expiré' });
    }

    // ✅ Fetch course info
    const course = await Course.findById(req.params.id)
      .populate('category_id', 'name')
      .lean();

    if (!course) return res.status(404).json({ error: 'Cours introuvable' });

    const lessons = await Lesson.find({ course_id: course._id })
      .select('title position')
      .sort({ position: 1 })
      .lean();

    const images = await CourseImage.find({ course_id: course._id })
      .select('image_url position')
      .sort({ position: 1, _id: 1 })
      .lean();

    res.json({
      id: course._id,
      title: course.title,
      description: course.description,
      category_name: course.category_id?.name,
      is_published: course.is_published,
      created_at: course.created_at,
      lessons: lessons.map((l) => ({ id: l._id, ...l })),
      images: images.map((img) => ({ id: img._id, ...img })),
    });
  } catch (e) {
    next(e);
  }
});


/*
router.get('/:id', async (req, res, next) => {
  try {
    const { Course, Category, Lesson, CourseImage } = getDb();

    const course = await Course.findById(req.params.id)
      .populate('category_id', 'name')
      .lean();

    if (!course) return res.status(404).json({ error: 'Cours introuvable' });

    const lessons = await Lesson.find({ course_id: course._id })
      .select('title position')
      .sort({ position: 1 })
      .lean();

    const images = await CourseImage.find({ course_id: course._id })
      .select('image_url position')
      .sort({ position: 1, _id: 1 })
      .lean();

    res.json({
      id: course._id,
      title: course.title,
      description: course.description,
      category_name: course.category_id?.name,
      is_published: course.is_published,
      created_at: course.created_at,
      lessons: lessons.map((l) => ({ id: l._id, ...l })),
      images: images.map((img) => ({ id: img._id, ...img })),
    });
  } catch (e) {
    next(e);
  }
});
*/
/*
router.get('/:id/lesson/:lessonId', requireAuth, async (req, res, next) => {
  try {
    const { Lesson, Purchase, Subscription } = getDb();
    const userId = req.user.id;
    const courseId = req.params.id;

    // Check purchase or active subscription
    const purchase = await Purchase.findOne({ user_id: userId, course_id: courseId }).lean();
    const sub = await Subscription.findOne({
      user_id: userId,
      status: 'active',
      current_period_end: { $gt: new Date() },
    }).lean();

    if (!purchase && !sub) {
      return res.status(402).json({
        error: 'Accès restreint. Achetez le cours ou activez un abonnement.',
      });
    }

    const lesson = await Lesson.findOne({
      _id: req.params.lessonId,
      course_id: courseId,
    }).lean();

    if (!lesson) return res.status(404).json({ error: 'Leçon introuvable' });

    res.json({
      id: lesson._id,
      title: lesson.title,
      content: lesson.content,
      position: lesson.position,
    });
  } catch (e) {
    next(e);
  }
});
*/
export default router;
