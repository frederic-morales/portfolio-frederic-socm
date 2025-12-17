"use client"; // 1. OBLIGATORIO: Porque usamos hooks e interactividad

import { ArrowDown, Rocket } from "lucide-react";
import Link from "next/link"; // 2. Usamos Link de Next.js
import Image from "next/image"; // 3. Componente de imagen optimizado
import { Button } from "../ui/Button";
import { useLanguage } from "@/hooks/use-language";
import profilePhoto from "../../assets/perfilphoto2.jpeg"

export function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div 
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" 
        style={{ animationDelay: "-3s" }} 
      />

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className="mb-8 opacity-0 animate-fade-up">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
              
              {/* CAMBIO IMPORTANTE: Next Image */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background shadow-glow overflow-hidden">
                <Image
                  src={profilePhoto} // Ruta relativa a la carpeta public
                  alt={language === "es" ? "Foto de perfil" : "Profile photo"}
                  fill // Llena el contenedor padre
                  className="object-cover"
                  priority // Carga esta imagen lo más rápido posible (es la principal)
                />
              </div>

            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-8 opacity-0 animate-fade-up stagger-1">
            <Rocket className="w-4 h-4" />
            {"Frederic Ariel Soc Morales"}
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-fade-up stagger-2">
            {t("hero.greeting")}{" "}
            <span className="text-gradient">
              {language === "es" ? "Desarrollador" : "Developer"}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up stagger-3">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-4">
            {/* NOTA: Button debe soportar asChild (de shadcn) para que funcione bien con Link */}
            <Button asChild size="lg" className="text-base px-8 py-6 rounded-full">
              <Link href="/projects"> {/* href en lugar de to */}
                {t("hero.cta.projects")}
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-full">
              <Link href="/about"> {/* href en lugar de to */}
                {t("nav.about")}
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in stagger-4">
          <a
            href="#featured"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm font-medium">
              {language === "es" ? "Descubre más" : "Discover more"}
            </span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}