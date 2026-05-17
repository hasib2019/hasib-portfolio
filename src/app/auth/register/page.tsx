"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      return setError("Passwords do not match.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Registration failed.");
    } else {
      router.push("/auth/login?registered=1");
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-[#c0392b]">&lt;</span>Hasibuzzaman<span className="text-[#c0392b]">/&gt;</span>
          </Link>
          <p className="text-[#a3a3a3] text-sm mt-2">Create your account</p>
        </div>

        <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-8">
          {error && (
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Md. Hasibuzzaman" },
              { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
              { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
              { label: "Confirm Password", name: "confirm", type: "password", placeholder: "••••••••" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-[#a3a3a3] text-sm font-medium mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white placeholder-[#6b6b6b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c0392b] transition-colors"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 bg-[#c0392b] hover:bg-[#e74c3c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-[#6b6b6b] text-sm mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#c0392b] hover:text-[#e74c3c] font-medium transition-colors">
              Sign In
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
