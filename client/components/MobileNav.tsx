import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg bg-card/50 border border-border/50 hover:bg-card transition-all duration-300"
          aria-label="Toggle menu"
        >
          <Menu
            className={cn(
              "w-5 h-5 transition-all duration-300",
              isOpen && "rotate-90 opacity-0",
            )}
          />
          <X
            className={cn(
              "w-5 h-5 absolute transition-all duration-300",
              !isOpen && "-rotate-90 opacity-0",
            )}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={closeMenu}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-background border-l border-border/50 z-50 transition-transform duration-300 ease-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="text-2xl font-bold text-quantum-primary"
              onClick={closeMenu}
            >
              Gyan
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg bg-card/50 border border-border/50 hover:bg-card transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                className={cn(
                  "block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300",
                  location.pathname === item.href
                    ? "bg-quantum-primary text-background"
                    : "text-foreground hover:bg-card/50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Follow me</p>
            <div className="flex gap-4">
              <a
                href="https://github.com/gyanaranjan-das"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-quantum-primary transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/gyanaranjan-das"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-quantum-primary transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:dasgyanaranjan835@gmail.com"
                className="text-muted-foreground hover:text-quantum-primary transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
