import { FiExternalLink, FiDownload } from "react-icons/fi";

export default function Resume() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">Resume</h2>
      <p className="text-gray-400 mb-8">Click below to view or download my latest resume.</p>
      <div className="max-w-md mx-auto bg-[#0d1f3c]/80 border border-cyan-500/15 rounded-2xl p-8 shadow-xl shadow-cyan-500/5">
        <div className="text-5xl mb-4">📄</div>
        <h3 className="text-xl font-semibold text-white mb-2">My Resume</h3>
        <p className="text-gray-400 text-sm mb-6">Updated resume with education, skills, projects, internships, and experience.</p>
        <div className="flex flex-col gap-3">
          <a href="/Resume.pdf" target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-cyan-500/25">
            <FiExternalLink /> View Resume
          </a>
          <a href="/Resume.pdf" download
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-cyan-500/30 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-500/10 transition">
            <FiDownload /> Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
