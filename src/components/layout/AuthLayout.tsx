import { Outlet, Link } from "react-router-dom";
import { Toaster } from "sonner";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-4 py-12">
      <Link
        to="/browse"
        className="hover:opacity-75 transition-opacity"
      >
        <img src="/logo.png" alt="Waseda Notes" className="h-12 w-12 object-contain" />
      </Link>

      <div className="w-full max-w-sm">
        <Outlet />
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
