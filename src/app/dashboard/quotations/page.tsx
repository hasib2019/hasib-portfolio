"use client";

import { useEffect, useState } from "react";
import type { Quotation } from "@/lib/types";

export default function UserQuotations() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ projectName: "", description: "", budget: "", deadline: "", techStack: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  async function load() {
    const res = await fetch("/api/quotations");
    if (res.ok) setQuotations((await res.json()).reverse());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/quotations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (res.ok) {
      setForm({ projectName: "", description: "", budget: "", deadline: "", techStack: "" });
      setShowForm(false);
      setSuccess("Quotation request submitted! You will be notified once reviewed.");
      setTimeout(() => setSuccess(""), 5000);
      load();
    }
  }

  const statusColor = (s: string) => {
    if (s === "pending") return "bg-yellow-500/15 text-yellow-400";
    if (s === "accepted") return "bg-green-500/15 text-green-400";
    if (s === "rejected") return "bg-red-500/15 text-red-400";
    return "bg-blue-500/15 text-blue-400";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Quotations</h1>
          <p className="text-[#a3a3a3] text-sm mt-1">Request a project estimate and track its status.</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)}
          className="px-5 py-2.5 bg-[#c0392b] hover:bg-[#e74c3c] text-white text-sm font-semibold rounded-lg transition-colors">
          {showForm ? "Cancel" : "+ New Quotation"}
        </button>
      </div>

      {success && (
        <div className="mb-5 p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg">{success}</div>
      )}

      {/* New quotation form */}
      {showForm && (
        <form onSubmit={submit} className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 mb-6 space-y-4">
          <h2 className="text-white font-semibold">New Quotation Request</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#a3a3a3] text-sm font-medium mb-1.5">Project Name *</label>
              <input required type="text" value={form.projectName} onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                placeholder="My E-commerce Website"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b]" />
            </div>
            <div>
              <label className="block text-[#a3a3a3] text-sm font-medium mb-1.5">Budget Range</label>
              <input type="text" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                placeholder="e.g. $500–$1000"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b]" />
            </div>
            <div>
              <label className="block text-[#a3a3a3] text-sm font-medium mb-1.5">Deadline / Timeline</label>
              <input type="text" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                placeholder="e.g. 2 months, by Dec 2025"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b]" />
            </div>
            <div>
              <label className="block text-[#a3a3a3] text-sm font-medium mb-1.5">Tech Stack Preference</label>
              <input type="text" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                placeholder="e.g. React, Node.js, Laravel"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b]" />
            </div>
          </div>
          <div>
            <label className="block text-[#a3a3a3] text-sm font-medium mb-1.5">Project Description *</label>
            <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe your project in detail — features, requirements, target audience…"
              className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b] resize-none" />
          </div>
          <button type="submit" disabled={submitting}
            className="px-6 py-2.5 bg-[#c0392b] hover:bg-[#e74c3c] disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors">
            {submitting ? "Submitting…" : "Submit Quotation Request"}
          </button>
        </form>
      )}

      {/* Quotations list */}
      <div className="space-y-4">
        {loading && <p className="text-[#6b6b6b] text-sm">Loading…</p>}
        {!loading && quotations.length === 0 && (
          <div className="text-center py-16 text-[#6b6b6b]">
            <p className="text-4xl mb-3">📋</p>
            <p>No quotation requests yet.</p>
            <button onClick={() => setShowForm(true)} className="mt-3 text-[#c0392b] hover:text-[#e74c3c] text-sm">Request your first quotation →</button>
          </div>
        )}
        {quotations.map((q) => (
          <div key={q.id} className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-white font-semibold">{q.projectName}</h3>
              <span className={`flex-shrink-0 text-xs px-3 py-1 rounded-full font-medium ${statusColor(q.status)}`}>
                {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
              </span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mb-4 text-sm">
              {[
                { label: "Budget", value: q.budget || "Not specified" },
                { label: "Deadline", value: q.deadline || "Not specified" },
                { label: "Tech Stack", value: q.techStack || "Not specified" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[#6b6b6b] text-xs">{item.label}</p>
                  <p className="text-[#a3a3a3]">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-[#a3a3a3] text-sm leading-relaxed mb-3 whitespace-pre-wrap">{q.description}</p>
            {q.adminNote && (
              <div className="mt-3 p-3 bg-[#0f0f0f] border border-[#c0392b]/20 rounded-lg">
                <p className="text-[#c0392b] text-xs font-medium mb-1">Admin Note</p>
                <p className="text-[#a3a3a3] text-sm">{q.adminNote}</p>
              </div>
            )}
            <p className="text-[#6b6b6b] text-xs mt-3">{new Date(q.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
