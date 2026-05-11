import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiTrash2, FiCheck, FiLogOut, FiInbox } from "react-icons/fi";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/api/admin/messages", { withCredentials: true });
      setMessages(res.data.data);
    } catch {
      navigate("/admin");
    }
    setLoading(false);
  };

  const markRead = async (id) => {
    try {
      await axios.put(`/api/admin/messages/${id}/read`, {}, { withCredentials: true });
      setMessages(msgs => msgs.map(m => m._id === id ? { ...m, isRead: true } : m));
      showToast("Marked as read");
    } catch {
      showToast("Error", "error");
    }
  };

  const deleteMsg = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await axios.delete(`/api/admin/messages/${id}`, { withCredentials: true });
      setMessages(msgs => msgs.filter(m => m._id !== id));
      showToast("Deleted");
    } catch {
      showToast("Error", "error");
    }
  };

  const deleteAll = async () => {
    if (!confirm("Delete ALL messages? This cannot be undone.")) return;
    try {
      await axios.delete("/api/admin/messages", { withCredentials: true });
      setMessages([]);
      showToast("All messages deleted");
    } catch {
      showToast("Error", "error");
    }
  };

  const logout = async () => {
    await axios.post("/api/admin/logout", {}, { withCredentials: true });
    navigate("/admin");
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  const unread = messages.filter(m => !m.isRead).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-cyan-400">📩 Messages Dashboard</h2>
        <div className="flex gap-3">
          <button onClick={deleteAll} className="px-4 py-2 bg-red-900/30 border border-red-500/40 text-red-400 rounded-lg text-sm font-medium hover:bg-red-900/50 transition">
            <FiTrash2 className="inline mr-1" /> Delete All
          </button>
          <button onClick={logout} className="px-4 py-2 bg-yellow-900/30 border border-yellow-500/40 text-yellow-400 rounded-lg text-sm font-medium hover:bg-yellow-900/50 transition">
            <FiLogOut className="inline mr-1" /> Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <div className="bg-[#001428]/80 border border-cyan-500/20 rounded-xl px-6 py-4 text-center min-w-[100px]">
          <div className="text-2xl font-bold text-cyan-400">{messages.length}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="bg-[#001428]/80 border border-cyan-500/20 rounded-xl px-6 py-4 text-center min-w-[100px]">
          <div className="text-2xl font-bold text-cyan-400">{unread}</div>
          <div className="text-xs text-gray-500">Unread</div>
        </div>
        <div className="bg-[#001428]/80 border border-cyan-500/20 rounded-xl px-6 py-4 text-center min-w-[100px]">
          <div className="text-2xl font-bold text-cyan-400">{messages.length - unread}</div>
          <div className="text-xs text-gray-500">Read</div>
        </div>
      </div>

      {/* Messages */}
      {messages.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <FiInbox className="text-4xl mx-auto mb-3 text-gray-600" />
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg._id}
              className={`bg-[#001428]/70 border rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/10 ${msg.isRead ? "border-gray-700/50 opacity-75" : "border-cyan-500/30 border-l-4 border-l-cyan-400"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="font-semibold text-cyan-400">{msg.name}</span>
                  {!msg.isRead && <span className="ml-2 bg-cyan-400 text-[#001428] text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>}
                  <div className="text-gray-500 text-sm">📧 {msg.email}</div>
                </div>
                <div className="flex gap-2">
                  {!msg.isRead && (
                    <button onClick={() => markRead(msg._id)}
                      className="px-3 py-1.5 bg-green-900/20 border border-green-500/30 text-green-400 rounded-lg text-xs font-medium hover:bg-green-900/40 transition">
                      <FiCheck className="inline mr-1" /> Read
                    </button>
                  )}
                  <button onClick={() => deleteMsg(msg._id)}
                    className="px-3 py-1.5 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium hover:bg-red-900/40 transition">
                    <FiTrash2 className="inline mr-1" /> Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-300 mt-3 leading-relaxed">{msg.message}</p>
              <div className="text-gray-600 text-xs mt-3">🕒 {new Date(msg.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 px-5 py-3 rounded-xl font-medium shadow-lg z-50 ${toast.type === "success" ? "bg-green-900/90 text-green-300 border border-green-500" : "bg-red-900/90 text-red-300 border border-red-500"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
