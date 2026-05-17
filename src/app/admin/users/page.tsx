"use client";

import { useEffect, useState } from "react";

interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/users").then((r) => r.json()).then((d) => { setUsers(d); setLoading(false); });
  }, []);

  async function del(id: string, name: string) {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    await fetch("/api/users", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-[#a3a3a3] text-sm mt-1">Manage registered user accounts.</p>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm bg-[#1e1e1e] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b] transition-colors"
        />
        <span className="text-[#6b6b6b] text-sm flex-shrink-0">{users.length} total</span>
      </div>

      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              <th className="text-left px-5 py-3 text-[#6b6b6b] font-medium">Name</th>
              <th className="text-left px-5 py-3 text-[#6b6b6b] font-medium">Email</th>
              <th className="text-left px-5 py-3 text-[#6b6b6b] font-medium">Role</th>
              <th className="text-left px-5 py-3 text-[#6b6b6b] font-medium">Joined</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-[#6b6b6b]">Loading…</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-[#6b6b6b]">No users found.</td></tr>
            )}
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#252525] transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#c0392b]/20 border border-[#c0392b]/30 flex items-center justify-center text-[#c0392b] text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[#a3a3a3]">{user.email}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.role === "admin" ? "bg-[#c0392b]/15 text-[#c0392b]" : "bg-[#252525] text-[#a3a3a3]"
                  }`}>{user.role}</span>
                </td>
                <td className="px-5 py-3.5 text-[#6b6b6b]">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-3.5 text-right">
                  <button onClick={() => del(user.id, user.name)} className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded hover:bg-red-500/20 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
