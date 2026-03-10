import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signupApi } from "@/services/api";

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password || !form.confirm) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await signupApi({ username: form.username, email: form.email, password: form.password });
      navigate("/verify-email");
    } catch {
      toast.error("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-zinc-900 mb-1">Create account</h1>
        <p className="text-sm text-zinc-500">Join the ManabiEcho community.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="text-xs text-zinc-400 uppercase tracking-wide mb-2 block">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
            placeholder="your_username"
            className="w-full text-sm bg-zinc-100 border-0 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-xs text-zinc-400 uppercase tracking-wide mb-2 block">
            Student email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="you@manabiecho.com"
            className="w-full text-sm bg-zinc-100 border-0 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-xs text-zinc-400 uppercase tracking-wide mb-2 block">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            placeholder="At least 8 characters"
            className="w-full text-sm bg-zinc-100 border-0 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>

        <div>
          <label htmlFor="confirm" className="text-xs text-zinc-400 uppercase tracking-wide mb-2 block">
            Confirm password
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            value={form.confirm}
            onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
            placeholder="••••••••"
            className="w-full text-sm bg-zinc-100 border-0 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 font-medium mt-2 cursor-pointer"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-sm text-zinc-500 text-center mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-500 hover:text-orange-600 transition-colors duration-150">
          Sign in
        </Link>
      </p>
    </div>
  );
}
