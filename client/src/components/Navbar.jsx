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
        <button className="lg:hidden text-2xl text-gray-300 hover:text-white transition" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-[#0a1628] border-t border-cyan-500/10 px-4 pb-4">
          <div className="grid grid-cols-3 gap-2 pt-3">
            {links.map(l => (
              <Link key={l.path} to={l.path} onClick={() => setOpen(false)}
                className={`text-center py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  location.pathname === l.path 
                    ? "text-cyan-400 bg-cyan-400/10 shadow-[inset_0_0_0_1px_rgba(0,230,255,0.2)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
