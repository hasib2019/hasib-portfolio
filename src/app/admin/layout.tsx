"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "✏️" },
  { href: "/admin/messages", label: "Messages", icon: "💬" },
  { href: "/admin/quotations", label: "Quotations", icon: "📋" },
  { href: "/admin/users", label: "Users", icon: "👥" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col fixed inset-y-0 left-0 z-40">
        {/* Logo */}
        <div className="p-5 border-b border-[#2a2a2a]">
          <Link href="/" className="text-lg font-bold text-white block">
            <span className="text-[#c0392b]">&lt;</span>Admin<span className="text-[#c0392b]">/&gt;</span>
          </Link>
          <p className="text-[#6b6b6b] text-xs mt-1 truncate">{session?.user?.email}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#c0392b]/15 text-white border border-[#c0392b]/30"
                    : "text-[#a3a3a3] hover:bg-[#252525] hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#2a2a2a] space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-[#a3a3a3] hover:text-white text-sm rounded-lg hover:bg-[#252525] transition-colors"
          >
            <span>🌐</span> View Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 text-sm rounded-lg hover:bg-red-500/10 transition-colors"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 min-h-screen">{children}</main>
    </div>
  );
}
