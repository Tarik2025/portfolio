import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import { FaBriefcase } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import AnimatedSection from "../components/AnimatedSection";

const API_URL = import.meta.env.VITE_API_URL || "";
const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads")) return `${API_URL}${path}`;
  return path;
};

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/internships").then(res => setInternships(res.data.data)).catch(() => {}).finally(() => setLoading(false));
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
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Internships</h2>
          <p className="text-gray-500 text-sm">Professional experience and industry exposure</p>
        </AnimatedSection>

        <div className="space-y-6">
          {internships.map((intern, idx) => (
            <AnimatedSection key={intern.id} variant="fadeUp" delay={idx * 0.12}>
              <motion.div
                whileHover={{ x: 6, boxShadow: "0 20px 40px rgba(0,200,255,0.08)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-[#001428]/80 border border-cyan-500/15 rounded-2xl p-6 shadow-lg hover:border-cyan-500/30 transition-colors duration-500"
              >
                <div className="flex items-start gap-4">
                  {intern.logo ? (
                    <motion.img
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      src={getImageUrl(intern.logo)}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover border border-cyan-500/20 bg-white/5 p-1"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0"><FaBriefcase className="text-cyan-400 text-xl" /></div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">{intern.company}</h3>
                      <span className="text-gray-500">•</span>
                      <span className="text-cyan-400 font-medium text-sm">{intern.role}</span>
                    </div>
                    <span className="inline-block px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs rounded-md font-medium">{intern.period}</span>
                    <p className="text-gray-300 mt-3 text-sm leading-relaxed">{intern.description}</p>

                    <ul className="mt-4 space-y-2 text-gray-400 text-sm">
                      {intern.points?.map((p, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.05 }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-cyan-400 mt-0.5">▹</span>
                          <span>{p}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {intern.skills?.map((s, j) => (
                        <motion.span key={j} whileHover={{ scale: 1.1 }} className="bg-cyan-400/10 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/20 hover:bg-cyan-400/20 transition-colors duration-200">{s}</motion.span>
                      ))}
                    </div>

                    {intern.certificate && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={intern.certificate}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-cyan-500/25 transition-shadow hover:shadow-xl hover:shadow-cyan-500/40"
                      >
                        📄 View Certificate
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
