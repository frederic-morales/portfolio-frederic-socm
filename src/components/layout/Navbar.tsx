"use client"; // 1. OBLIGATORIO: Porque usas useState, useEffect y window
import { useState, useEffect } from "react";
import Link from "next/link"; // 2. Importamos Link de Next
import { usePathname } from "next/navigation"; // 3. Hook para saber la ruta actual
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/projects", label: t("nav.projects") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5. Cerrar menú móvil al cambiar de ruta (dependencia pathname)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 shadow-sm" // Ajusté colores a Tailwind default por si acaso
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 6. Link usa href en lugar de to */}
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            Portfolio<span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href} // href en lugar de to
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  pathname === item.href // pathname en lugar de location.pathname
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            
            {/* Botones de Idioma y Tema */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">{language}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Repetimos botones para móvil */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">{language}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary py-2",
                    pathname === item.href
                       ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}