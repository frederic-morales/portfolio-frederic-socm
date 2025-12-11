// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Importamos la fuente
import "./globals.css"; // 2. Importamos los estilos globales

// 3. Importamos nuestros componentes de estructura
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Configuración de la fuente
const inter = Inter({ subsets: ["latin"] });

// Metadatos para SEO (Título y descripción que sale en Google)
export const metadata: Metadata = {
  title: "Portfolio de Desarrollador | [Tu Nombre]",
  description: "Portfolio profesional mostrando mis proyectos y habilidades en desarrollo web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-900 min-h-screen flex flex-col`}>
        
        {/* El Navbar siempre arriba */}
        <Navbar />
        
        {/* Aquí se renderiza el contenido de page.tsx, about/page.tsx, etc. */}
        {/* flex-grow hace que el contenido ocupe el espacio disponible empujando el footer */}
        <main className="flex-grow">
          {children}
        </main>

        {/* El Footer siempre abajo */}
        <Footer />
        
      </body>
    </html>
  );
}