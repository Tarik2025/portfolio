import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/education", label: "Education" },
  { path: "/internships", label: "Internships" },
  { path: "/skills", label: "Skills" },
  { path: "/projects", label: "Projects" },
  { path: "/certifications", label: "Certifications" },
  { path: "/resume", label: "Resume" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0a1628]/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_4px_30px_rgba(0,200,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white hover:text-cyan-400 transition-colors duration-200">
            <img src="/images/tlogo.jpg" alt="Logo" className="w-9 h-9 rounded-full object-cover ring-2 ring-cyan-500/30" />
            <span className="hidden sm:inline">MyPortfolio</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map(l => (
              <Link key={l.path} to={l.path}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  location.pathname === l.path 
                    ? "text-cyan-400 bg-cyan-400/10 shadow-[inset_0_0_0_1px_rgba(0,230,255,0.2)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-2xl text-gray-300 hover:text-white transition" onClick={() => setOpen(true)}>
            <HiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}></div>

        {/* Sidebar */}
        <div className={`absolute top-0 left-0 h-full w-64 bg-[#0a1628] border-r border-cyan-500/15 shadow-2xl shadow-cyan-500/5 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-cyan-500/10">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-white font-bold">
              <img src="/images/tlogo.jpg" alt="Logo" className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/30" />
              MyPortfolio
            </Link>
            <button onClick={() => setOpen(false)} className="text-2xl text-gray-400 hover:text-white transition">
              <HiX />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col py-4 px-3 gap-1">
            {links.map((l, i) => (
              <Link key={l.path} to={l.path} onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 50}ms` }}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${open ? "animate-slide-right" : ""} ${
                  location.pathname === l.path 
                    ? "text-cyan-400 bg-cyan-400/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(0,230,255,0.05)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Bottom */}
          <div className="absolute bottom-6 left-0 right-0 px-5">
            <div className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs">© 2025 Shaik Mahammad Tarik</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
