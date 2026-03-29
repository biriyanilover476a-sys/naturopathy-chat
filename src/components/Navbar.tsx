import { Link, useLocation } from "react-router-dom";
import { Leaf, MessageCircle, BookOpen, Home, Moon, Sun, Bell, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { languages } from "@/i18n/translations";
import { useState, useRef, useEffect } from "react";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const navItems = [
  { to: "/", labelKey: "home" as const, icon: Home },
  { to: "/chat", labelKey: "chat" as const, icon: MessageCircle },
  { to: "/remedies", labelKey: "remedies" as const, icon: BookOpen },
  { to: "/reminders", labelKey: "reminders" as const, icon: Bell },
  { to: "/doctors", labelKey: "doctors" as const, icon: MapPin },
];

const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const { pathname } = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = languages.find((l) => l.code === language);

  return (
    <>
      {/* Top navbar (md+) */}
      <nav className="hidden md:flex items-center justify-between px-6 py-3 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-saffron">
            <Leaf className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-foreground text-sm leading-tight">{t("naturopathy_ai")}</span>
            <span className="text-[10px] text-muted-foreground leading-tight tracking-wider">{t("ayurveda")}</span>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === item.to
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {t(item.labelKey)}
            </Link>
          ))}

          {/* Language Switcher */}
          <div ref={langRef} className="relative ml-1">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">{currentLang?.nativeLabel}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-xl shadow-elevated py-1 z-50 animate-fade-up">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-muted ${
                      language === lang.code ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    <span>{lang.nativeLabel}</span>
                    <span className="text-xs text-muted-foreground">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onToggleTheme}
            className="ml-1 w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
            className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-xs transition-all duration-200 ${
              pathname === item.to
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="truncate max-w-[3.5rem] text-center">{t(item.labelKey)}</span>
          </Link>
        ))}

        {/* Mobile language button */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-xs text-muted-foreground"
            aria-label="Change language"
          >
            <Globe className="w-5 h-5" />
            <span className="truncate max-w-[3.5rem]">{currentLang?.nativeLabel}</span>
          </button>
          {langOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-44 bg-card border border-border rounded-xl shadow-elevated py-1 z-50 animate-fade-up">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-muted ${
                    language === lang.code ? "text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  <span>{lang.nativeLabel}</span>
                  <span className="text-xs text-muted-foreground">{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onToggleTheme}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-xs text-muted-foreground"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          {t("theme")}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
