import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", String(!prev));
      return !prev;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Sidebar collapsed={collapsed} onToggle={toggleCollapsed} />

      {/* Offset content by sidebar width — transitions in sync with sidebar */}
      <div
        className={[
          "transition-all duration-200",
          collapsed ? "md:pl-14" : "md:pl-56",
        ].join(" ")}
      >
        <main className="min-h-screen pt-14 md:pt-0">
          <Outlet />
        </main>
        <Footer />
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
