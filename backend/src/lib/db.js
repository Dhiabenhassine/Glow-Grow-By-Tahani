import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let connected = false;

/* =======================
   User Schema
======================= */
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password_hash: String,
  name: String,
  role: { type: String, default: 'user' },
  created_at: { type: Date, default: Date.now }
});

/* =======================
   Category Schema
======================= */
const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
});

/* =======================
   Course / Lessons
======================= */
const courseImageSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  image_url: String,
  pos: Number
});

const lessonSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: String,
  video_url: String,
  content: String,
  position: Number
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  level: String,
  is_published: { type: Boolean, default: false },
  coach_name: String,
  created_at: { type: Date, default: Date.now }
});

/* =======================
   Packs & Purchases
======================= */
const packSchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  description: String,
  is_published: { type: Boolean, default: true },

  // Each pack can have multiple plans: 1 month, 3 months, 6 months...
  plans: [
    {
      label: { type: String, required: true }, // e.g. "1 Month", "3 Months"
      duration_days: { type: Number, required: true }, // 30, 90, etc.
      price_cents: { type: Number, required: true },
    }
  ],

  created_at: { type: Date, default: Date.now }
});


const packPurchaseSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pack_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pack', required: true },
  amount_cents: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paypal_order_id: { type: String },
  created_at: { type: Date, default: Date.now }
});

// Ensure user can only purchase a given pack once
packPurchaseSchema.index({ user_id: 1, pack_id: 1 }, { unique: true });

/* =======================
   Subscription Schema
======================= */
const subscriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pack_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pack' },
  plan: { type: String }, // e.g. "monthly", "yearly"
  status: { type: String, enum: ['active', 'expired', 'canceled'], default: 'active' },
  current_period_end: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Pre-save hook: auto-expire if end date passed
subscriptionSchema.pre('save', function (next) {
  if (this.current_period_end < new Date()) {
    this.status = 'expired';
  }
  this.updated_at = new Date();
  next();
});

/* =======================
   Promotion Schema
======================= */
const promotionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: Number, required: true },
  valid_from: Date,
  valid_to: Date,
});
/* =======================
   Healthy Package Schema
======================= */
const healthyPackageSchema = new mongoose.Schema({
  name: { type: String, required: true },             // Name of the healthy package (e.g., "Weight Loss Plan")
  description: { type: String },                      // Description of the package
  //category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Link to a category if needed
  duration_days: { type: Number, required: true },    // Duration of the plan (e.g., 30, 60 days)
  price_cents: { type: Number, required: true },      // Price in cents (to avoid floating point issues)
  features: [                                         // What the package includes
    {
      title: { type: String, required: true },        // e.g., "Nutrition Guide", "Workout Plan"
      details: { type: String }                       // Optional description
    }
  ],
  is_published: { type: Boolean, default: true },     // Visibility toggle
  created_at: { type: Date, default: Date.now }
});

/* =======================
   Export Models
======================= */
export const models = {};

export async function initDb() {
  if (connected) return models;

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/appdb';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  models.User = mongoose.models.User || mongoose.model('User', userSchema);
  models.Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
  models.Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
  models.Lesson = mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);
  models.CourseImage = mongoose.models.CourseImage || mongoose.model('CourseImage', courseImageSchema);
  models.Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);
  models.Pack = mongoose.models.Pack || mongoose.model('Pack', packSchema);
  models.Promotion = mongoose.models.Promotion || mongoose.model('Promotion', promotionSchema);
  models.PackPurchase = mongoose.models.PackPurchase || mongoose.model('PackPurchase', packPurchaseSchema);
  models.HealthyPackage = mongoose.models.HealthyPackage || mongoose.model('HealthyPackage', healthyPackageSchema);

  connected = true;
  return models;
}

export function getDb() {
  if (!connected) throw new Error('DB not initialized');
  return models;
}
