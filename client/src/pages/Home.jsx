import { useEffect, useState } from "react";
import api from "../api";
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  const [content, setContent] = useState(null);
  const [displayed, setDisplayed] = useState("");
  const [loaded, setLoaded] = useState(false);

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

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400/15 rounded-full animate-float stagger-2"></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-400/20 rounded-full animate-float stagger-4"></div>
        <div className="absolute top-60 right-1/3 w-1.5 h-1.5 bg-cyan-300/25 rounded-full animate-float stagger-6"></div>
        <div className="absolute bottom-20 right-10 w-2.5 h-2.5 bg-blue-300/15 rounded-full animate-float stagger-3"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 relative">
        {/* Text */}
        <div className="flex-1 text-center md:text-left space-y-6 animate-slide-right">
          <div>
            <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium rounded-full mb-4 animate-scale-in stagger-1">
              🟢 Open to SDE Opportunities
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight">
              <span className="text-gray-100">{content.greeting?.split("Shaik Mahammad Tarik")[0]}</span>
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">Shaik Mahammad Tarik</span>
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0 min-h-[60px]">
            {displayed}<span className="inline-block w-[2px] h-5 bg-cyan-400 ml-0.5 animate-pulse"></span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2 animate-slide-up stagger-3">
            <Link to="/projects" className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 text-sm">
              View Projects <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-cyan-500/25 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 text-sm">
              Contact Me
            </Link>
            <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-gray-600/30 text-gray-300 font-semibold rounded-xl hover:bg-white/10 hover:border-gray-500/50 transition-all duration-300 text-sm">
              Resume
            </a>
          </div>
          {/* Social links */}
          <div className="flex gap-4 justify-center md:justify-start pt-1 animate-slide-up stagger-4">
            <a href="https://github.com/Tarik2025" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 border border-gray-600/30 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/shaik-tarik-3a0504237/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 border border-gray-600/30 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="flex-shrink-0 relative animate-slide-left stagger-2">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 rounded-full blur-3xl scale-150 animate-pulse"></div>
          <div className="relative animate-float">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full opacity-20 blur-md animate-glow"></div>
            <img src={content.profileImage} alt="Shaik Mahammad Tarik"
              className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full object-cover border-[3px] border-cyan-400/40 shadow-[0_0_80px_rgba(0,200,255,0.15)] hover:scale-105 hover:border-cyan-400/70 transition-all duration-500" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-20 max-w-2xl mx-auto animate-slide-up stagger-5">
        {[
          { label: "CGPA", value: "8.9" },
          { label: "Internships", value: "4+" },
          { label: "Projects", value: "5+" },
        ].map((stat, i) => (
          <div key={i} className="group text-center py-5 px-3 bg-[#0d1f3c]/50 border border-cyan-500/10 rounded-xl hover:border-cyan-500/30 hover:bg-[#0d1f3c]/80 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1 transition-all duration-300">
            <div className="text-xl sm:text-2xl font-bold text-cyan-400 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Subtitle */}
      <div className="text-center mt-16 space-y-3 animate-slide-up stagger-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{content.subtitle}</h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">{content.description}</p>
      </div>
    </div>
  );
}
