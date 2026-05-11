import { useEffect, useState } from "react";
import api from "../api";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/skills").then(res => setSkills(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-10">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((cat) => (
          <div key={cat.id} className="bg-[#001428]/80 border border-cyan-500/20 rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300">
            {cat.icon && <img src={cat.icon} alt={cat.category} className="w-16 h-16 mx-auto mb-4 rounded-lg object-cover" />}
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">{cat.category}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {cat.items?.map((item, j) => (
                <span key={j} className="bg-cyan-400/10 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/30">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
