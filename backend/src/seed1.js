import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { initDb, getDb } from './lib/db.js';

await initDb();
const { User, Category, Course, Lesson, CourseImage } = getDb();

const adminPass = await bcrypt.hash('admin123', 10);
await User.updateOne({ email: 'admin@coach.fit' }, { $setOnInsert: { email:'admin@coach.fit', password_hash: adminPass, name:'Coach Admin', role:'admin' } }, { upsert: true });

const cats = [['Renforcement','renforcement'],['Cardio','cardio'],['Mobilité','mobilite'],['Nutrition','nutrition']];
for(const [name,slug] of cats){
  await Category.updateOne({ slug }, { $setOnInsert: { name, slug } }, { upsert: true });
}
const cat = await Category.findOne({ slug:'renforcement' });

let course = await Course.findOne({ title: 'Programme Full-Body Débutant' });
if(!course){
  course = await Course.create({
    title: 'Programme Full-Body Débutant',
    description: 'Un programme complet pour commencer en toute sécurité.',
    price_cents: 2999,
    category_id: cat ? cat._id : null,
    level: 'debutant',
    is_published: true,
    coach_name: 'Coach Sami'
  });
}

const lessonsData = [
  ['Intro','', 'Bienvenue', 1],
  ['Échauffement','', 'Échauffement général', 2],
  ['Séance A','https://videos.example/a','Mouvements de base',3]
];
for(const [title, url, content, pos] of lessonsData){
  await Lesson.updateOne({ course_id: course._id, title }, { $setOnInsert: { course_id: course._id, title, video_url: url, content, position: pos } }, { upsert: true });
}

await CourseImage.updateOne({ course_id: course._id, pos: 0 }, { $setOnInsert: { course_id: course._id, image_url: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200&auto=format&fit=crop', pos: 0 } }, { upsert: true });
await CourseImage.updateOne({ course_id: course._id, pos: 1 }, { $setOnInsert: { course_id: course._id, image_url: 'https://images.unsplash.com/photo-1526401485004-7a517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop', pos: 1 } }, { upsert: true });

console.log('Seed done.');
process.exit(0);
