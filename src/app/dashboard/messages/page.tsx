"use client";

import { useEffect, useState } from "react";
import type { Message } from "@/lib/types";

export default function UserMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: "", body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  async function load() {
    const res = await fetch("/api/messages");
    if (res.ok) setMessages((await res.json()).reverse());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (res.ok) {
      setForm({ subject: "", body: "" });
      setShowForm(false);
      setSuccess("Message sent successfully!");
      setTimeout(() => setSuccess(""), 4000);
      load();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-[#a3a3a3] text-sm mt-1">Send messages to Hasibuzzaman directly.</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)}
          className="px-5 py-2.5 bg-[#c0392b] hover:bg-[#e74c3c] text-white text-sm font-semibold rounded-lg transition-colors">
          {showForm ? "Cancel" : "+ New Message"}
        </button>
      </div>

      {success && (
        <div className="mb-5 p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg">{success}</div>
      )}

      {/* New message form */}
      {showForm && (
        <form onSubmit={send} className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 mb-6 space-y-4">
          <h2 className="text-white font-semibold">New Message</h2>
          <div>
            <label className="block text-[#a3a3a3] text-sm font-medium mb-1.5">Subject</label>
            <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="What is this about?"
              className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b] transition-colors" />
          </div>
          <div>
            <label className="block text-[#a3a3a3] text-sm font-medium mb-1.5">Message</label>
            <textarea required rows={5} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Write your message here…"
              className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b] transition-colors resize-none" />
          </div>
          <button type="submit" disabled={submitting}
            className="px-6 py-2.5 bg-[#c0392b] hover:bg-[#e74c3c] disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors">
            {submitting ? "Sending…" : "Send Message"}
          </button>
        </form>
      )}

      {/* Messages list */}
      <div className="space-y-3">
        {loading && <p className="text-[#6b6b6b] text-sm">Loading…</p>}
        {!loading && messages.length === 0 && (
          <div className="text-center py-16 text-[#6b6b6b]">
            <p className="text-4xl mb-3">💬</p>
            <p>You haven&apos;t sent any messages yet.</p>
            <button onClick={() => setShowForm(true)} className="mt-3 text-[#c0392b] hover:text-[#e74c3c] text-sm">Send your first message →</button>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <p className="text-white font-semibold">{msg.subject}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs px-2.5 py-1 rounded-full ${msg.status === "read" ? "bg-green-500/15 text-green-400" : "bg-[#252525] text-[#a3a3a3]"}`}>
                  {msg.status === "read" ? "Read" : "Sent"}
                </span>
                <span className="text-[#6b6b6b] text-xs">{new Date(msg.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="text-[#a3a3a3] text-sm leading-relaxed whitespace-pre-wrap">{msg.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
