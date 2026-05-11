import { useEffect, useState } from "react";
import api from "../api";
import { FaTrophy, FaCertificate } from "react-icons/fa";

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/certifications").then(res => {
      setCerts(res.data.data.certifications);
      setAchievements(res.data.data.achievements);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 animate-slide-up">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Certifications</h2>
        <p className="text-gray-500 text-sm">Courses and certifications I've completed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {certs.map((cert, idx) => (
          <div key={cert.id} className={`group animate-scale-in stagger-${idx + 1}`}>
            <div className="h-full bg-[#001428]/80 border border-cyan-500/15 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-2 hover:border-cyan-500/30 transition-all duration-500">
              {cert.image && (
                <div className="relative overflow-hidden">
                  <img src={cert.image} alt={cert.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001428] via-transparent to-transparent opacity-50"></div>
                  <div className="absolute top-3 right-3 w-10 h-10 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl flex items-center justify-center">
                    <FaCertificate className="text-cyan-400" />
                  </div>
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">{cert.title}</h3>
                <p className="text-cyan-400 text-sm mb-3 font-medium">{cert.issuer}</p>
                <ul className="space-y-1.5 text-gray-400 text-sm">
                  {cert.points?.map((p, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">▹</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {cert.tools && <p className="text-gray-500 text-xs mt-3 pt-3 border-t border-cyan-500/10"><strong className="text-gray-400">Tools:</strong> {cert.tools}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="animate-slide-up stagger-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Achievements</h2>
          <p className="text-gray-500 text-sm">Milestones and recognitions</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {achievements.map((a, idx) => (
            <div key={a.id} className={`group animate-slide-up stagger-${idx + 1}`}>
              <div className="flex items-start gap-4 bg-[#001428]/60 border border-cyan-500/10 rounded-xl p-4 hover:bg-[#001428]/90 hover:border-cyan-500/25 hover:-translate-x-1 transition-all duration-300">
                <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                  <FaTrophy className="text-cyan-400 text-sm" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
