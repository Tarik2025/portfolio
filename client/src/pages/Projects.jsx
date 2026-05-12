import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import AnimatedSection from "../components/AnimatedSection";

const API_URL = import.meta.env.VITE_API_URL || "";
const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads")) return `${API_URL}${path}`;
  return path;
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/projects").then(res => setProjects(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full" />
    </div>
  );

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <AnimatedSection variant="fadeUp" className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Projects</h2>
          <p className="text-gray-500 text-sm">Things I've built and worked on</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, idx) => (
            <AnimatedSection key={p.id} variant="scaleUp" delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group h-full bg-[#001428]/80 border border-cyan-500/15 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-colors duration-500"
              >
                {p.image && (
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={getImageUrl(p.image)}
                      alt={p.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001428] via-transparent to-transparent opacity-60"></div>
                    <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-500"></div>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">{p.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tech?.map((t, j) => (
                      <motion.span key={j} whileHover={{ scale: 1.1 }} className="bg-cyan-400/10 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/20 hover:bg-cyan-400/20 transition-colors">{t}</motion.span>
                    ))}
                  </div>
                  {p.skills && <p className="text-gray-500 text-xs mb-4"><strong className="text-gray-400">Skills:</strong> {p.skills}</p>}
                  {(p.githubUrl || p.liveUrl) && (
                    <div className="flex gap-3 pt-2 border-t border-cyan-500/10">
                      {p.githubUrl && (
                        <motion.a whileHover={{ x: 3 }} href={p.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-gray-400 text-sm hover:text-cyan-400 transition-colors">
                          <FaGithub /> Code
                        </motion.a>
                      )}
                      {p.liveUrl && (
                        <motion.a whileHover={{ x: 3 }} href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-gray-400 text-sm hover:text-cyan-400 transition-colors">
                          <FaExternalLinkAlt className="text-xs" /> Live Demo
                        </motion.a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
