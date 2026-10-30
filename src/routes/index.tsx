import { createFileRoute, Link } from "@tanstack/react-router";
import { Palette, PersonStanding, Puzzle, BookOpen } from "lucide-react";
import { wheel } from "@/components/ColorWheel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trazo & Color — Aprende color y anatomía para dibujar" },
      { name: "description", content: "Plataforma educativa en español sobre teoría del color, paletas cromáticas y anatomía artística para principiantes." },
      { property: "og:title", content: "Trazo & Color — Aprende color y anatomía" },
      { property: "og:description", content: "Teoría del color interactiva, generador de paletas y fundamentos de anatomía para artistas." },
    ],
  }),
  component: Index,
});

const sections = [
  { to: "/laboratorio-del-color", icon: Palette, title: "Laboratorio del color", text: "Rueda cromática, armonías y un generador de paletas con códigos HEX.", tone: "bg-accent" },
  { to: "/anatomia", icon: PersonStanding, title: "Anatomía para artistas", text: "Proporciones, formas básicas y líneas de acción por partes del cuerpo.", tone: "bg-secondary" },
  { to: "/practica", icon: Puzzle, title: "Práctica creativa", text: "Cuestionario de color y retos para poner a prueba lo aprendido.", tone: "bg-sun/40" },
  { to: "/recursos", icon: BookOpen, title: "Recursos", text: "Consejos, recomendaciones y ejercicios organizados por categoría.", tone: "bg-teal/25" },
] as const;

function HeroArt() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-md" aria-hidden="true">
      <rect x="40" y="30" width="300" height="340" rx="24" className="fill-card stroke-border" strokeWidth="2" transform="rotate(-4 190 200)" />
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={58 + i * 36} cy="44" r="7" className="fill-background stroke-lilac" strokeWidth="3" transform="rotate(-4 190 200)" />
      ))}
      {wheel.map((c, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <circle key={c.hex} cx={190 + Math.cos(a) * 80} cy={190 + Math.sin(a) * 80} r="24" fill={c.hex} opacity="0.9" />;
      })}
      <circle cx="190" cy="190" r="44" className="fill-background" />
      {/* boceto de figura */}
      <g className="stroke-primary" strokeWidth="3" fill="none" strokeLinecap="round">
        <ellipse cx="190" cy="168" rx="12" ry="15" />
        <path d="M190 183 L186 212 M172 196 L206 192 M186 212 L176 228 M186 212 L198 228" />
      </g>
      <polygon points="300,300 350,300 325,258" className="fill-coral" opacity="0.8" />
      <rect x="40" y="290" width="44" height="44" rx="6" className="fill-teal" opacity="0.8" transform="rotate(14 62 312)" />
      {/* pincel */}
      <g transform="rotate(35 330 110)">
        <rect x="320" y="40" width="12" height="110" rx="6" className="fill-primary" />
        <rect x="318" y="140" width="16" height="16" className="fill-sun" />
        <path d="M318 156 Q326 190 334 156 Z" className="fill-coral" />
      </g>
    </svg>
  );
}

function Index() {
  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="inline-block rounded-full bg-card px-4 py-1 text-sm font-semibold text-primary shadow-soft">Cuaderno digital de arte</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
              Explora el <span className="text-coral">color</span>. Comprende el <span className="text-primary">dibujo</span>. Crea sin límites.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Trazo & Color es un espacio para estudiantes de diseño, ilustradores principiantes y curiosos del arte. Aprende teoría del color, crea paletas armoniosas y domina los fundamentos de la anatomía con ejercicios prácticos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/laboratorio-del-color" className="btn btn-primary"><Palette className="h-5 w-5" /> Explorar colores</Link>
              <Link to="/anatomia" className="btn btn-outline"><PersonStanding className="h-5 w-5" /> Aprender anatomía</Link>
            </div>
          </div>
          <div className="flex justify-center"><HeroArt /></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-16">
        <h2 className="text-3xl font-bold">¿Qué quieres aprender hoy?</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(({ to, icon: Icon, title, text, tone }) => (
            <Link key={to} to={to} className="card-soft group p-6 transition-transform hover:-translate-y-1">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tone}`}><Icon className="h-6 w-6 text-primary" /></span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">Entrar →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
