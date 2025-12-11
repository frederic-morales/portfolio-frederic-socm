// src/components/layout/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full py-4 px-6 bg-slate-900 border-b border-slate-800">
      <nav className="flex justify-between items-center max-w-5xl mx-auto text-white">
        <Link href="/" className="font-bold text-xl">
          MiPortfolio
        </Link>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-blue-400">Sobre mí</Link>
          <Link href="/projects" className="hover:text-blue-400">Proyectos</Link>
        </div>
      </nav>
    </header>
  );
}