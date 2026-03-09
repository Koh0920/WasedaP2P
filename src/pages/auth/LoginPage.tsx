import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/browse");
    } catch {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-zinc-900 mb-1">Welcome back</h1>
        <p className="text-sm text-zinc-500">Sign in to your Waseda Notes account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-xs text-zinc-400 uppercase tracking-wide mb-2 block">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="you@waseda.jp"
            className="w-full text-sm bg-zinc-100 border-0 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="text-xs text-zinc-400 uppercase tracking-wide">
              Password
            </label>
            <Link
              to="/reset-password"
              className="text-xs text-orange-500 hover:text-orange-600 transition-colors duration-150"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            placeholder="••••••••"
            className="w-full text-sm bg-zinc-100 border-0 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 font-medium mt-2 cursor-pointer"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-sm text-zinc-500 text-center mt-6">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-orange-500 hover:text-orange-600 transition-colors duration-150">
          Sign up
        </Link>
      </p>
    </div>
  );
}
