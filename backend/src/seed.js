import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { initDb } from './lib/db.js'; // adjust path to your db file
dotenv.config();

async function seed() {
  try {
    const models = await initDb();
    const { User, Category, Pack, Course, Lesson } = models;

    // ======================
    // 1. Admin User
    // ======================
    const adminEmail = 'admin@example.com';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const password_hash = await bcrypt.hash('Admin123', 10);
      admin = await User.create({
        email: adminEmail,
        password_hash,
        name: 'Admin',
        role: 'admin'
      });
      console.log('Admin created:', admin.email);
    } else {
      console.log('Admin already exists:', admin.email);
    }

    // ======================
    // 2. Categories
    // ======================
    const categoriesData = [
      { name: 'Programming', slug: 'programming', image_url: '' },
      { name: 'Fitness', slug: 'fitness', image_url: '' },
      { name: 'Nutrition', slug: 'nutrition', image_url: '' }
    ];

    const categories = [];
    for (const cat of categoriesData) {
      let category = await Category.findOne({ slug: cat.slug });
      if (!category) {
        category = await Category.create(cat);
        console.log('Category created:', category.name);
      } else {
        console.log('Category exists:', category.name);
      }
      categories.push(category);
    }

    // ======================
    // 3. Packs
    // ======================
    const packsData = [
      {
        name: 'Full Stack Bootcamp',
        description: 'Learn full stack development in 3 months',
        category_id: categories.find(c => c.slug === 'programming')._id,
        plans: [
          { label: '1 Month', duration_days: 30, price_cents: 50000 },
          { label: '3 Months', duration_days: 90, price_cents: 120000 }
        ]
      },
      {
        name: '30-Day Fitness Plan',
        description: 'Get in shape in 30 days',
        category_id: categories.find(c => c.slug === 'fitness')._id,
        plans: [
          { label: '1 Month', duration_days: 30, price_cents: 3000 }
        ]
      }
    ];

    const packs = [];
    for (const packData of packsData) {
      let pack = await Pack.findOne({ name: packData.name });
      if (!pack) {
        pack = await Pack.create(packData);
        console.log('Pack created:', pack.name);
      } else {
        console.log('Pack exists:', pack.name);
      }
      packs.push(pack);
    }

    // ======================
    // 4. Courses
    // ======================
    const coursesData = [
      {
        title: 'Node.js Basics',
        description: 'Learn the fundamentals of Node.js',
        category_id: categories.find(c => c.slug === 'programming')._id,
        pack_id: packs.find(p => p.name === 'Full Stack Bootcamp')._id,
        level: 'Beginner',
        is_published: true,
        coach_name: 'Dhia Tahani'
      },
      {
        title: 'Fitness 101',
        description: 'Introduction to fitness and exercises',
        category_id: categories.find(c => c.slug === 'fitness')._id,
        pack_id: packs.find(p => p.name === '30-Day Fitness Plan')._id,
        level: 'Beginner',
        is_published: true,
        coach_name: 'Coach John'
      }
    ];

    const courses = [];
    for (const courseData of coursesData) {
      let course = await Course.findOne({ title: courseData.title });
      if (!course) {
        course = await Course.create(courseData);
        console.log('Course created:', course.title);
      } else {
        console.log('Course exists:', course.title);
      }
      courses.push(course);
    }

    // ======================
    // 5. Lessons
    // ======================
    const lessonsData = [
      {
        course_id: courses.find(c => c.title === 'Node.js Basics')._id,
        title: 'Introduction to Node.js',
        content: 'This lesson covers Node.js basics...',
        video_url: 'https://example.com/video1.mp4',
        position: 1
      },
      {
        course_id: courses.find(c => c.title === 'Node.js Basics')._id,
        title: 'Node.js Modules',
        content: 'Understanding modules in Node.js...',
        video_url: 'https://example.com/video2.mp4',
        position: 2
      },
      {
        course_id: courses.find(c => c.title === 'Fitness 101')._id,
        title: 'Warm-up Exercises',
        content: 'Learn basic warm-up exercises...',
        video_url: 'https://example.com/fitness1.mp4',
        position: 1
      }
    ];

    for (const lessonData of lessonsData) {
      let lesson = await Lesson.findOne({ title: lessonData.title, course_id: lessonData.course_id });
      if (!lesson) {
        lesson = await Lesson.create(lessonData);
        console.log('Lesson created:', lesson.title);
      } else {
        console.log('Lesson exists:', lesson.title);
      }
    }

    console.log('✅ Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed();
