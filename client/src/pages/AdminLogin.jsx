import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", form);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md bg-[#001428]/90 border border-cyan-500/20 rounded-2xl p-8 shadow-xl shadow-cyan-500/10">
        <h2 className="text-2xl font-bold text-cyan-400 text-center mb-6">🔐 Admin Login</h2>
        {error && (
          <div className={`px-4 py-2 rounded-lg text-sm text-center mb-4 border ${
            error.includes("locked") || error.includes("Too many")
              ? "bg-orange-900/30 border-orange-500/50 text-orange-400"
              : "bg-red-900/30 border-red-500/50 text-red-400"
          }`}>{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Email</label>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              placeholder="Admin Email" autoComplete="email" />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white/5 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              placeholder="Password" autoComplete="current-password" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:hover:scale-100">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
