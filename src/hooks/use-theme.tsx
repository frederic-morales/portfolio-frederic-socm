"use client"; // 1. OBLIGATORIO: Usamos Context y State

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // 2. Inicializamos siempre con un valor seguro para evitar errores de hidratación
  // El servidor siempre renderizará "light" inicialmente.
  const [theme, setTheme] = useState<Theme>("light");
  
  // Estado para saber si ya estamos en el cliente
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 3. Esta lógica SOLO corre en el navegador (Cliente) una vez montado
    setMounted(true);
    
    const stored = localStorage.getItem("theme") as Theme;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // Solo aplicamos cambios si el componente ya montó
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 4. Evitamos renderizar hijos hasta que sepamos el tema para evitar "flash" (Opcional)
  // O simplemente renderizamos. Si quieres evitar el parpadeo blanco/negro,
  // puedes retornar <>{children}</> solo si 'mounted' es true, pero eso afecta el SEO.
  // Esta versión es segura para SEO:
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}