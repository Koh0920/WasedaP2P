import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="py-10 px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <Link
          to="/browse"
          className="flex items-center gap-1 hover:opacity-75 transition-opacity"
        >
          <img src="/logo.png" alt="ManabiEcho" className="h-6 w-6 object-contain" />
          <span className="text-sm font-semibold text-zinc-900 tracking-tight">
            ManabiEcho
          </span>
        </Link>

        <nav className="flex flex-wrap gap-6">
          <a
            href="#"
            className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors duration-150"
          >
            About
          </a>
          <Link
            to="/forum"
            className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors duration-150"
          >
            Forum
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors duration-150"
          >
            GitHub
          </a>
          <a
            href="mailto:hello@manabiecho.com"
            className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors duration-150"
          >
            Contact
          </a>
        </nav>

        <p className="text-xs text-zinc-300">
          &copy; {new Date().getFullYear()} ManabiEcho
        </p>
      </div>
    </footer>
  );
}
