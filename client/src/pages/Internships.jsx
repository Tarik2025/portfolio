import { useEffect, useState } from "react";
import api from "../api";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/internships").then(res => setInternships(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-10">Internships</h2>
      <div className="space-y-6">
        {internships.map((intern) => (
          <div key={intern.id} className="bg-[#001428]/80 border border-cyan-500/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-shadow">
            <div className="flex items-start gap-4">
              {intern.logo && <img src={intern.logo} alt="" className="w-14 h-14 rounded-full object-cover border border-cyan-500/30" />}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{intern.company} - {intern.role}</h3>
                <span className="text-cyan-400 text-sm">{intern.period}</span>
                <p className="text-gray-300 mt-2">{intern.description}</p>
                <ul className="mt-3 space-y-1 text-gray-400 text-sm list-disc list-inside">
                  {intern.points?.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {intern.skills?.map((s, j) => (
                    <span key={j} className="bg-cyan-400/10 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/30">{s}</span>
                  ))}
                </div>
                {intern.certificate && (
                  <a href={intern.certificate} target="_blank" rel="noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:scale-105 transition-transform">
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
