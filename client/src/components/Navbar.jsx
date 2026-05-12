import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 w-full z-50 bg-[#0a1628]/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_4px_30px_rgba(0,200,255,0.05)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white hover:text-cyan-400 transition-colors duration-200">
            <motion.img
              whileHover={{ scale: 1.1, rotate: 5 }}
              src="/images/tlogo.jpg"
              alt="Logo"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-cyan-500/30"
            />
            <span className="hidden sm:inline">MyPortfolio</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map(l => (
              <Link key={l.path} to={l.path}
                className={`relative px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  location.pathname === l.path
                    ? "text-cyan-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}>
                {l.label}
                {location.pathname === l.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-cyan-400/10 border border-cyan-500/20 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-2xl text-gray-300 hover:text-white transition"
            onClick={() => setOpen(true)}
          >
            <HiMenu />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 h-full w-64 bg-[#0a1628] border-r border-cyan-500/15 shadow-2xl shadow-cyan-500/5"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-cyan-500/10">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-white font-bold">
                  <img src="/images/tlogo.jpg" alt="Logo" className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/30" />
                  MyPortfolio
                </Link>
                <motion.button whileTap={{ scale: 0.8, rotate: 90 }} onClick={() => setOpen(false)} className="text-2xl text-gray-400 hover:text-white transition">
                  <HiX />
                </motion.button>
              </div>

              {/* Links */}
              <div className="flex flex-col py-4 px-3 gap-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link to={l.path} onClick={() => setOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        location.pathname === l.path
                          ? "text-cyan-400 bg-cyan-400/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(0,230,255,0.05)]"
                          : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}>
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom */}
              <div className="absolute bottom-6 left-0 right-0 px-5">
                <div className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-xs">© 2025 Shaik Mahammad Tarik</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
