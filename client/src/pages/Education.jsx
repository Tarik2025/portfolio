import { useEffect, useState } from "react";
import api from "../api";
import { FaGraduationCap } from "react-icons/fa";

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/education").then(res => setEducation(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 animate-slide-up">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Education</h2>
        <p className="text-gray-500 text-sm">My academic journey and achievements</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent hidden md:block"></div>

        <div className="space-y-8">
          {education.map((edu, idx) => (
            <div key={edu.id} className={`animate-slide-up stagger-${idx + 1}`}>
              <div className="group relative md:pl-16 bg-[#001428]/80 border border-cyan-500/15 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500">
                {/* Timeline dot */}
                <div className="absolute left-4 top-8 w-5 h-5 bg-[#0a1628] border-2 border-cyan-400 rounded-full hidden md:flex items-center justify-center group-hover:scale-125 group-hover:border-cyan-300 transition-all duration-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {edu.logo ? (
                        <img src={edu.logo} alt="" className="w-12 h-12 object-contain rounded-lg bg-white/5 p-1 group-hover:scale-110 transition-transform duration-300" />
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
                            <span key={j} className="bg-cyan-400/10 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/20 hover:bg-cyan-400/20 hover:scale-105 transition-all duration-200">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {edu.image && (
                    <div className="self-center">
                      <img src={edu.image} alt={edu.school} className="w-44 h-44 rounded-2xl object-cover border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(0,230,255,0.15)] group-hover:scale-105 group-hover:border-cyan-400/60 transition-all duration-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
