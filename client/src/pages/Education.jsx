import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import { FaGraduationCap } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import AnimatedSection from "../components/AnimatedSection";

const API_URL = import.meta.env.VITE_API_URL || "";
const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads")) return `${API_URL}${path}`;
  return path;
};

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/education").then(res => setEducation(res.data.data)).catch(() => {}).finally(() => setLoading(false));
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
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Education</h2>
          <p className="text-gray-500 text-sm">My academic journey and achievements</p>
        </AnimatedSection>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-8">
            {education.map((edu, idx) => (
              <AnimatedSection key={edu.id} variant="fadeUp" delay={idx * 0.15}>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative md:pl-16 bg-[#001428]/80 border border-cyan-500/15 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-colors duration-500"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-4 top-8 w-5 h-5 bg-[#0a1628] border-2 border-cyan-400 rounded-full hidden md:flex items-center justify-center"
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  </motion.div>

                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {edu.logo ? (
                          <motion.img whileHover={{ scale: 1.15, rotate: 5 }} src={getImageUrl(edu.logo)} alt="" className="w-12 h-12 object-contain rounded-lg bg-white/5 p-1" />
                        ) : (
                          <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center"><FaGraduationCap className="text-cyan-400 text-xl" /></div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">{edu.school}</h3>
                          <span className="text-cyan-400 text-sm font-medium">{edu.period}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 font-medium">{edu.degree}</p>
                      <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        <span className="text-cyan-400 font-bold text-sm">CGPA: {edu.cgpa}</span>
                      </div>
                      <ul className="mt-4 space-y-2 text-gray-400 text-sm">
                        {edu.highlights?.map((h, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">▹</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                      {edu.coursework?.length > 0 && (
                        <div className="mt-5">
                          <h6 className="text-cyan-400 text-sm font-semibold mb-2">Relevant Coursework:</h6>
                          <div className="flex flex-wrap gap-2">
                            {edu.coursework.map((c, j) => (
                              <motion.span key={j} whileHover={{ scale: 1.1 }} className="bg-cyan-400/10 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/20 hover:bg-cyan-400/20 transition-colors duration-200">{c}</motion.span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {edu.image && (
                      <motion.div className="self-center" whileHover={{ scale: 1.05, rotate: 1 }}>
                        <img src={getImageUrl(edu.image)} alt={edu.school} className="w-44 h-44 rounded-2xl object-cover border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(0,230,255,0.15)]" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
