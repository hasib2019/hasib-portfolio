"use client";

import { useEffect, useState } from "react";
import type { PortfolioData, Experience, Project, Education, Certification } from "@/lib/types";

type Tab = "basic" | "skills" | "experience" | "projects" | "education" | "certifications";

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl border ${
      type === "success"
        ? "bg-green-500/15 border-green-500/30 text-green-400"
        : "bg-red-500/15 border-red-500/30 text-red-400"
    }`}>
      {msg}
    </div>
  );
}

export default function AdminPortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [tab, setTab] = useState<Tab>("basic");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetch("/api/portfolio").then((r) => r.json()).then(setData);
  }, []);

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/portfolio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    res.ok ? showToast("Portfolio saved successfully!", "success") : showToast("Failed to save.", "error");
  }

  function updatePersonal(key: string, value: string | boolean) {
    if (!data) return;
    setData({ ...data, personalInfo: { ...data.personalInfo, [key]: value } });
  }

  function updateSkillCategory(cat: string, value: string) {
    if (!data) return;
    const tags = value.split(",").map((s) => s.trim()).filter(Boolean);
    setData({ ...data, skills: { ...data.skills, [cat]: tags } });
  }

  function addSkillCategory() {
    if (!data) return;
    const cat = prompt("Category name:");
    if (!cat?.trim()) return;
    setData({ ...data, skills: { ...data.skills, [cat.trim()]: [] } });
  }

  function removeSkillCategory(cat: string) {
    if (!data) return;
    const skills = { ...data.skills };
    delete skills[cat];
    setData({ ...data, skills });
  }

  if (!data) {
    return <div className="flex items-center justify-center h-64 text-[#a3a3a3]">Loading portfolio data…</div>;
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "skills", label: "Skills" },
    { key: "experience", label: "Experience" },
    { key: "projects", label: "Projects" },
    { key: "education", label: "Education" },
    { key: "certifications", label: "Certifications" },
  ];

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio Editor</h1>
          <p className="text-[#a3a3a3] text-sm mt-1">Edit your portfolio content — changes go live instantly.</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 bg-[#c0392b] hover:bg-[#e74c3c] disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap mb-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              tab === t.key ? "bg-[#c0392b] text-white" : "text-[#a3a3a3] hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6">
        {/* Basic Info */}
        {tab === "basic" && (
          <div className="space-y-4">
            <h2 className="text-white font-semibold mb-4">Personal Information</h2>
            {[
              { key: "name", label: "Full Name" },
              { key: "title", label: "Job Title" },
              { key: "tagline", label: "Tagline" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "website", label: "Website URL" },
              { key: "github", label: "GitHub URL" },
              { key: "linkedin", label: "LinkedIn URL" },
              { key: "facebook", label: "Facebook URL" },
              { key: "location", label: "Location" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-[#a3a3a3] text-sm font-medium mb-1">{field.label}</label>
                <input
                  type="text"
                  value={(data.personalInfo as Record<string, unknown>)[field.key] as string}
                  onChange={(e) => updatePersonal(field.key, e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b] transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-[#a3a3a3] text-sm font-medium mb-1">Summary</label>
              <textarea
                rows={5}
                value={data.personalInfo.summary}
                onChange={(e) => updatePersonal("summary", e.target.value)}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b] transition-colors resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="available"
                checked={data.personalInfo.availableForWork}
                onChange={(e) => updatePersonal("availableForWork", e.target.checked)}
                className="w-4 h-4 accent-[#c0392b]"
              />
              <label htmlFor="available" className="text-[#a3a3a3] text-sm">Available for work</label>
            </div>
            <div>
              <label className="block text-[#a3a3a3] text-sm font-medium mb-1">Footer Credit</label>
              <input
                type="text"
                value={data.personalInfo.footerCredit}
                onChange={(e) => updatePersonal("footerCredit", e.target.value)}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b] transition-colors"
                placeholder='e.g. Built with Next.js &amp; Tailwind CSS or Developed by <a href="...">Name</a>'
              />
              <p className="text-[#6b6b6b] text-xs mt-1">Supports HTML (e.g. anchor tags). Appears in the footer after your name.</p>
            </div>
          </div>
        )}

        {/* Skills */}
        {tab === "skills" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold">Skills by Category</h2>
              <button onClick={addSkillCategory} className="px-3 py-1.5 bg-[#c0392b]/15 border border-[#c0392b]/30 text-[#c0392b] text-sm rounded-lg hover:bg-[#c0392b]/25">
                + Add Category
              </button>
            </div>
            {Object.entries(data.skills).map(([cat, items]) => (
              <div key={cat} className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium text-sm">{cat}</span>
                  <button onClick={() => removeSkillCategory(cat)} className="text-red-400 text-xs hover:text-red-300">Remove</button>
                </div>
                <input
                  type="text"
                  value={items.join(", ")}
                  onChange={(e) => updateSkillCategory(cat, e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b]"
                  placeholder="Comma-separated skills"
                />
                <p className="text-[#6b6b6b] text-xs mt-1">Separate skills with commas</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {tab === "experience" && (
          <ExperienceEditor
            items={data.experiences}
            onChange={(experiences) => setData({ ...data, experiences })}
          />
        )}

        {/* Projects */}
        {tab === "projects" && (
          <ProjectsEditor
            items={data.projects}
            onChange={(projects) => setData({ ...data, projects })}
          />
        )}

        {/* Education */}
        {tab === "education" && (
          <EducationEditor
            items={data.education}
            onChange={(education) => setData({ ...data, education })}
          />
        )}

        {/* Certifications */}
        {tab === "certifications" && (
          <CertsEditor
            items={data.certifications}
            onChange={(certifications) => setData({ ...data, certifications })}
          />
        )}
      </div>
    </div>
  );
}

// ─── Experience Editor ─────────────────────────────────────────────────────

function ExperienceEditor({ items, onChange }: { items: Experience[]; onChange: (v: Experience[]) => void }) {
  const [editing, setEditing] = useState<Experience | null>(null);
  const [isNew, setIsNew] = useState(false);

  const blank: Experience = { id: Date.now(), role: "", company: "", location: "", duration: "", current: false, technologies: [], description: "" };

  function save(item: Experience) {
    if (isNew) {
      onChange([...items, item]);
    } else {
      onChange(items.map((i) => (i.id === item.id ? item : i)));
    }
    setEditing(null);
    setIsNew(false);
  }

  function remove(id: number) {
    if (confirm("Delete this experience?")) onChange(items.filter((i) => i.id !== id));
  }

  if (editing) {
    return <ExperienceForm item={editing} onSave={save} onCancel={() => { setEditing(null); setIsNew(false); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-semibold">Work Experience</h2>
        <button onClick={() => { setEditing(blank); setIsNew(true); }} className="px-3 py-1.5 bg-[#c0392b]/15 border border-[#c0392b]/30 text-[#c0392b] text-sm rounded-lg hover:bg-[#c0392b]/25">
          + Add Experience
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-white font-medium text-sm">{item.role}</p>
              <p className="text-[#c0392b] text-xs">{item.company}</p>
              <p className="text-[#6b6b6b] text-xs">{item.duration}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => { setEditing(item); setIsNew(false); }} className="px-3 py-1 bg-[#252525] text-[#a3a3a3] text-xs rounded hover:text-white">Edit</button>
              <button onClick={() => remove(item.id)} className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded hover:bg-red-500/20">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceForm({ item, onSave, onCancel }: { item: Experience; onSave: (v: Experience) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ ...item, technologies: item.technologies.join(", ") });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...item, ...form, technologies: form.technologies.split(",").map((s) => s.trim()).filter(Boolean) });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-white font-semibold mb-2">Edit Experience</h2>
      {[
        { key: "role", label: "Role / Position" },
        { key: "company", label: "Company" },
        { key: "location", label: "Location" },
        { key: "duration", label: "Duration (e.g. Jan 2020 – Present)" },
      ].map((f) => (
        <div key={f.key}>
          <label className="block text-[#a3a3a3] text-xs font-medium mb-1">{f.label}</label>
          <input type="text" value={(form as Record<string, unknown>)[f.key] as string} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b]" />
        </div>
      ))}
      <div>
        <label className="block text-[#a3a3a3] text-xs font-medium mb-1">Technologies (comma-separated)</label>
        <input type="text" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })}
          className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b]" />
      </div>
      <div>
        <label className="block text-[#a3a3a3] text-xs font-medium mb-1">Description</label>
        <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required
          className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b] resize-none" />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="current" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} className="accent-[#c0392b]" />
        <label htmlFor="current" className="text-[#a3a3a3] text-sm">Currently working here</label>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="px-5 py-2 bg-[#c0392b] hover:bg-[#e74c3c] text-white text-sm font-medium rounded-lg">Save</button>
        <button type="button" onClick={onCancel} className="px-5 py-2 bg-[#252525] text-[#a3a3a3] text-sm font-medium rounded-lg hover:text-white">Cancel</button>
      </div>
    </form>
  );
}

// ─── Projects Editor ───────────────────────────────────────────────────────

function ProjectsEditor({ items, onChange }: { items: Project[]; onChange: (v: Project[]) => void }) {
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);

  const blank: Project = { id: Date.now(), name: "", company: "", type: "", description: "", technologies: [], link: "", linkLabel: "", featured: false };

  function save(item: Project) {
    if (isNew) { onChange([...items, item]); }
    else { onChange(items.map((i) => (i.id === item.id ? item : i))); }
    setEditing(null); setIsNew(false);
  }

  function remove(id: number) {
    if (confirm("Delete this project?")) onChange(items.filter((i) => i.id !== id));
  }

  if (editing) {
    return <ProjectForm item={editing} onSave={save} onCancel={() => { setEditing(null); setIsNew(false); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-semibold">Projects</h2>
        <button onClick={() => { setEditing(blank); setIsNew(true); }} className="px-3 py-1.5 bg-[#c0392b]/15 border border-[#c0392b]/30 text-[#c0392b] text-sm rounded-lg hover:bg-[#c0392b]/25">
          + Add Project
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-white font-medium text-sm">{item.name}</p>
                {item.featured && <span className="text-xs px-1.5 py-0.5 bg-[#c0392b]/20 text-[#c0392b] rounded">Featured</span>}
              </div>
              <p className="text-[#6b6b6b] text-xs">{item.type} · {item.company}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => { setEditing(item); setIsNew(false); }} className="px-3 py-1 bg-[#252525] text-[#a3a3a3] text-xs rounded hover:text-white">Edit</button>
              <button onClick={() => remove(item.id)} className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded hover:bg-red-500/20">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectForm({ item, onSave, onCancel }: { item: Project; onSave: (v: Project) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ ...item, technologies: item.technologies.join(", ") });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...item, ...form, technologies: form.technologies.split(",").map((s) => s.trim()).filter(Boolean) });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-white font-semibold mb-2">Edit Project</h2>
      {[
        { key: "name", label: "Project Name" }, { key: "company", label: "Company" },
        { key: "type", label: "Type (e.g. E-commerce)" }, { key: "link", label: "Live URL" }, { key: "linkLabel", label: "Link Label" },
      ].map((f) => (
        <div key={f.key}>
          <label className="block text-[#a3a3a3] text-xs font-medium mb-1">{f.label}</label>
          <input type="text" value={(form as Record<string, unknown>)[f.key] as string} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b]" />
        </div>
      ))}
      <div>
        <label className="block text-[#a3a3a3] text-xs font-medium mb-1">Technologies (comma-separated)</label>
        <input type="text" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })}
          className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b]" />
      </div>
      <div>
        <label className="block text-[#a3a3a3] text-xs font-medium mb-1">Description</label>
        <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required
          className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b] resize-none" />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[#c0392b]" />
        <label htmlFor="featured" className="text-[#a3a3a3] text-sm">Featured project</label>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="px-5 py-2 bg-[#c0392b] hover:bg-[#e74c3c] text-white text-sm font-medium rounded-lg">Save</button>
        <button type="button" onClick={onCancel} className="px-5 py-2 bg-[#252525] text-[#a3a3a3] text-sm font-medium rounded-lg hover:text-white">Cancel</button>
      </div>
    </form>
  );
}

// ─── Education Editor ──────────────────────────────────────────────────────

function EducationEditor({ items, onChange }: { items: Education[]; onChange: (v: Education[]) => void }) {
  const blank: Education = { id: Date.now(), degree: "", institution: "", duration: "", gpa: null, icon: "🎓" };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-semibold">Education</h2>
        <button onClick={() => onChange([...items, { ...blank, id: Date.now() }])} className="px-3 py-1.5 bg-[#c0392b]/15 border border-[#c0392b]/30 text-[#c0392b] text-sm rounded-lg hover:bg-[#c0392b]/25">
          + Add
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#a3a3a3] text-xs">Entry #{i + 1}</span>
              <button onClick={() => { if (confirm("Delete?")) onChange(items.filter((_, j) => j !== i)); }} className="text-red-400 text-xs hover:text-red-300">Delete</button>
            </div>
            {[
              { key: "degree", label: "Degree / Program" },
              { key: "institution", label: "Institution" },
              { key: "duration", label: "Duration" },
              { key: "gpa", label: "GPA (optional)" },
              { key: "icon", label: "Icon (emoji)" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-[#6b6b6b] text-xs mb-1">{f.label}</label>
                <input type="text" value={(item as Record<string, unknown>)[f.key] as string ?? ""}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[i] = { ...updated[i], [f.key]: e.target.value || (f.key === "gpa" ? null : e.target.value) };
                    onChange(updated);
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Certifications Editor ─────────────────────────────────────────────────

function CertsEditor({ items, onChange }: { items: Certification[]; onChange: (v: Certification[]) => void }) {
  const blank: Certification = { id: Date.now(), name: "", issuer: "", validationNo: null, verifyUrl: null, category: "Cloud" };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-semibold">Certifications</h2>
        <button onClick={() => onChange([...items, { ...blank, id: Date.now() }])} className="px-3 py-1.5 bg-[#c0392b]/15 border border-[#c0392b]/30 text-[#c0392b] text-sm rounded-lg hover:bg-[#c0392b]/25">
          + Add
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#a3a3a3] text-xs">Cert #{i + 1}</span>
              <button onClick={() => { if (confirm("Delete?")) onChange(items.filter((_, j) => j !== i)); }} className="text-red-400 text-xs hover:text-red-300">Delete</button>
            </div>
            {[
              { key: "name", label: "Certificate Name" },
              { key: "issuer", label: "Issuer" },
              { key: "category", label: "Category" },
              { key: "validationNo", label: "Validation No (optional)" },
              { key: "verifyUrl", label: "Verify URL (optional)" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-[#6b6b6b] text-xs mb-1">{f.label}</label>
                <input type="text" value={(item as Record<string, unknown>)[f.key] as string ?? ""}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[i] = { ...updated[i], [f.key]: e.target.value || null };
                    onChange(updated);
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#c0392b]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
