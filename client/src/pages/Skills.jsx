import { useEffect, useState } from "react";
import api from "../api";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/skills").then(res => setSkills(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 animate-slide-up">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Skills</h2>
        <p className="text-gray-500 text-sm">Technologies and tools I work with</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((cat, idx) => (
          <div key={cat.id} className={`group animate-scale-in stagger-${idx + 1}`}>
            <div className="h-full bg-[#001428]/80 border border-cyan-500/15 rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-2 hover:border-cyan-500/40 transition-all duration-500 relative overflow-hidden">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500"></div>
              
              <div className="relative">
                {cat.icon && (
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-cyan-400/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img src={cat.icon} alt={cat.category} className="relative w-16 h-16 mx-auto rounded-xl object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">{cat.category}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {cat.items?.map((item, j) => (
                    <span key={j} className="bg-cyan-400/10 text-cyan-300 text-xs px-3 py-1.5 rounded-full border border-cyan-500/20 hover:bg-cyan-400/25 hover:scale-110 hover:shadow-md hover:shadow-cyan-500/20 transition-all duration-200 cursor-default">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
