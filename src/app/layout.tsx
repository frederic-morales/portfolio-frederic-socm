import "./globals.css";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/use-language";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", // Variable CSS para Tailwind
  display: "swap",
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit", // Variable CSS para Tailwind
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mi Portfolio",
  description: "Portfolio profesional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* 4. Agregamos las variables de fuente al body */}
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}