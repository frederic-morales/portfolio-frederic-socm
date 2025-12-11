// src/components/layout/Footer.tsx
export default function Footer() {
    return (
      <footer className="w-full py-6 bg-slate-950 text-slate-400 text-center text-sm border-t border-slate-900 mt-auto">
        <p>© {new Date().getFullYear()} Mi Marca Personal. Todos los derechos reservados.</p>
      </footer>
    );
  }