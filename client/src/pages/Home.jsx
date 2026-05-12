import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import api from "../api";
import { FaArrowRight, FaGithub, FaLinkedin, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import AnimatedSection from "../components/AnimatedSection";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
  const [content, setContent] = useState(null);
  const [displayed, setDisplayed] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allData, setAllData] = useState({ projects: [], skills: [], education: [], internships: [], certifications: [] });
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/home").then(res => {
      setContent(res.data.data);
      setLoaded(true);
    }).catch(() => {
      setContent({
        greeting: "Hi, I'm Shaik Mahammad Tarik",
        typingText: "Full-Stack Developer | Currently at The Emmes Company, LLC | Passionate about MERN Stack, Machine Learning & building innovative products | Open to SDE roles.",
        subtitle: "Welcome to My Portfolio",
        description: "Showcasing my journey, skills, projects, and achievements. Currently looking for full-time SDE opportunities.",
        profileImage: "/images/Profile.jpg"
      });
      setLoaded(true);
    });

    Promise.all([
      api.get("/api/projects").catch(() => ({ data: { data: [] } })),
      api.get("/api/skills").catch(() => ({ data: { data: [] } })),
      api.get("/api/education").catch(() => ({ data: { data: [] } })),
      api.get("/api/internships").catch(() => ({ data: { data: [] } })),
      api.get("/api/certifications").catch(() => ({ data: { data: { certifications: [], achievements: [] } } })),
    ]).then(([proj, skill, edu, intern, cert]) => {
      setAllData({
        projects: proj.data.data || [],
        skills: skill.data.data || [],
        education: edu.data.data || [],
        internships: intern.data.data || [],
        certifications: cert.data.data?.certifications || [],
      });
    });
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!content?.typingText) return;
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(content.typingText.slice(0, i + 1));
      i++;
      if (i >= content.typingText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [content]);

  const handleSearch = (val) => {
    setQuery(val);
    if (!val.trim()) { setResults([]); setShowResults(false); return; }
    const q = val.toLowerCase();
    const matched = [];

    allData.projects.forEach(p => {
      if (p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.tech?.some(t => t.toLowerCase().includes(q)) || p.skills?.toLowerCase().includes(q))
        matched.push({ type: "Project", title: p.title, desc: p.description, link: "/projects" });
    });
    allData.skills.forEach(s => {
      if (s.category?.toLowerCase().includes(q) || s.items?.some(i => i.toLowerCase().includes(q)))
        matched.push({ type: "Skill", title: s.category, desc: s.items?.join(", "), link: "/skills" });
    });
    allData.education.forEach(e => {
      if (e.school?.toLowerCase().includes(q) || e.degree?.toLowerCase().includes(q) || e.coursework?.some(c => c.toLowerCase().includes(q)))
        matched.push({ type: "Education", title: e.school, desc: e.degree, link: "/education" });
    });
    allData.internships.forEach(i => {
      if (i.company?.toLowerCase().includes(q) || i.role?.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q) || i.skills?.some(s => s.toLowerCase().includes(q)))
        matched.push({ type: "Internship", title: `${i.company} - ${i.role}`, desc: i.description, link: "/internships" });
    });
    allData.certifications.forEach(c => {
      if (c.title?.toLowerCase().includes(q) || c.issuer?.toLowerCase().includes(q) || c.tools?.toLowerCase().includes(q))
        matched.push({ type: "Certification", title: c.title, desc: c.issuer, link: "/certifications" });
    });

    setResults(matched.slice(0, 6));
    setShowResults(true);
  };

  const handleResultClick = (link) => {
    setShowResults(false);
    setQuery("");
    navigate(link);
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full"
        />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
              style={{ top: `${15 + i * 15}%`, left: `${10 + i * 16}%` }}
              animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 relative">
          {/* Text */}
          <motion.div
            className="flex-1 text-center md:text-left space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUpItem}>
              <motion.span
                className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium rounded-full mb-4"
                animate={{ boxShadow: ["0 0 0px rgba(34,197,94,0)", "0 0 15px rgba(34,197,94,0.3)", "0 0 0px rgba(34,197,94,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🟢 Open to SDE Opportunities
              </motion.span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight">
                <span className="text-gray-100">{content.greeting?.split("Shaik Mahammad Tarik")[0]}</span>
                <br className="hidden sm:block" />
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 inline-block"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Shaik Mahammad Tarik
                </motion.span>
              </h1>
            </motion.div>

            <motion.p variants={fadeUpItem} className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0 min-h-[60px]">
              {displayed}<span className="inline-block w-[2px] h-5 bg-cyan-400 ml-0.5 animate-pulse"></span>
            </motion.p>

            <motion.div variants={fadeUpItem} className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link to="/projects" className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-shadow duration-300 text-sm">
                  View Projects <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-cyan-500/25 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 text-sm">
                  Contact Me
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-gray-600/30 text-gray-300 font-semibold rounded-xl hover:bg-white/10 hover:border-gray-500/50 transition-all duration-300 text-sm">
                  Resume
                </a>
              </motion.div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUpItem} className="flex gap-4 justify-center md:justify-start pt-1">
              {[
                { href: "https://github.com/Tarik2025", icon: <FaGithub /> },
                { href: "https://www.linkedin.com/in/shaik-tarik-3a0504237/", icon: <FaLinkedin /> },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/5 border border-gray-600/30 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-colors duration-300"
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, scale: 0.8, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 rounded-full blur-3xl scale-150 animate-pulse"></div>
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full opacity-20 blur-md"></div>
              <motion.img
                src={content.profileImage}
                alt="Shaik Mahammad Tarik"
                className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full object-cover border-[3px] border-cyan-400/40 shadow-[0_0_80px_rgba(0,200,255,0.15)]"
                whileHover={{ scale: 1.05, borderColor: "rgba(0,230,255,0.7)" }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <AnimatedSection variant="fadeUp" delay={0.5} className="max-w-2xl mx-auto mt-16">
          <div className="relative" ref={searchRef}>
            <motion.div
              className="flex items-center bg-[#0d1f3c]/80 border border-cyan-500/20 rounded-2xl px-5 py-3.5 shadow-lg shadow-cyan-500/5"
              whileHover={{ borderColor: "rgba(0,230,255,0.4)", boxShadow: "0 0 30px rgba(0,200,255,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <FaSearch className="text-cyan-400/60 mr-3 text-sm" />
              <input
                type="text"
                value={query}
                onChange={e => handleSearch(e.target.value)}
                onFocus={() => query && setShowResults(true)}
                placeholder="Search projects, skills, internships..."
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
              />
              {query && (
                <button onClick={() => { setQuery(""); setResults([]); setShowResults(false); }} className="text-gray-500 hover:text-white text-xs ml-2 transition-colors">✕</button>
              )}
            </motion.div>

            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#0d1f3c]/95 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden z-50"
              >
                {results.length === 0 ? (
                  <div className="px-5 py-4 text-gray-500 text-sm text-center">No results found for "{query}"</div>
                ) : (
                  <div className="py-2">
                    {results.map((r, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleResultClick(r.link)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="w-full text-left px-5 py-3 hover:bg-cyan-500/10 transition-colors flex items-start gap-3 group"
                      >
                        <span className="text-[10px] px-2 py-0.5 bg-cyan-500/15 text-cyan-400 rounded-md font-medium mt-0.5 flex-shrink-0">{r.type}</span>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate group-hover:text-cyan-300 transition-colors">{r.title}</p>
                          <p className="text-gray-500 text-xs truncate mt-0.5">{r.desc}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
          <p className="text-center text-gray-600 text-xs mt-2">Search across my portfolio — projects, skills, education & more</p>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection variant="fadeUp" delay={0.6} className="grid grid-cols-3 gap-4 mt-14 max-w-2xl mx-auto">
          {[
            { label: "CGPA", value: "8.9" },
            { label: "Internships", value: "4+" },
            { label: "Projects", value: "5+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group text-center py-5 px-3 bg-[#0d1f3c]/50 border border-cyan-500/10 rounded-xl hover:border-cyan-500/30 hover:bg-[#0d1f3c]/80 hover:shadow-lg hover:shadow-cyan-500/5 transition-colors duration-300"
            >
              <motion.div
                className="text-xl sm:text-2xl font-bold text-cyan-400"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection variant="fadeUp" delay={0.7} className="text-center mt-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{content.subtitle}</h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">{content.description}</p>
        </AnimatedSection>
      </div>
    </PageTransition>
  );
}
