import { NavLink, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Upload,
  MessageSquare,
  LogOut,
  LogIn,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/browse", label: "Browse", icon: BookOpen },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/forum", label: "Forum", icon: MessageSquare },
];

interface NavItemsProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

function NavItems({ collapsed = false, onNavigate }: NavItemsProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    onNavigate?.();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className={cn("flex items-center py-5 mb-2 shrink-0", collapsed ? "justify-center px-0" : "px-4 gap-1")}>
        <NavLink
          to="/browse"
          onClick={onNavigate}
          className="flex items-center gap-1 hover:opacity-75 transition-opacity shrink-0"
        >
          <img src="/logo.png" alt="ManabiEcho" className="h-7 w-7 object-contain shrink-0" />
          {!collapsed && (
            <span className="text-sm font-semibold text-zinc-900 tracking-tight whitespace-nowrap">
              ManabiEcho
            </span>
          )}
        </NavLink>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-1 rounded-lg text-sm transition-colors duration-150 cursor-pointer",
                collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2",
                isActive
                  ? "bg-zinc-100 text-zinc-900 font-medium"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              )
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: profile or sign in */}
      <div className="px-2 pb-4 pt-4 space-y-0.5 shrink-0">
        {isAuthenticated && user ? (
          <>
            <NavLink
              to={`/profile/${user.username}`}
              onClick={onNavigate}
              title={collapsed ? `@${user.username}` : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg text-sm transition-colors duration-150 cursor-pointer",
                  collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 font-medium"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                )
              }
            >
              <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <span className="text-orange-700 text-[10px] font-semibold">
                  {user.username.slice(0, 1).toUpperCase()}
                </span>
              </div>
              {!collapsed && <span className="truncate">@{user.username}</span>}
            </NavLink>
            <button
              onClick={handleLogout}
              title={collapsed ? "Sign out" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-colors duration-150 w-full cursor-pointer",
                collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2"
              )}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!collapsed && "Sign out"}
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            onClick={onNavigate}
            title={collapsed ? "Sign in" : undefined}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-1 rounded-lg text-sm transition-colors duration-150 cursor-pointer",
                collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2",
                isActive
                  ? "bg-zinc-100 text-zinc-900 font-medium"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              )
            }
          >
            <LogIn className="w-4 h-4 shrink-0" />
            {!collapsed && "Sign in"}
          </NavLink>
        )}
      </div>
    </div>
  );
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed inset-y-0 left-0 bg-white shadow-sm z-40 transition-all duration-200 overflow-hidden",
          collapsed ? "w-14" : "w-56"
        )}
      >
        <NavItems collapsed={collapsed} />

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute bottom-4 right-0 translate-x-1/2 z-50 w-5 h-5 bg-white border border-zinc-200 rounded-full flex items-center justify-center shadow-sm hover:bg-zinc-50 transition-colors duration-150 cursor-pointer"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3 text-zinc-500" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-zinc-500" />
          )}
        </button>
      </aside>

      {/* Mobile hamburger + drawer */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center h-14 px-4 bg-white shadow-sm">
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-zinc-600" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-56 p-0">
            <NavItems onNavigate={() => {}} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-1 ml-3">
          <img src="/logo.png" alt="ManabiEcho" className="h-6 w-6 object-contain" />
          <span className="text-sm font-semibold text-zinc-900 tracking-tight">
            ManabiEcho
          </span>
        </div>
      </div>
    </>
  );
}
