import { FaCode, FaBrain, FaServer, FaRocket } from "react-icons/fa";

export default function About() {
  const highlights = [
    { icon: <FaCode />, title: "Full-Stack Dev", desc: "MERN Stack, REST APIs, modern UI" },
    { icon: <FaBrain />, title: "Machine Learning", desc: "Deep Learning, NLP, Computer Vision" },
    { icon: <FaServer />, title: "Backend Systems", desc: "Node.js, Express, PostgreSQL" },
    { icon: <FaRocket />, title: "Problem Solver", desc: "DSA, System Design, Optimization" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-center mb-12 animate-slide-up">About Me</h2>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Text */}
        <div className="flex-1 space-y-5 animate-slide-right">
          <p className="text-gray-300 leading-relaxed text-[15px]">
            I am a motivated and ambitious professional with a strong academic background in Electronics and Communication Engineering.
            Currently working at <span className="text-cyan-400 font-medium">The Emmes Company, LLC</span> and actively looking for 
            <span className="text-cyan-400 font-medium"> full-time Software Development Engineer (SDE) roles</span>.
          </p>
          <p className="text-gray-300 leading-relaxed text-[15px]">
            Over time, I have gained hands-on experience in <span className="text-cyan-400 font-medium">Machine Learning, Deep Learning, and Data Analytics</span>,
            working on real-world projects like water flow analysis, resume screening, and image-to-anime conversion.
          </p>
          <p className="text-gray-300 leading-relaxed text-[15px]">
            Alongside my ML expertise, I have developed a deep interest in <span className="text-cyan-400 font-medium">MERN Stack Development</span> (MongoDB, Express.js, React, and Node.js).
            I enjoy building modern, scalable, and user-friendly web applications, integrating my knowledge of front-end and back-end development to create complete solutions.
          </p>
          <p className="text-gray-300 leading-relaxed text-[15px]">
            My core strength lies in adapting quickly to new challenges, continuously learning, and applying my technical knowledge to solve complex problems.
            I am eager to contribute to a forward-thinking organization where I can utilize my expertise in programming, full-stack development, and machine learning
            to build innovative products that make a meaningful impact.
          </p>
        </div>

        {/* Profile Card */}
        <div className="w-full lg:w-auto flex justify-center animate-slide-left stagger-2">
          <div className="bg-[#0d1f3c]/80 border border-cyan-500/15 rounded-2xl p-8 text-center w-72 shadow-xl shadow-cyan-500/5 hover:shadow-cyan-500/15 hover:border-cyan-500/30 transition-all duration-500 group">
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-500/30 transition-all duration-500"></div>
              <img src="/images/Profile.jpg" alt="Profile" className="relative w-32 h-32 rounded-full mx-auto object-cover border-2 border-cyan-400/50 group-hover:scale-105 group-hover:border-cyan-400/80 transition-all duration-500" />
            </div>
            <h5 className="text-cyan-400 font-semibold text-lg">Shaik Mahammad Tarik</h5>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">Software Developer @ Emmes<br />MERN Stack | ML Enthusiast</p>
            <p className="text-green-400 text-xs mt-2 font-medium">🟢 Open to SDE Opportunities</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["React", "Node.js", "Python", "ML"].map((t, i) => (
                <span key={i} className="bg-cyan-400/10 text-cyan-300 text-[10px] px-2.5 py-1 rounded-full border border-cyan-500/20 hover:bg-cyan-400/20 hover:scale-105 transition-all duration-200">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skill highlights grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 animate-slide-up stagger-4">
        {highlights.map((h, i) => (
          <div key={i} className="group bg-[#0d1f3c]/60 border border-cyan-500/10 rounded-xl p-5 text-center hover:border-cyan-500/30 hover:bg-[#0d1f3c]/90 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
            <div className="text-2xl text-cyan-400 mb-3 group-hover:scale-125 transition-transform duration-300">{h.icon}</div>
            <h4 className="text-white text-sm font-semibold mb-1">{h.title}</h4>
            <p className="text-gray-500 text-xs">{h.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
