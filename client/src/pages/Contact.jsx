import { useState } from "react";
import api from "../api";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import { FiSend, FiCheck } from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!emailRegex.test(form.email.trim())) errs.email = "Please enter a valid email";
    if (!form.message.trim() || form.message.trim().length < 5) errs.message = "Message must be at least 5 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await api.post("/api/messages", {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim()
      });
      setStatus({ type: "success", msg: res.data.msg });
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      setStatus({ type: "error", msg: err.response?.data?.msg || "Something went wrong! Please try again." });
    }
    setLoading(false);
    setTimeout(() => setStatus(null), 5000);
  };

  const inputClass = (field) => `w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all duration-200 ${
    errors[field] ? "border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/30" : "border-cyan-500/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
  }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Get In Touch</h2>
        <p className="text-gray-400 max-w-lg mx-auto">I'd love to hear from you! Whether it's a project, a job opportunity, or just to say hello — feel free to reach out.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {/* Form - takes 3 cols */}
        <div className="lg:col-span-3 bg-[#0d1f3c]/60 border border-cyan-500/10 rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-white mb-5">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
              <input type="text" value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: "" }); }}
                className={inputClass("name")} placeholder="John Doe" />
              {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Email Address</label>
              <input type="email" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: "" }); }}
                className={inputClass("email")} placeholder="john@example.com" />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Message</label>
              <textarea rows="5" value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: "" }); }}
                className={`${inputClass("message")} resize-none`} placeholder="Write your message here..." />
              {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
              <p className="text-gray-600 text-xs mt-1 text-right">{form.message.length}/500</p>
            </div>
            <button type="submit" disabled={loading}
              className={`w-full py-3.5 font-semibold rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
                status?.type === "success" 
                  ? "bg-green-600 text-white shadow-green-500/20" 
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-[1.02] shadow-cyan-500/25 disabled:opacity-50 disabled:hover:scale-100"
              }`}>
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Sending...</>
              ) : status?.type === "success" ? (
                <><FiCheck className="text-lg" /> Sent!</>
              ) : (
                <><FiSend /> Send Message</>
              )}
            </button>
          </form>
        </div>

        {/* Info - takes 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0d1f3c]/60 border border-cyan-500/10 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white mb-5">Contact Info</h3>
            <div className="space-y-5">
              <a href="mailto:smdtarik1244@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition"><FaEnvelope className="text-cyan-400" /></div>
                <div><p className="text-xs text-gray-500">Email</p><p className="text-sm">smdtarik1244@gmail.com</p></div>
              </a>
              <a href="tel:+919492610054" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition"><FaPhone className="text-cyan-400" /></div>
                <div><p className="text-xs text-gray-500">Phone</p><p className="text-sm">+91 94926 10054</p></div>
              </a>
              <a href="tel:+919392426719" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition"><FaPhone className="text-cyan-400" /></div>
                <div><p className="text-xs text-gray-500">Phone (Alt)</p><p className="text-sm">+91 93924 26719</p></div>
              </a>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center"><FaMapMarkerAlt className="text-cyan-400" /></div>
                <div><p className="text-xs text-gray-500">Location</p><p className="text-sm">Proddatur, India</p></div>
              </div>
            </div>
          </div>

          <div className="bg-[#0d1f3c]/60 border border-cyan-500/10 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/shaik-tarik-3a0504237/" target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0077b5]/10 border border-[#0077b5]/30 text-[#0077b5] rounded-xl hover:bg-[#0077b5]/20 transition text-sm font-medium">
                <FaLinkedin /> LinkedIn
              </a>
              <a href="https://github.com/Tarik2025" target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-gray-600/30 text-gray-300 rounded-xl hover:bg-white/10 transition text-sm font-medium">
                <FaGithub /> GitHub
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">Let's connect and create something amazing together!</p>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {status && (
        <div className={`fixed top-6 right-6 max-w-sm px-5 py-3 rounded-xl font-medium shadow-2xl z-50 animate-slide-up ${
          status.type === "success" ? "bg-green-900/95 text-green-300 border border-green-500/50" : "bg-red-900/95 text-red-300 border border-red-500/50"
        }`}>
          {status.msg}
        </div>
      )}
    </div>
  );
}
