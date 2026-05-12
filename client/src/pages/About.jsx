import { motion } from "framer-motion";
import { FaCode, FaBrain, FaServer, FaRocket } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import AnimatedSection from "../components/AnimatedSection";

export default function About() {
  const highlights = [
    { icon: <FaCode />, title: "Full-Stack Dev", desc: "MERN Stack, REST APIs, modern UI" },
    { icon: <FaBrain />, title: "Machine Learning", desc: "Deep Learning, NLP, Computer Vision" },
    { icon: <FaServer />, title: "Backend Systems", desc: "Node.js, Express, PostgreSQL" },
    { icon: <FaRocket />, title: "Problem Solver", desc: "DSA, System Design, Optimization" },
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <AnimatedSection variant="fadeUp">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-center mb-12">About Me</h2>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Text */}
          <AnimatedSection variant="fadeRight" className="flex-1 space-y-5">
            {[
              <>I am a motivated and ambitious professional with a strong academic background in Electronics and Communication Engineering. Currently working at <span className="text-cyan-400 font-medium">The Emmes Company, LLC</span> and actively looking for <span className="text-cyan-400 font-medium"> full-time Software Development Engineer (SDE) roles</span>.</>,
              <>Over time, I have gained hands-on experience in <span className="text-cyan-400 font-medium">Machine Learning, Deep Learning, and Data Analytics</span>, working on real-world projects like water flow analysis, resume screening, and image-to-anime conversion.</>,
              <>Alongside my ML expertise, I have developed a deep interest in <span className="text-cyan-400 font-medium">MERN Stack Development</span> (MongoDB, Express.js, React, and Node.js). I enjoy building modern, scalable, and user-friendly web applications, integrating my knowledge of front-end and back-end development to create complete solutions.</>,
              <>My core strength lies in adapting quickly to new challenges, continuously learning, and applying my technical knowledge to solve complex problems. I am eager to contribute to a forward-thinking organization where I can utilize my expertise in programming, full-stack development, and machine learning to build innovative products that make a meaningful impact.</>,
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-gray-300 leading-relaxed text-[15px]"
              >
                {text}
              </motion.p>
            ))}
          </AnimatedSection>

          {/* Profile Card */}
          <AnimatedSection variant="fadeLeft" delay={0.2} className="w-full lg:w-auto flex justify-center">
            <motion.div
              whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,200,255,0.15)" }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-[#0d1f3c]/80 border border-cyan-500/15 rounded-2xl p-8 text-center w-72 shadow-xl shadow-cyan-500/5 hover:border-cyan-500/30 transition-colors duration-500 group"
            >
              <div className="relative inline-block mb-5">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-500/30 transition-all duration-500"></div>
                <motion.img
                  src="/images/Profile.jpg"
                  alt="Profile"
                  className="relative w-32 h-32 rounded-full mx-auto object-cover border-2 border-cyan-400/50"
                  whileHover={{ scale: 1.08, borderColor: "rgba(0,230,255,0.8)" }}
                />
              </div>
              <h5 className="text-cyan-400 font-semibold text-lg">Shaik Mahammad Tarik</h5>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">Software Developer @ Emmes<br />MERN Stack | ML Enthusiast</p>
              <p className="text-green-400 text-xs mt-2 font-medium">🟢 Open to SDE Opportunities</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["React", "Node.js", "Python", "ML"].map((t, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="bg-cyan-400/10 text-cyan-300 text-[10px] px-2.5 py-1 rounded-full border border-cyan-500/20 hover:bg-cyan-400/20 transition-colors duration-200"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Skill highlights grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {highlights.map((h, i) => (
            <AnimatedSection key={i} variant="scaleUp" delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-[#0d1f3c]/60 border border-cyan-500/10 rounded-xl p-5 text-center hover:border-cyan-500/30 hover:bg-[#0d1f3c]/90 hover:shadow-lg hover:shadow-cyan-500/10 transition-colors duration-300"
              >
                <motion.div
                  className="text-2xl text-cyan-400 mb-3"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {h.icon}
                </motion.div>
                <h4 className="text-white text-sm font-semibold mb-1">{h.title}</h4>
                <p className="text-gray-500 text-xs">{h.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
