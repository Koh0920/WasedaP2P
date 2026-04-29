import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPasswordApi } from "@/services/api";

export function PasswordResetPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = searchParams.get("step");

  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email."); return; }
    setLoading(true);
    try {
      const message = await resetPasswordApi(email);
      toast.success(message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.password || !passwords.confirm) { toast.error("Please fill in both fields."); return; }
    if (passwords.password !== passwords.confirm) { toast.error("Passwords do not match."); return; }
    if (passwords.password.length < 8) { toast.error("Password must be at least 8 characters."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Password updated. You can now sign in.");
    navigate("/login");
  };

  if (step === "reset") {
    return (
      <div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-zinc-900 mb-1">Set new password</h1>
          <p className="text-sm text-zinc-500">Choose a strong password for your account.</p>
        </div>

        <form onSubmit={handleSetPassword} className="space-y-4">
          <div>
            <label htmlFor="new-password" className="text-xs text-zinc-400 uppercase tracking-wide mb-2 block">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={passwords.password}
              onChange={(e) => setPasswords((p) => ({ ...p, password: e.target.value }))}
              placeholder="At least 8 characters"
              className="w-full text-sm bg-zinc-100 border-0 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="text-xs text-zinc-400 uppercase tracking-wide mb-2 block">
              Confirm new password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={passwords.confirm}
              onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
              placeholder="••••••••"
              className="w-full text-sm bg-zinc-100 border-0 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 font-medium mt-2 cursor-pointer"
          >
            {loading ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-zinc-900 mb-1">Reset password</h1>
        <p className="text-sm text-zinc-500">
          Enter your student email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleRequestReset} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-xs text-zinc-400 uppercase tracking-wide mb-2 block">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@manabiecho.com"
            className="w-full text-sm bg-zinc-100 border-0 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 font-medium mt-2 cursor-pointer"
        >
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <p className="text-sm text-zinc-500 text-center mt-6">
        <Link to="/login" className="text-orange-500 hover:text-orange-600 transition-colors duration-150">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
