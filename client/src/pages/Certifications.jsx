import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import { FaTrophy, FaCertificate } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import AnimatedSection from "../components/AnimatedSection";

const API_URL = import.meta.env.VITE_API_URL || "";
const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads")) return `${API_URL}${path}`;
  return path;
};

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

  if (loading) return (
    <div className="flex justify-center py-20">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full" />
    </div>
  );

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <AnimatedSection variant="fadeUp" className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Certifications</h2>
          <p className="text-gray-500 text-sm">Courses and certifications I've completed</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {certs.map((cert, idx) => (
            <AnimatedSection key={cert.id} variant="scaleUp" delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group h-full bg-[#001428]/80 border border-cyan-500/15 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-colors duration-500"
              >
                {cert.image && (
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={getImageUrl(cert.image)}
                      alt={cert.title}
                      className="w-full h-52 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001428] via-transparent to-transparent opacity-50"></div>
                    <motion.div
                      className="absolute top-3 right-3 w-10 h-10 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                      <FaCertificate className="text-cyan-400" />
                    </motion.div>
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
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Achievements */}
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Achievements</h2>
            <p className="text-gray-500 text-sm">Milestones and recognitions</p>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-3">
          {achievements.map((a, idx) => (
            <AnimatedSection key={a.id} variant="fadeRight" delay={idx * 0.08}>
              <motion.div
                whileHover={{ x: -5, boxShadow: "0 10px 30px rgba(0,200,255,0.08)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group flex items-start gap-4 bg-[#001428]/60 border border-cyan-500/10 rounded-xl p-4 hover:bg-[#001428]/90 hover:border-cyan-500/25 transition-colors duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <FaTrophy className="text-cyan-400 text-sm" />
                </motion.div>
                <p className="text-gray-300 text-sm leading-relaxed">{a.text}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
