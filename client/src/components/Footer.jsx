import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 bg-[#0a1628]/80 backdrop-blur-sm py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <a href="tel:+919492610054" className="hover:text-cyan-400 transition-colors duration-200">📞 +91 94926 10054</a>
          <a href="tel:+919392426719" className="hover:text-cyan-400 transition-colors duration-200">📞 +91 93924 26719</a>
          <a href="mailto:smdtarik1244@gmail.com" className="hover:text-cyan-400 transition-colors duration-200">📧 smdtarik1244@gmail.com</a>
          <span>📍 Proddatur, India</span>
        </div>
        <div className="flex justify-center gap-5">
          <a href="https://github.com/Tarik2025" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-cyan-400 text-xl transition-colors duration-200"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/shaik-tarik-3a0504237/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-cyan-400 text-xl transition-colors duration-200"><FaLinkedin /></a>
        </div>
        <div className="pt-2 border-t border-white/5">
          <p className="text-gray-600 text-xs">&copy; 2025 Shaik Mahammad Tarik. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
