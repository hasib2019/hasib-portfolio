"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Message, Quotation } from "@/lib/types";

export default function UserDashboard() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);

  useEffect(() => {
    Promise.all([fetch("/api/messages"), fetch("/api/quotations")]).then(async ([mRes, qRes]) => {
      if (mRes.ok) setMessages((await mRes.json()).reverse());
      if (qRes.ok) setQuotations((await qRes.json()).reverse());
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Hello, {session?.user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-[#a3a3a3] text-sm mt-1">Manage your messages and project quotations here.</p>
      </div>

      {/* Quick stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Messages Sent", value: messages.length, href: "/dashboard/messages", icon: "💬" },
          { label: "Quotations Sent", value: quotations.length, href: "/dashboard/quotations", icon: "📋" },
          { label: "Pending Quotations", value: quotations.filter((q) => q.status === "pending").length, href: "/dashboard/quotations", icon: "⏳" },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href}
            className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#c0392b] transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{stat.icon}</span>
              <p className="text-[#6b6b6b] text-xs font-medium uppercase tracking-wide">{stat.label}</p>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link href="/dashboard/messages"
          className="flex items-center gap-4 p-5 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl hover:border-[#c0392b] transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-[#c0392b]/10 border border-[#c0392b]/20 flex items-center justify-center text-[#c0392b] text-xl group-hover:bg-[#c0392b]/20 transition-colors">
            ✉️
          </div>
          <div>
            <p className="text-white font-semibold">Send a Message</p>
            <p className="text-[#a3a3a3] text-sm">Get in touch directly</p>
          </div>
        </Link>
        <Link href="/dashboard/quotations"
          className="flex items-center gap-4 p-5 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl hover:border-[#c0392b] transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-[#c0392b]/10 border border-[#c0392b]/20 flex items-center justify-center text-[#c0392b] text-xl group-hover:bg-[#c0392b]/20 transition-colors">
            📄
          </div>
          <div>
            <p className="text-white font-semibold">Request a Quotation</p>
            <p className="text-[#a3a3a3] text-sm">Get a project estimate</p>
          </div>
        </Link>
      </div>

      {/* Recent quotation statuses */}
      {quotations.length > 0 && (
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Recent Quotations</h2>
            <Link href="/dashboard/quotations" className="text-[#c0392b] text-xs hover:text-[#e74c3c]">View all →</Link>
          </div>
          <div className="space-y-3">
            {quotations.slice(0, 4).map((q) => (
              <div key={q.id} className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">{q.projectName}</p>
                  <p className="text-[#6b6b6b] text-xs">{new Date(q.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  q.status === "pending" ? "bg-yellow-500/15 text-yellow-400" :
                  q.status === "accepted" ? "bg-green-500/15 text-green-400" :
                  q.status === "rejected" ? "bg-red-500/15 text-red-400" :
                  "bg-blue-500/15 text-blue-400"
                }`}>{q.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
