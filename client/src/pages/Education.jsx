import { useEffect, useState } from "react";
import api from "../api";

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/education").then(res => setEducation(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-10">Education</h2>
      <div className="space-y-8">
        {education.map((edu) => (
          <div key={edu.id} className="bg-[#001428]/80 border border-cyan-500/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {edu.logo && <img src={edu.logo} alt="" className="w-10 h-10 object-contain" />}
                  <div>
                    <h3 className="text-lg font-semibold text-white">{edu.school}</h3>
                    <span className="text-cyan-400 text-sm">{edu.period}</span>
                  </div>
                </div>
                <p className="text-gray-300"><strong>{edu.degree}</strong></p>
                <p className="text-cyan-400 font-semibold">CGPA: {edu.cgpa}</p>
                <ul className="mt-3 space-y-1 text-gray-400 text-sm list-disc list-inside">
                  {edu.highlights?.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
                {edu.coursework?.length > 0 && (
                  <div className="mt-4">
                    <h6 className="text-cyan-400 text-sm font-semibold mb-2">Relevant Coursework:</h6>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((c, j) => (
                        <span key={j} className="bg-cyan-400/10 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/30">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {edu.image && <img src={edu.image} alt={edu.school} className="w-48 h-48 rounded-full object-cover border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(0,230,255,0.3)] self-center" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
