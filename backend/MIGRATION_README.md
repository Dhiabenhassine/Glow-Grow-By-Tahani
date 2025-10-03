This project has been migrated from SQLite to MongoDB (Mongoose).
- New DB initializer: src/lib/db.js (uses MONGODB_URI env var, default mongodb://localhost:27017/appdb)
- Models available via getModels(): User, Category, Course, Lesson, CourseImage
- seed.js now uses Mongoose to seed initial data.

To run:
1. Install dependencies: npm install
2. Start MongoDB locally or set MONGODB_URI
3. Run seed: node src/seed.js
4. Start server: node src/index.js
