"use client";

import { useEffect, useState } from "react";
import type { Quotation, QuotationStatus } from "@/lib/types";

const statusColors: Record<QuotationStatus, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  reviewed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  accepted: "bg-green-500/15 text-green-400 border-green-500/30",
  rejected: "bg-red-500/15 text-red-400 border-red-500/30",
};

export default function AdminQuotations() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [selected, setSelected] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | QuotationStatus>("all");
  const [note, setNote] = useState("");
  const [newStatus, setNewStatus] = useState<QuotationStatus>("reviewed");

  useEffect(() => {
    fetch("/api/quotations").then((r) => r.json()).then((d) => { setQuotations(d.reverse()); setLoading(false); });
  }, []);

  async function updateStatus() {
    if (!selected) return;
    await fetch("/api/quotations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selected.id, status: newStatus, adminNote: note }),
    });
    setQuotations((prev) => prev.map((q) => q.id === selected.id ? { ...q, status: newStatus, adminNote: note } : q));
    setSelected((s) => s ? { ...s, status: newStatus, adminNote: note } : s);
  }

  async function del(id: string) {
    if (!confirm("Delete this quotation?")) return;
    await fetch("/api/quotations", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setQuotations((prev) => prev.filter((q) => q.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  function open(q: Quotation) {
    setSelected(q);
    setNote(q.adminNote ?? "");
    setNewStatus(q.status);
  }

  const filtered = quotations.filter((q) => filter === "all" || q.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Quotations</h1>
        <p className="text-[#a3a3a3] text-sm mt-1">Project quotation requests from users.</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {(["all", "pending", "reviewed", "accepted", "rejected"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${filter === f ? "bg-[#c0392b] text-white" : "bg-[#1e1e1e] text-[#a3a3a3] border border-[#2a2a2a] hover:text-white"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-2">
          {loading && <p className="text-[#6b6b6b] text-sm">Loading…</p>}
          {!loading && filtered.length === 0 && <p className="text-[#6b6b6b] text-sm">No quotations found.</p>}
          {filtered.map((q) => (
            <div key={q.id} onClick={() => open(q)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selected?.id === q.id ? "border-[#c0392b] bg-[#1e1e1e]" : "border-[#2a2a2a] bg-[#1e1e1e] hover:border-[#333]"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-white text-sm font-medium truncate">{q.projectName}</p>
                  <p className="text-[#6b6b6b] text-xs mt-0.5">{q.userName} · {q.budget}</p>
                </div>
                <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border ${statusColors[q.status]}`}>{q.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="text-white font-semibold text-lg">{selected.projectName}</h2>
              <button onClick={() => del(selected.id)} className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg hover:bg-red-500/20">Delete</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: "From", value: selected.userName },
                { label: "Email", value: selected.userEmail },
                { label: "Budget", value: selected.budget || "Not specified" },
                { label: "Deadline", value: selected.deadline || "Not specified" },
                { label: "Date", value: new Date(selected.createdAt).toLocaleDateString() },
                { label: "Tech Stack", value: selected.techStack || "Not specified" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[#6b6b6b] text-xs">{item.label}</p>
                  <p className="text-[#a3a3a3]">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[#6b6b6b] text-xs mb-1">Project Description</p>
              <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3">
                <p className="text-[#a3a3a3] text-sm leading-relaxed whitespace-pre-wrap">{selected.description}</p>
              </div>
            </div>

            <div className="border-t border-[#2a2a2a] pt-4 space-y-3">
              <p className="text-white text-sm font-medium">Update Status</p>
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value as QuotationStatus)}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b]">
                {(["pending", "reviewed", "accepted", "rejected"] as const).map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Admin note to user (optional)…"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b] resize-none placeholder-[#6b6b6b]" />
              <button onClick={updateStatus} className="px-5 py-2 bg-[#c0392b] hover:bg-[#e74c3c] text-white text-sm font-medium rounded-lg transition-colors">
                Update Status
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl items-center justify-center text-[#6b6b6b] text-sm">
            Select a quotation to review
          </div>
        )}
      </div>
    </div>
  );
}
