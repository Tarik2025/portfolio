import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiCheck, FiX, FiUpload } from "react-icons/fi";

const TABS = ["Messages", "Projects", "Skills", "Education", "Internships", "Certifications", "Achievements", "Home"];

export default function AdminDashboard() {
  const [tab, setTab] = useState("Messages");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/admin"); return; }
    api.get("/api/auth/check").catch(() => { localStorage.removeItem("token"); navigate("/admin"); });
  }, []);

  useEffect(() => { fetchData(); }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    setShowForm(false);
    setEditItem(null);
    try {
      if (tab === "Messages") {
        const res = await api.get("/api/messages");
        setData(res.data.data);
      } else if (tab === "Certifications") {
        const res = await api.get("/api/certifications");
        setData(res.data.data.certifications);
      } else if (tab === "Achievements") {
        const res = await api.get("/api/certifications");
        setData(res.data.data.achievements);
      } else if (tab === "Home") {
        const res = await api.get("/api/home");
        setData(res.data.data ? [res.data.data] : []);
      } else {
        const res = await api.get(`/api/${tab.toLowerCase()}`);
        setData(res.data.data);
      }
    } catch { setData([]); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      if (tab === "Messages") await api.delete(`/api/messages/${id}`);
      else if (tab === "Achievements") await api.delete(`/api/certifications/achievements/${id}`);
      else await api.delete(`/api/${tab.toLowerCase()}/${id}`);
      showToast("Deleted");
      fetchData();
    } catch { showToast("Error deleting", "error"); }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/api/messages/${id}/read`);
      showToast("Marked as read");
      fetchData();
    } catch { showToast("Error", "error"); }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Delete ALL messages?")) return;
    try {
      await api.delete("/api/messages/all");
      showToast("All deleted");
      fetchData();
    } catch { showToast("Error", "error"); }
  };

  const handleSave = async (formData) => {
    try {
      if (tab === "Home") {
        await api.put("/api/home", formData);
      } else if (tab === "Achievements") {
        if (editItem) await api.put(`/api/certifications/achievements/${editItem.id}`, formData);
        else await api.post("/api/certifications/achievements", formData);
      } else {
        const endpoint = tab.toLowerCase();
        if (editItem) await api.put(`/api/${endpoint}/${editItem.id}`, formData);
        else await api.post(`/api/${endpoint}`, formData);
      }
      showToast(editItem ? "Updated" : "Created");
      fetchData();
    } catch { showToast("Error saving", "error"); }
  };

  const logout = () => { localStorage.removeItem("token"); navigate("/admin"); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">⚙️ Admin Dashboard</h2>
        <button onClick={logout} className="px-4 py-2 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-900/40 transition">
          <FiLogOut className="inline mr-1" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-[#0d1f3c]/50 p-2 rounded-xl border border-cyan-500/10">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tab === t ? "bg-cyan-500/15 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(0,230,255,0.3)]" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-4">
        {tab !== "Messages" && tab !== "Home" && (
          <button onClick={() => { setEditItem(null); setShowForm(true); }}
            className="px-4 py-2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/25 transition">
            <FiPlus className="inline mr-1" /> Add New
          </button>
        )}
        {tab === "Home" && data.length > 0 && !showForm && (
          <button onClick={() => { setEditItem(data[0]); setShowForm(true); }}
            className="px-4 py-2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/25 transition">
            <FiEdit2 className="inline mr-1" /> Edit Home Content
          </button>
        )}
        {tab === "Messages" && data.length > 0 && (
          <button onClick={handleDeleteAll}
            className="px-4 py-2 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-900/40 transition">
            <FiTrash2 className="inline mr-1" /> Delete All
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && <DynamicForm tab={tab} item={editItem} onSave={handleSave} onCancel={() => setShowForm(false)} />}

      {/* Data list */}
      {loading ? <p className="text-gray-500 text-center py-8">Loading...</p> : (
        <div className="space-y-3">
          {data.length === 0 && <p className="text-gray-600 text-center py-12">No items yet.</p>}
          {data.map(item => (
            <div key={item.id} className="bg-[#0d1f3c]/60 border border-cyan-500/10 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 hover:border-cyan-500/25 transition-colors">
              <div className="flex-1 min-w-0">
                <ItemPreview tab={tab} item={item} />
              </div>
              <div className="flex gap-2">
                {tab === "Messages" && !item.isRead && (
                  <button onClick={() => handleMarkRead(item.id)} className="p-2 bg-green-900/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-900/40 transition" title="Mark Read"><FiCheck /></button>
                )}
                {tab !== "Messages" && (
                  <button onClick={() => { setEditItem(item); setShowForm(true); }} className="p-2 bg-blue-900/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-900/40 transition" title="Edit"><FiEdit2 /></button>
                )}
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-900/40 transition" title="Delete"><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 px-5 py-3 rounded-xl font-medium shadow-lg z-50 animate-slide-up ${toast.type === "success" ? "bg-green-900/90 text-green-300 border border-green-500" : "bg-red-900/90 text-red-300 border border-red-500"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function ItemPreview({ tab, item }) {
  switch (tab) {
    case "Messages":
      return (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-400">{item.name}</span>
            {!item.isRead && <span className="bg-cyan-400 text-[#001428] text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>}
            <span className="text-gray-600 text-xs">{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
          <span className="text-gray-500 text-xs">{item.email}</span>
          <p className="text-gray-400 text-sm mt-1 truncate">{item.message}</p>
        </div>
      );
    case "Projects": return <div><span className="text-white font-medium">{item.title}</span><p className="text-gray-500 text-xs truncate mt-0.5">{item.description}</p></div>;
    case "Skills": return <div><span className="text-white font-medium">{item.category}</span><span className="text-gray-600 text-xs ml-2">({item.items?.length} items)</span></div>;
    case "Education": return <div><span className="text-white font-medium">{item.school}</span><span className="text-gray-500 text-xs ml-2">{item.period}</span></div>;
    case "Internships": return <div><span className="text-white font-medium">{item.company}</span><span className="text-gray-500 text-xs ml-2">- {item.role} ({item.period})</span></div>;
    case "Certifications": return <div><span className="text-white font-medium">{item.title}</span><p className="text-gray-500 text-xs mt-0.5">{item.issuer}</p></div>;
    case "Achievements": return <p className="text-gray-300 text-sm">{item.text}</p>;
    case "Home": return <div><span className="text-white font-medium">{item.greeting}</span><p className="text-gray-500 text-xs truncate mt-0.5">{item.typingText}</p></div>;
    default: return null;
  }
}

function FileUpload({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/api/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      onChange(res.data.url);
    } catch {
      alert("Upload failed");
    }
    setUploading(false);
  };

  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">{label}</label>
      <div className="flex gap-2 items-center">
        <input type="text" value={value || ""} onChange={e => onChange(e.target.value)}
          className="flex-1 bg-white/5 border border-cyan-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
          placeholder="URL or upload file" />
        <label className={`px-3 py-2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 rounded-lg text-sm cursor-pointer hover:bg-cyan-500/25 transition ${uploading ? "opacity-50" : ""}`}>
          <FiUpload className="inline" />
          <input type="file" className="hidden" accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml,application/pdf" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
      {value && value.startsWith("/") && (
        value.endsWith(".pdf")
          ? <a href={value} target="_blank" rel="noreferrer" className="mt-2 inline-block text-cyan-400 text-xs underline">📄 View PDF</a>
          : <img src={value} alt="" className="mt-2 w-16 h-16 object-cover rounded-lg border border-cyan-500/20" />
      )}
    </div>
  );
}

function DynamicForm({ tab, item, onSave, onCancel }) {
  const [form, setForm] = useState(item || {});

  useEffect(() => { setForm(item || {}); }, [item]);

  const handleSubmit = (e) => { e.preventDefault(); onSave(form); };
  const set = (key, val) => setForm({ ...form, [key]: val });
  const setArray = (key, val) => set(key, val.split(",").map(s => s.trim()).filter(Boolean));

  const inputClass = "w-full bg-white/5 border border-cyan-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition";
  const labelClass = "text-xs text-gray-400 mb-1 block";

  const renderFields = () => {
    switch (tab) {
      case "Projects": return (<>
        <div><label className={labelClass}>Title *</label><input className={inputClass} value={form.title || ""} onChange={e => set("title", e.target.value)} required /></div>
        <div><label className={labelClass}>Description *</label><textarea className={inputClass} rows="3" value={form.description || ""} onChange={e => set("description", e.target.value)} required /></div>
        <FileUpload label="Project Image" value={form.image} onChange={v => set("image", v)} />
        <div><label className={labelClass}>Tech (comma separated)</label><input className={inputClass} value={form.tech?.join(", ") || ""} onChange={e => setArray("tech", e.target.value)} /></div>
        <div><label className={labelClass}>Skills</label><input className={inputClass} value={form.skills || ""} onChange={e => set("skills", e.target.value)} /></div>
        <div><label className={labelClass}>GitHub URL</label><input className={inputClass} value={form.githubUrl || ""} onChange={e => set("githubUrl", e.target.value)} /></div>
        <div><label className={labelClass}>Live URL</label><input className={inputClass} value={form.liveUrl || ""} onChange={e => set("liveUrl", e.target.value)} /></div>
        <div><label className={labelClass}>Order</label><input type="number" className={inputClass} value={form.order || 0} onChange={e => set("order", parseInt(e.target.value))} /></div>
      </>);
      case "Skills": return (<>
        <div><label className={labelClass}>Category *</label><input className={inputClass} value={form.category || ""} onChange={e => set("category", e.target.value)} required /></div>
        <FileUpload label="Icon" value={form.icon} onChange={v => set("icon", v)} />
        <div><label className={labelClass}>Items (comma separated)</label><input className={inputClass} value={form.items?.join(", ") || ""} onChange={e => setArray("items", e.target.value)} /></div>
        <div><label className={labelClass}>Order</label><input type="number" className={inputClass} value={form.order || 0} onChange={e => set("order", parseInt(e.target.value))} /></div>
      </>);
      case "Education": return (<>
        <div><label className={labelClass}>School *</label><input className={inputClass} value={form.school || ""} onChange={e => set("school", e.target.value)} required /></div>
        <div><label className={labelClass}>Degree *</label><input className={inputClass} value={form.degree || ""} onChange={e => set("degree", e.target.value)} required /></div>
        <div><label className={labelClass}>Period *</label><input className={inputClass} value={form.period || ""} onChange={e => set("period", e.target.value)} required /></div>
        <div><label className={labelClass}>CGPA *</label><input className={inputClass} value={form.cgpa || ""} onChange={e => set("cgpa", e.target.value)} required /></div>
        <FileUpload label="Logo" value={form.logo} onChange={v => set("logo", v)} />
        <FileUpload label="Campus Image" value={form.image} onChange={v => set("image", v)} />
        <div><label className={labelClass}>Highlights (comma separated)</label><textarea className={inputClass} rows="3" value={form.highlights?.join(", ") || ""} onChange={e => setArray("highlights", e.target.value)} /></div>
        <div><label className={labelClass}>Coursework (comma separated)</label><input className={inputClass} value={form.coursework?.join(", ") || ""} onChange={e => setArray("coursework", e.target.value)} /></div>
        <div><label className={labelClass}>Order</label><input type="number" className={inputClass} value={form.order || 0} onChange={e => set("order", parseInt(e.target.value))} /></div>
      </>);
      case "Internships": return (<>
        <div><label className={labelClass}>Company *</label><input className={inputClass} value={form.company || ""} onChange={e => set("company", e.target.value)} required /></div>
        <div><label className={labelClass}>Role *</label><input className={inputClass} value={form.role || ""} onChange={e => set("role", e.target.value)} required /></div>
        <div><label className={labelClass}>Period *</label><input className={inputClass} value={form.period || ""} onChange={e => set("period", e.target.value)} required /></div>
        <div><label className={labelClass}>Description *</label><textarea className={inputClass} rows="3" value={form.description || ""} onChange={e => set("description", e.target.value)} required /></div>
        <FileUpload label="Company Logo" value={form.logo} onChange={v => set("logo", v)} />
        <div><label className={labelClass}>Key Points (comma separated)</label><textarea className={inputClass} rows="3" value={form.points?.join(", ") || ""} onChange={e => setArray("points", e.target.value)} /></div>
        <div><label className={labelClass}>Skills (comma separated)</label><input className={inputClass} value={form.skills?.join(", ") || ""} onChange={e => setArray("skills", e.target.value)} /></div>
        <FileUpload label="Certificate" value={form.certificate} onChange={v => set("certificate", v)} />
        <div><label className={labelClass}>Order</label><input type="number" className={inputClass} value={form.order || 0} onChange={e => set("order", parseInt(e.target.value))} /></div>
      </>);
      case "Certifications": return (<>
        <div><label className={labelClass}>Title *</label><input className={inputClass} value={form.title || ""} onChange={e => set("title", e.target.value)} required /></div>
        <div><label className={labelClass}>Issuer *</label><input className={inputClass} value={form.issuer || ""} onChange={e => set("issuer", e.target.value)} required /></div>
        <FileUpload label="Certificate Image" value={form.image} onChange={v => set("image", v)} />
        <div><label className={labelClass}>Points (comma separated)</label><textarea className={inputClass} rows="3" value={form.points?.join(", ") || ""} onChange={e => setArray("points", e.target.value)} /></div>
        <div><label className={labelClass}>Tools</label><input className={inputClass} value={form.tools || ""} onChange={e => set("tools", e.target.value)} /></div>
        <div><label className={labelClass}>Order</label><input type="number" className={inputClass} value={form.order || 0} onChange={e => set("order", parseInt(e.target.value))} /></div>
      </>);
      case "Achievements": return (<>
        <div><label className={labelClass}>Text *</label><textarea className={inputClass} rows="2" value={form.text || ""} onChange={e => set("text", e.target.value)} required /></div>
        <div><label className={labelClass}>Order</label><input type="number" className={inputClass} value={form.order || 0} onChange={e => set("order", parseInt(e.target.value))} /></div>
      </>);
      case "Home": return (<>
        <div><label className={labelClass}>Greeting</label><input className={inputClass} value={form.greeting || ""} onChange={e => set("greeting", e.target.value)} /></div>
        <div><label className={labelClass}>Typing Text</label><textarea className={inputClass} rows="3" value={form.typingText || ""} onChange={e => set("typingText", e.target.value)} /></div>
        <div><label className={labelClass}>Subtitle</label><input className={inputClass} value={form.subtitle || ""} onChange={e => set("subtitle", e.target.value)} /></div>
        <div><label className={labelClass}>Description</label><input className={inputClass} value={form.description || ""} onChange={e => set("description", e.target.value)} /></div>
        <FileUpload label="Profile Image" value={form.profileImage} onChange={v => set("profileImage", v)} />
      </>);
      default: return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d1f3c]/80 border border-cyan-500/15 rounded-xl p-6 mb-6 space-y-4 shadow-xl">
      <h3 className="text-lg font-semibold text-cyan-400">{item ? "Edit" : "Add New"} {tab === "Achievements" ? "Achievement" : tab.slice(0, -1)}</h3>
      {renderFields()}
      <div className="flex gap-3 pt-3 border-t border-cyan-500/10">
        <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20">
          <FiCheck className="inline mr-1" /> Save
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 bg-white/5 border border-gray-600 text-gray-400 text-sm rounded-lg hover:bg-white/10 transition">
          <FiX className="inline mr-1" /> Cancel
        </button>
      </div>
    </form>
  );
}
