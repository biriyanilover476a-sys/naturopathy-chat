import { Link, useLocation } from "react-router-dom";
import { Leaf, MessageCircle, BookOpen, Home, Moon, Sun } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/remedies", label: "Remedies", icon: BookOpen },
];

const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Top navbar (md+) */}
      <nav className="hidden md:flex items-center justify-between px-6 py-3 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-foreground">Naturopathy AI</span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
          <button
            onClick={onToggleTheme}
            className="ml-2 w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Bottom tab bar (mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 border-t border-border bg-background/90 backdrop-blur-md">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs transition-colors ${
              pathname === item.to
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
        <button
          onClick={onToggleTheme}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs text-muted-foreground"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          Theme
        </button>
      </nav>
    </>
  );
};

export default Navbar;
