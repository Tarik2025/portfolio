require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function setup() {
  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS "Admin" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "Message" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      "isRead" BOOLEAN DEFAULT false,
      "createdAt" TIMESTAMP DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "Project" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT DEFAULT '',
      tech TEXT[] DEFAULT '{}',
      skills TEXT DEFAULT '',
      "githubUrl" TEXT DEFAULT '',
      "liveUrl" TEXT DEFAULT '',
      "order" INT DEFAULT 0,
      "createdAt" TIMESTAMP DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "Skill" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      category TEXT NOT NULL,
      icon TEXT DEFAULT '',
      items TEXT[] DEFAULT '{}',
      "order" INT DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "Education" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      school TEXT NOT NULL,
      degree TEXT NOT NULL,
      period TEXT NOT NULL,
      cgpa TEXT NOT NULL,
      logo TEXT DEFAULT '',
      image TEXT DEFAULT '',
      highlights TEXT[] DEFAULT '{}',
      coursework TEXT[] DEFAULT '{}',
      "order" INT DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "Internship" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      period TEXT NOT NULL,
      description TEXT NOT NULL,
      logo TEXT DEFAULT '',
      points TEXT[] DEFAULT '{}',
      skills TEXT[] DEFAULT '{}',
      certificate TEXT DEFAULT '',
      "order" INT DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "Certification" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      issuer TEXT NOT NULL,
      image TEXT DEFAULT '',
      points TEXT[] DEFAULT '{}',
      tools TEXT DEFAULT '',
      "order" INT DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "Achievement" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      text TEXT NOT NULL,
      "order" INT DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "HomeContent" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      greeting TEXT DEFAULT 'Hi, I''m Shaik Mahammad Tarik',
      "typingText" TEXT DEFAULT '',
      subtitle TEXT DEFAULT '',
      description TEXT DEFAULT '',
      "profileImage" TEXT DEFAULT '/images/Profile.jpg'
    )
  `;

  console.log("✅ All tables created!");

  // Create admin user
  const bcrypt = require("bcryptjs");
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  
  await sql`
    INSERT INTO "Admin" (email, password)
    VALUES (${process.env.ADMIN_EMAIL}, ${hashedPassword})
    ON CONFLICT (email) DO NOTHING
  `;
  console.log("✅ Admin user created!");

  // Seed home content
  const existing = await sql`SELECT id FROM "HomeContent" LIMIT 1`;
  if (existing.length === 0) {
    await sql`
      INSERT INTO "HomeContent" (greeting, "typingText", subtitle, description, "profileImage")
      VALUES (
        'Hi, I''m Shaik Mahammad Tarik',
        'I''m an aspiring Electronics & Communication Engineer, passionate about MERN Stack Development, Machine Learning, and building innovative projects.',
        'Welcome to My Portfolio',
        'Showcasing my journey, skills, projects, and achievements.',
        '/images/Profile.jpg'
      )
    `;
    console.log("✅ Home content seeded!");
  }

  console.log("🚀 Database setup complete!");
}

setup().catch(e => { console.error("❌ Error:", e.message); process.exit(1); });
