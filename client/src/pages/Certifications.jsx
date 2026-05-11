import { useEffect, useState } from "react";
import api from "../api";

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

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-10">Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {certs.map((cert) => (
          <div key={cert.id} className="bg-[#001428]/80 border border-cyan-500/20 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition-shadow">
            {cert.image && <img src={cert.image} alt={cert.title} className="w-full h-52 object-cover" />}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-1">{cert.title}</h3>
              <p className="text-cyan-400 text-sm mb-3">{cert.issuer}</p>
              <ul className="space-y-1 text-gray-400 text-sm list-disc list-inside">
                {cert.points?.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
              <p className="text-gray-500 text-xs mt-3"><strong className="text-gray-400">Tools:</strong> {cert.tools}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Achievements</h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {achievements.map((a) => (
          <div key={a.id} className="flex items-start gap-3 bg-[#001428]/60 border border-cyan-500/15 rounded-xl p-4 hover:bg-[#001428]/90 transition">
            <span className="text-cyan-400 text-lg">🏆</span>
            <p className="text-gray-300 text-sm">{a.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
