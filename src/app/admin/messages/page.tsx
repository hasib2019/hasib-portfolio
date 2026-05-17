"use client";

import { useEffect, useState } from "react";
import type { Message } from "@/lib/types";

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  async function load() {
    const res = await fetch("/api/messages");
    if (res.ok) setMessages((await res.json()).reverse());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function markRead(id: string) {
    await fetch("/api/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "read" } : m)));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status: "read" } : s);
  }

  async function del(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/messages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  async function openMessage(msg: Message) {
    setSelected(msg);
    if (msg.status === "unread") markRead(msg.id);
  }

  const filtered = messages.filter((m) => filter === "all" || m.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-[#a3a3a3] text-sm mt-1">Messages sent by users from their dashboard.</p>
      </div>

      <div className="flex gap-2 mb-5">
        {(["all", "unread", "read"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${filter === f ? "bg-[#c0392b] text-white" : "bg-[#1e1e1e] text-[#a3a3a3] border border-[#2a2a2a] hover:text-white"}`}>
            {f}
          </button>
        ))}
        <span className="ml-auto text-[#6b6b6b] text-sm self-center">{messages.filter((m) => m.status === "unread").length} unread</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-2">
          {loading && <p className="text-[#6b6b6b] text-sm">Loading…</p>}
          {!loading && filtered.length === 0 && <p className="text-[#6b6b6b] text-sm">No messages found.</p>}
          {filtered.map((msg) => (
            <div
              key={msg.id}
              onClick={() => openMessage(msg)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selected?.id === msg.id ? "border-[#c0392b] bg-[#1e1e1e]" : "border-[#2a2a2a] bg-[#1e1e1e] hover:border-[#333]"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {msg.status === "unread" && <span className="w-2 h-2 rounded-full bg-[#c0392b] flex-shrink-0" />}
                    <p className={`text-sm truncate font-medium ${msg.status === "unread" ? "text-white" : "text-[#a3a3a3]"}`}>{msg.subject}</p>
                  </div>
                  <p className="text-[#6b6b6b] text-xs mt-0.5">{msg.userName} · {msg.userEmail}</p>
                </div>
                <p className="text-[#6b6b6b] text-xs flex-shrink-0">{new Date(msg.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-white font-semibold text-lg">{selected.subject}</h2>
                <p className="text-[#a3a3a3] text-sm mt-1">{selected.userName} · <a href={`mailto:${selected.userEmail}`} className="text-[#c0392b] hover:underline">{selected.userEmail}</a></p>
                <p className="text-[#6b6b6b] text-xs mt-1">{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => del(selected.id)} className="flex-shrink-0 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg hover:bg-red-500/20">
                Delete
              </button>
            </div>
            <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4">
              <p className="text-[#a3a3a3] text-sm leading-relaxed whitespace-pre-wrap">{selected.body}</p>
            </div>
            <a href={`mailto:${selected.userEmail}?subject=Re: ${selected.subject}`} className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#c0392b] hover:bg-[#e74c3c] text-white text-sm font-medium rounded-lg transition-colors">
              Reply by Email
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl items-center justify-center text-[#6b6b6b] text-sm">
            Select a message to read
          </div>
        )}
      </div>
    </div>
  );
}
