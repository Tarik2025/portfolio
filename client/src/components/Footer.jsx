import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-cyan-500/10 bg-[#0a1628]/80 backdrop-blur-sm py-8 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 text-center space-y-5">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <a href="tel:+919492610054" className="hover:text-cyan-400 hover:scale-105 transition-all duration-200">📞 +91 94926 10054</a>
          <a href="tel:+919392426719" className="hover:text-cyan-400 hover:scale-105 transition-all duration-200">📞 +91 93924 26719</a>
          <a href="mailto:smdtarik1244@gmail.com" className="hover:text-cyan-400 hover:scale-105 transition-all duration-200">📧 smdtarik1244@gmail.com</a>
          <span className="hover:text-cyan-400 transition-colors">📍 Proddatur, India</span>
        </div>
        <div className="flex justify-center gap-4">
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
              className="w-10 h-10 bg-white/5 border border-gray-700/50 rounded-xl flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-colors duration-300"
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
        <div className="pt-3 border-t border-white/5">
          <p className="text-gray-600 text-xs flex items-center justify-center gap-1">
            &copy; 2025 Shaik Mahammad Tarik. Made with <FaHeart className="text-red-400/60 text-[10px]" /> All Rights Reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
