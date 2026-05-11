require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log("Seeding data...");

  // Skills
  const skills = [
    { category: "Programming", icon: "/images/skills/programming.jpeg", items: ["C++", "Python", "C", "Embedded C", "MATLAB", "HTML", "CSS", "JavaScript", "Verilog", "VHDL"], order: 1 },
    { category: "Backend", icon: "/images/skills/backend.png", items: ["Node.js", "Express.js"], order: 2 },
    { category: "Databases", icon: "/images/skills/database.png", items: ["MySQL", "MongoDB"], order: 3 },
    { category: "Tools", icon: "/images/skills/tools.png", items: ["VS Code", "Arduino IDE", "Keil", "Proteus", "MS Excel", "MS Office"], order: 4 },
    { category: "Soft Skills", icon: "/images/skills/softskills.png", items: ["Leadership", "Adaptability", "Flexibility", "Hardworking"], order: 5 },
  ];
  for (const s of skills) {
    await sql`INSERT INTO "Skill" (category, icon, items, "order") VALUES (${s.category}, ${s.icon}, ${s.items}, ${s.order})`;
  }
  console.log("✅ Skills seeded");

  // Education
  const education = [
    { school: "Central University of Karnataka", degree: "B.Tech in Electronics and Communication Engineering", period: "2021 - 2025", cgpa: "8.9", logo: "/images/logocuk.png", image: "/images/CUK.jpg", highlights: ["Consistently maintained excellent academic performance with a 8.9 CGPA.", "Worked on antenna design using ML, automatic irrigation systems, and image processing.", "Gained expertise in Machine Learning, IoT, RF Systems, and Embedded Design.", "Demonstrated leadership and teamwork by guiding project groups.", "Actively explored MERN Stack Development for full-stack applications."], coursework: ["Data Structures", "Analog & Digital Communication", "Machine Learning", "Signal Processing", "Embedded Systems", "IoT & Architecture", "RF & Microwave"], order: 1 },
    { school: "Narayana Junior College", degree: "MPC (Maths, Physics, Chemistry)", period: "Jun 2018 – Mar 2020", cgpa: "9.1", logo: "/images/narayanalogo.png", image: "/images/naryana1.jpeg", highlights: ["Qualified JEE Mains with 89.9 percentile and JEE Advanced with 73 Marks.", "Developed strong analytical skills and logical reasoning abilities.", "Participated in science workshops, coding challenges, and competitive study sessions.", "Built a strong foundation in Physics & Mathematics."], coursework: [], order: 2 },
    { school: "Gautam High School", degree: "Secondary School Certificate (SSC)", period: "Jun 2017 – Mar 2018", cgpa: "9.3", logo: "/images/gautamlogo.png", image: "/images/gautam.jpeg", highlights: ["Scored distinction with 9.3 CGPA, excelling in all subjects.", "Participated in science exhibitions, quiz competitions, and cultural activities.", "Recognized for discipline, consistency, and academic excellence."], coursework: [], order: 3 },
  ];
  for (const e of education) {
    await sql`INSERT INTO "Education" (school, degree, period, cgpa, logo, image, highlights, coursework, "order") VALUES (${e.school}, ${e.degree}, ${e.period}, ${e.cgpa}, ${e.logo}, ${e.image}, ${e.highlights}, ${e.coursework}, ${e.order})`;
  }
  console.log("✅ Education seeded");

  // Internships
  const internships = [
    { company: "IIT Dharwad", role: "Machine Learning Intern", period: "May 2024 - July 2024", description: "Worked on water flow analysis using ML/DL models and optical flow techniques to estimate water discharge and velocity. Developed an interactive GUI with Streamlit.", logo: "/images/IITdh.png", points: ["Applied computer vision methods for real-world water resource applications.", "Collaborated with researchers to optimize model accuracy and efficiency.", "Designed a reusable framework for future hydrology-based ML projects."], skills: ["Machine Learning", "Deep Learning", "Computer Vision", "Optical Flow", "Streamlit"], certificate: "/Pdfs/IITDH.pdf", order: 1 },
    { company: "Trainity", role: "Data Analytics Intern", period: "Apr 2023 - Aug 2023", description: "Worked on Instagram analytics, hiring trends, IMDB insights, bank loan dynamics, and car pricing strategies.", logo: "/images/trainitylogo.png", points: ["Cleaned and analyzed large datasets using Python and Excel.", "Built dashboards to present findings effectively.", "Improved decision-making efficiency through data storytelling."], skills: ["Data Analytics", "Python", "Excel", "Statistical Analysis", "Data Visualization"], certificate: "/Pdfs/trainity.pdf", order: 2 },
    { company: "Krayto Pvt Ltd", role: "Business Development Intern", period: "Apr 2022 - Jun 2022", description: "Contributed to market research, competitor analysis, and product strategy. Assisted in sales optimization and customer engagement.", logo: "/images/kraytologo.jpeg", points: ["Conducted industry research to identify opportunities.", "Helped design marketing strategies and campaigns.", "Strengthened client interaction and communication skills."], skills: ["Market Research", "Strategic Planning", "Business Development", "Sales Optimization"], certificate: "/Pdfs/Krayto.pdf", order: 3 },
  ];
  for (const i of internships) {
    await sql`INSERT INTO "Internship" (company, role, period, description, logo, points, skills, certificate, "order") VALUES (${i.company}, ${i.role}, ${i.period}, ${i.description}, ${i.logo}, ${i.points}, ${i.skills}, ${i.certificate}, ${i.order})`;
  }
  console.log("✅ Internships seeded");

  // Projects
  const projects = [
    { title: "Automatic Water Irrigation System", description: "Developed a smart irrigation system using sensors and microcontrollers to automate water supply based on soil moisture levels.", image: "/images/projects/embedded.jpeg", tech: ["Embedded C", "Arduino", "Sensors"], skills: "Embedded Systems, IoT, Circuit Design, Automation", order: 1 },
    { title: "Design Optimization of RMS Antenna using ML", description: "Optimizing antenna parameters using machine learning models to improve bandwidth and efficiency in RF communication systems.", image: "/images/projects/antenna.jpeg", tech: ["Python", "TensorFlow", "Random Forest", "RF Simulation"], skills: "Antenna Design, Machine Learning, RF & Microwave Engineering", order: 2 },
    { title: "Image to Anime and Cartoon Conversion", description: "Implemented image processing to convert real images into anime/cartoon-style outputs using MATLAB algorithms.", image: "/images/projects/anime1.jpeg", tech: ["MATLAB", "Image Processing Toolbox"], skills: "Image Processing, Pattern Recognition, Algorithm Development", order: 3 },
    { title: "Resume Screening Website", description: "ML-based web app to automatically screen resumes using NLP techniques, helping recruiters shortlist candidates efficiently.", image: "/images/projects/resume.png", tech: ["Python", "Flask", "NLP", "Scikit-learn"], skills: "Natural Language Processing, Web Development, Classification", order: 4 },
    { title: "Gender Voice Classifier", description: "Classifier to distinguish between male and female voices using ML algorithms on extracted audio features such as MFCCs.", image: "/images/projects/ml.jpeg", tech: ["Python", "Librosa", "Scikit-learn"], skills: "Speech Processing, Audio Feature Extraction, Classification", order: 5 },
  ];
  for (const p of projects) {
    await sql`INSERT INTO "Project" (title, description, image, tech, skills, "order") VALUES (${p.title}, ${p.description}, ${p.image}, ${p.tech}, ${p.skills}, ${p.order})`;
  }
  console.log("✅ Projects seeded");

  // Certifications
  const certs = [
    { title: "Machine Learning and Deep Learning – Fundamentals and Applications", issuer: "NPTEL, IIT Guwahati | Jul–Oct 2024 | Score: 58%", image: "/images/certificates/ML_page-0001.jpg", points: ["Studied supervised and unsupervised learning approaches.", "Explored neural networks, CNNs, RNNs, and deep architectures.", "Hands-on practice with backpropagation, optimization, and regularization.", "Applied ML/DL models to computer vision and predictive analytics."], tools: "Python, NumPy, TensorFlow, Scikit-learn", order: 1 },
    { title: "Basic Linear Algebra", issuer: "NPTEL, IIT Bombay | Feb–Apr 2023 | Score: 52%", image: "/images/certificates/BSC.jpeg", points: ["Mastered matrices, determinants, vector spaces, eigenvalues & eigenvectors.", "Understood linear transformations and their applications.", "Applied algebraic methods to ML, computer vision, and signal processing.", "Enhanced logical reasoning and mathematical modeling skills."], tools: "Foundation for ML algorithms, 3D graphics, robotics, optimization", order: 2 },
  ];
  for (const c of certs) {
    await sql`INSERT INTO "Certification" (title, issuer, image, points, tools, "order") VALUES (${c.title}, ${c.issuer}, ${c.image}, ${c.points}, ${c.tools}, ${c.order})`;
  }
  console.log("✅ Certifications seeded");

  // Achievements
  const achievements = [
    "Awarded the Bharathi Cement Scholarship for meritorious academic performance.",
    "Maintained a consistent CGPA of 8.9, reflecting dedication and subject mastery.",
    "Led and contributed to individual & group projects, demonstrating leadership.",
    "Secured the only paid internship in my class, showcasing industry readiness.",
    "Recognized for guiding peers, adaptability, and leadership qualities."
  ];
  for (let i = 0; i < achievements.length; i++) {
    await sql`INSERT INTO "Achievement" (text, "order") VALUES (${achievements[i]}, ${i + 1})`;
  }
  console.log("✅ Achievements seeded");

  console.log("🚀 All data seeded successfully!");
}

seed().catch(e => { console.error("❌ Error:", e.message); process.exit(1); });
