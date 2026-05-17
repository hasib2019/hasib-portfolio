"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "🏠" },
  { href: "/dashboard/messages", label: "My Messages", icon: "💬" },
  { href: "/dashboard/quotations", label: "My Quotations", icon: "📋" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-5 border-b border-[#2a2a2a]">
          <Link href="/" className="text-lg font-bold text-white block">
            <span className="text-[#c0392b]">&lt;</span>Dashboard<span className="text-[#c0392b]">/&gt;</span>
          </Link>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#c0392b]/20 border border-[#c0392b]/30 flex items-center justify-center text-[#c0392b] text-xs font-bold">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{session?.user?.name}</p>
              <p className="text-[#6b6b6b] text-xs truncate">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? "bg-[#c0392b]/15 text-white border border-[#c0392b]/30" : "text-[#a3a3a3] hover:bg-[#252525] hover:text-white"}`}>
                <span>{item.icon}</span>{item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2a2a2a] space-y-2">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-[#a3a3a3] hover:text-white text-sm rounded-lg hover:bg-[#252525] transition-colors">
            <span>🌐</span> View Portfolio
          </Link>
          <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 text-sm rounded-lg hover:bg-red-500/10 transition-colors">
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8 min-h-screen">{children}</main>
    </div>
  );
}
