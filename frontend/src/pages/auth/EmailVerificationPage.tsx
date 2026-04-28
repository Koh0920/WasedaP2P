import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export function EmailVerificationPage() {
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setResent(true);
    toast.success("Verification email resent.");
  };

  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail className="w-6 h-6 text-orange-500" />
      </div>

      <h1 className="text-2xl font-medium text-zinc-900 mb-2">Check your inbox</h1>
      <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
        We sent a verification link to your student email address.
        Click the link to activate your account.
      </p>

      <p className="text-xs text-zinc-400 mb-3">Didn&apos;t receive it?</p>
      <button
        onClick={handleResend}
        disabled={loading || resent}
        className="text-sm text-orange-500 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
      >
        {loading ? "Sending…" : resent ? "Email resent" : "Resend verification email"}
      </button>

      <div className="mt-8 pt-8">
        <Link
          to="/login"
          className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors duration-150"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
