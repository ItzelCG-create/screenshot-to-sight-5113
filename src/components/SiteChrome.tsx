import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/laboratorio-del-color", label: "Laboratorio del color" },
  { to: "/anatomia", label: "Anatomía" },
  { to: "/practica", label: "Práctica creativa" },
  { to: "/recursos", label: "Recursos" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-primary" aria-label="Trazo & Color, inicio">
      Trazo <span className="text-coral">&</span> Color
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3" aria-label="Principal">
        <Logo />
        <ul className="hidden gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                activeProps={{ className: "bg-primary !text-primary-foreground shadow-sm hover:!bg-primary", "aria-current": "page" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground hover:bg-lilac lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul id="menu-movil" className="animate-menu space-y-1 border-t border-border px-5 py-3 lg:hidden">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                className="block rounded-xl px-4 py-3 font-medium hover:bg-secondary"
                activeProps={{ className: "bg-primary text-primary-foreground hover:!bg-primary", "aria-current": "page" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40 md:mt-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <Logo />
        <p className="text-sm text-muted-foreground">Un cuaderno digital para aprender color y dibujo. Hecho con curiosidad.</p>
      </div>
    </footer>
  );
}

export function PageIntro({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="bg-hero">
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-12 md:pb-12 md:pt-20">
        <p className="inline-flex rounded-full bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">{kicker}</p>
        <h1 className="mt-4 max-w-3xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{children}</p>
      </div>
    </section>
  );
}

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(text);
    setTimeout(() => setCopied((c) => (c === text ? null : c)), 1500);
  };
  return { copied, copy };
}
