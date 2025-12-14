"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "es" | "en";

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

// Mantenemos tu objeto de traducciones intacto
export const translations: Translations = {
  // Navbar
  "nav.home": { es: "Inicio", en: "Home" },
  "nav.about": { es: "Sobre mí", en: "About" },
  "nav.projects": { es: "Proyectos", en: "Projects" },
  "nav.contact": { es: "Contacto", en: "Contact" },

  // Hero Section
  "hero.greeting": { es: "Hola, soy", en: "Hi, I'm" },
  "hero.name": { es: "Tu Nombre", en: "Your Name" },
  "hero.role": { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
  "hero.description": {
    es: "Creo experiencias digitales excepcionales combinando diseño elegante con código limpio y eficiente.",
    en: "I create exceptional digital experiences combining elegant design with clean and efficient code.",
  },
  "hero.cta.projects": { es: "Ver proyectos", en: "View projects" },
  "hero.cta.contact": { es: "Contactar", en: "Contact me" },

  // About Preview
  "about.title": { es: "Sobre mí", en: "About me" },
  "about.subtitle": { es: "Conoce mi historia", en: "Know my story" },
  "about.description": {
    es: "Soy un desarrollador apasionado por crear soluciones tecnológicas que marquen la diferencia. Con más de 5 años de experiencia, me especializo en desarrollo web full stack.",
    en: "I'm a developer passionate about creating technological solutions that make a difference. With over 5 years of experience, I specialize in full stack web development.",
  },
  "about.cta": { es: "Más sobre mí", en: "More about me" },

  // Featured Projects
  "projects.title": { es: "Proyectos", en: "Projects" },
  "projects.subtitle": { es: "Trabajo destacado", en: "Featured work" },
  "projects.viewAll": { es: "Ver todos", en: "View all" },
  "projects.viewProject": { es: "Ver proyecto", en: "View project" },

  // Contact Section
  "contact.title": { es: "Contacto", en: "Contact" },
  "contact.subtitle": { es: "¿Tienes un proyecto en mente?", en: "Have a project in mind?" },
  "contact.description": {
    es: "Estoy disponible para proyectos freelance y oportunidades laborales. ¡Hablemos!",
    en: "I'm available for freelance projects and job opportunities. Let's talk!",
  },
  "contact.cta": { es: "Enviar mensaje", en: "Send message" },

  // Footer
  "footer.rights": { es: "Todos los derechos reservados.", en: "All rights reserved." },

  // About Page
  "aboutPage.title": { es: "Sobre mí", en: "About me" },
  "aboutPage.intro": {
    es: "Soy un desarrollador full stack con pasión por crear experiencias digitales que combinen funcionalidad y estética.",
    en: "I'm a full stack developer with a passion for creating digital experiences that combine functionality and aesthetics.",
  },
  "aboutPage.experience": { es: "Experiencia", en: "Experience" },
  "aboutPage.experienceYears": { es: "+5 años", en: "+5 years" },
  "aboutPage.experienceDesc": { es: "de experiencia profesional", en: "of professional experience" },
  "aboutPage.projectsCount": { es: "+50 proyectos", en: "+50 projects" },
  "aboutPage.projectsDesc": { es: "completados exitosamente", en: "successfully completed" },
  "aboutPage.clients": { es: "+30 clientes", en: "+30 clients" },
  "aboutPage.clientsDesc": { es: "satisfechos", en: "satisfied" },
  "aboutPage.technologies": { es: "Tecnologías", en: "Technologies" },
  "aboutPage.education": { es: "Educación", en: "Education" },
  "aboutPage.degree": { es: "Ingeniería en Sistemas", en: "Systems Engineering" },
  "aboutPage.university": { es: "Universidad Tecnológica", en: "Technology University" },

  // Projects Page
  "projectsPage.title": { es: "Proyectos", en: "Projects" },
  "projectsPage.subtitle": { es: "Una selección de mis trabajos más recientes", en: "A selection of my most recent work" },
  "projectsPage.all": { es: "Todos", en: "All" },

  // Project Detail
  "projectDetail.back": { es: "Volver a proyectos", en: "Back to projects" },
  "projectDetail.description": { es: "Descripción", en: "Description" },
  "projectDetail.technologies": { es: "Tecnologías utilizadas", en: "Technologies used" },
  "projectDetail.liveDemo": { es: "Ver demo", en: "Live demo" },
  "projectDetail.sourceCode": { es: "Código fuente", en: "Source code" },
  "projectDetail.notFound": { es: "Proyecto no encontrado", en: "Project not found" },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 1. Inicializamos SIEMPRE en 'es' para evitar errores de hidratación
  const [language, setLanguage] = useState<Language>("es");

  // 2. Usamos useEffect para revisar el localStorage solo en el cliente
  useEffect(() => {
    const stored = localStorage.getItem("language") as Language;
    if (stored) {
      setLanguage(stored);
    } else {
      // Opcional: Detectar idioma del navegador
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") setLanguage("en");
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "es" ? "en" : "es";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}