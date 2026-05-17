"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { Message, Quotation } from "@/lib/types";

interface Stats {
  totalMessages: number;
  unreadMessages: number;
  totalQuotations: number;
  pendingQuotations: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [recentQuotations, setRecentQuotations] = useState<Quotation[]>([]);

  useEffect(() => {
    async function load() {
      const [msgRes, qRes, uRes] = await Promise.all([
        fetch("/api/messages"),
        fetch("/api/quotations"),
        fetch("/api/users"),
      ]);
      const messages: Message[] = msgRes.ok ? await msgRes.json() : [];
      const quotations: Quotation[] = qRes.ok ? await qRes.json() : [];
      const users: { id: string }[] = uRes.ok ? await uRes.json() : [];

      setStats({
        totalMessages: messages.length,
        unreadMessages: messages.filter((m) => m.status === "unread").length,
        totalQuotations: quotations.length,
        pendingQuotations: quotations.filter((q) => q.status === "pending").length,
        totalUsers: users.length,
      });
      setRecentMessages(messages.slice(-5).reverse());
      setRecentQuotations(quotations.slice(-5).reverse());
    }
    load();
  }, []);

  const statCards = [
    { label: "Total Messages", value: stats?.totalMessages ?? "–", sub: `${stats?.unreadMessages ?? 0} unread`, href: "/admin/messages", color: "blue" },
    { label: "Quotations", value: stats?.totalQuotations ?? "–", sub: `${stats?.pendingQuotations ?? 0} pending`, href: "/admin/quotations", color: "yellow" },
    { label: "Registered Users", value: stats?.totalUsers ?? "–", sub: "all roles", href: "/admin/users", color: "green" },
    { label: "Portfolio Content", value: "Live", sub: "click to edit", href: "/admin/portfolio", color: "red" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Welcome back, {session?.user?.name} 👋</h1>
        <p className="text-[#a3a3a3] text-sm mt-1">Here&apos;s what&apos;s happening on your portfolio.</p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#c0392b] transition-colors group"
          >
            <p className="text-[#6b6b6b] text-xs font-medium uppercase tracking-wider mb-2">{card.label}</p>
            <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
            <p className="text-[#a3a3a3] text-xs">{card.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent messages */}
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Recent Messages</h2>
            <Link href="/admin/messages" className="text-[#c0392b] text-xs hover:text-[#e74c3c]">View all →</Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="text-[#6b6b6b] text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <div key={m.id} className="flex items-start gap-3 p-3 bg-[#0f0f0f] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{m.subject}</p>
                    <p className="text-[#a3a3a3] text-xs">{m.userName} · {new Date(m.createdAt).toLocaleDateString()}</p>
                  </div>
                  {m.status === "unread" && (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#c0392b] mt-1.5" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent quotations */}
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Recent Quotations</h2>
            <Link href="/admin/quotations" className="text-[#c0392b] text-xs hover:text-[#e74c3c]">View all →</Link>
          </div>
          {recentQuotations.length === 0 ? (
            <p className="text-[#6b6b6b] text-sm">No quotations yet.</p>
          ) : (
            <div className="space-y-3">
              {recentQuotations.map((q) => (
                <div key={q.id} className="flex items-start gap-3 p-3 bg-[#0f0f0f] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{q.projectName}</p>
                    <p className="text-[#a3a3a3] text-xs">{q.userName} · {q.budget}</p>
                  </div>
                  <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                    q.status === "pending" ? "bg-yellow-500/15 text-yellow-400" :
                    q.status === "accepted" ? "bg-green-500/15 text-green-400" :
                    q.status === "rejected" ? "bg-red-500/15 text-red-400" :
                    "bg-blue-500/15 text-blue-400"
                  }`}>
                    {q.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
