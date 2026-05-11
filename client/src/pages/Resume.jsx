import { FiExternalLink, FiDownload } from "react-icons/fi";

export default function Resume() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <div className="animate-slide-up">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Resume</h2>
        <p className="text-gray-400 mb-10">Click below to view or download my latest resume.</p>
      </div>

      <div className="max-w-md mx-auto animate-scale-in stagger-2">
        <div className="group bg-[#0d1f3c]/80 border border-cyan-500/15 rounded-2xl p-10 shadow-xl shadow-cyan-500/5 hover:shadow-cyan-500/15 hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500"></div>
          
          <div className="relative">
            <div className="text-6xl mb-5 group-hover:scale-110 transition-transform duration-300">📄</div>
            <h3 className="text-xl font-semibold text-white mb-2">My Resume</h3>
            <p className="text-gray-400 text-sm mb-8">Updated resume with education, skills, projects, internships, and experience.</p>
            <div className="flex flex-col gap-3">
              <a href="/Resume.pdf" target="_blank" rel="noreferrer"
                className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300">
                <FiExternalLink className="group-hover/btn:rotate-12 transition-transform" /> View Resume
              </a>
              <a href="/Resume.pdf" download
                className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-cyan-500/30 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
                <FiDownload className="group-hover/btn:translate-y-0.5 transition-transform" /> Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
