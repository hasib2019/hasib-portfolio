"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(session.user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (params.get("error") === "AccessDenied") {
      setError("You do not have permission to access that page.");
    }
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.refresh();
    }
  }

  if (status === "loading") return null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-[#c0392b]">&lt;</span>Hasibuzzaman<span className="text-[#c0392b]">/&gt;</span>
          </Link>
          <p className="text-[#a3a3a3] text-sm mt-2">Sign in to your account</p>
        </div>

        <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-8">
          {error && (
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#a3a3a3] text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#a3a3a3] text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#c0392b] hover:bg-[#e74c3c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-[#6b6b6b] text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-[#c0392b] hover:text-[#e74c3c] font-medium transition-colors">
              Register
            </Link>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-[#6b6b6b] hover:text-white text-sm transition-colors">
            ← Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
