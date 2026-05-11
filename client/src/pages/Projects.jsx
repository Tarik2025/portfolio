import { useEffect, useState } from "react";
import api from "../api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/projects").then(res => setProjects(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-10">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-[#001428]/80 border border-cyan-500/20 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300">
            {p.image && <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {p.tech?.map((t, j) => (
                  <span key={j} className="bg-cyan-400/10 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/30">{t}</span>
                ))}
              </div>
              <p className="text-gray-500 text-xs"><strong className="text-gray-400">Skills:</strong> {p.skills}</p>
              {(p.githubUrl || p.liveUrl) && (
                <div className="flex gap-3 mt-3">
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 text-sm hover:underline">GitHub</a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-cyan-400 text-sm hover:underline">Live Demo</a>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
