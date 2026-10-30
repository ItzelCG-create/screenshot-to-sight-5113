import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro } from "@/components/SiteChrome";

export const Route = createFileRoute("/anatomia")({
  head: () => ({
    meta: [
      { title: "Anatomía para artistas — Trazo & Color" },
      { name: "description", content: "Fundamentos de anatomía artística: cabeza, torso, brazos, manos, piernas y figura completa con proporciones y formas básicas." },
      { property: "og:title", content: "Anatomía para artistas — Trazo & Color" },
      { property: "og:description", content: "Aprende proporciones, formas básicas y líneas de acción para dibujar la figura humana." },
    ],
  }),
  component: Anatomy,
});

const S = "stroke-primary";
const G = "stroke-coral";
const svgs: Record<string, React.ReactNode[]> = {
  cabeza: [
    <g key="a" fill="none" strokeWidth="2.5"><circle cx="100" cy="85" r="50" className={S} /><path d="M58 112 Q100 175 142 112" className={S} /><line x1="100" y1="35" x2="100" y2="160" className={G} strokeDasharray="4 4" /><line x1="50" y1="85" x2="150" y2="85" className={G} strokeDasharray="4 4" /></g>,
    <g key="b" fill="none" strokeWidth="2.5"><ellipse cx="100" cy="95" rx="45" ry="60" className={S} />{[55, 95, 120, 135].map((y) => <line key={y} x1="50" y1={y} x2="150" y2={y} className={G} strokeDasharray="4 4" />)}<ellipse cx="80" cy="95" rx="9" ry="5" className={S} /><ellipse cx="120" cy="95" rx="9" ry="5" className={S} /></g>,
    <g key="c" fill="none" strokeWidth="2.5"><path d="M70 50 Q130 30 140 90 Q140 140 105 150 L95 175 M70 50 Q55 90 75 130" className={S} /><path d="M140 95 L152 110 L140 115" className={S} /><circle cx="90" cy="95" r="12" className={G} /></g>,
  ],
  torso: [
    <g key="a" fill="none" strokeWidth="2.5"><ellipse cx="100" cy="70" rx="45" ry="35" className={S} /><rect x="70" y="120" width="60" height="40" rx="18" className={S} /><path d="M100 105 L100 120" className={G} /></g>,
    <g key="b" fill="none" strokeWidth="2.5"><path d="M55 40 L145 40 L120 110 L80 110 Z" className={S} /><path d="M75 125 L125 125 L135 165 L65 165 Z" className={S} /><line x1="100" y1="30" x2="100" y2="170" className={G} strokeDasharray="4 4" /></g>,
    <g key="c" fill="none" strokeWidth="2.5"><path d="M60 40 Q90 100 60 165" className={G} strokeWidth="4" /><path d="M50 45 L140 60 M70 160 L140 150" className={S} /><path d="M140 60 Q115 105 140 150" className={S} /></g>,
  ],
  brazos: [
    <g key="a" fill="none" strokeWidth="2.5"><circle cx="50" cy="40" r="14" className={S} /><path d="M58 50 L95 110 L150 140" className={S} strokeWidth="14" strokeLinecap="round" opacity="0.3" /><circle cx="95" cy="110" r="8" className={G} /><circle cx="150" cy="140" r="8" className={G} /></g>,
    <g key="b" fill="none" strokeWidth="2.5"><rect x="65" y="90" width="60" height="55" rx="14" className={S} />{[70, 85, 100, 115].map((x, i) => <path key={x} d={`M${x + 4} 90 L${x + 4} ${50 - (i === 1 || i === 2 ? 10 : 0)}`} className={S} strokeWidth="9" strokeLinecap="round" opacity="0.35" />)}<path d="M125 120 L150 95" className={S} strokeWidth="10" strokeLinecap="round" opacity="0.35" /></g>,
    <g key="c" fill="none" strokeWidth="2.5"><path d="M40 160 Q60 80 100 60 Q140 45 160 70" className={G} strokeWidth="4" /><circle cx="100" cy="60" r="6" className={S} /><circle cx="160" cy="70" r="6" className={S} /></g>,
  ],
  piernas: [
    <g key="a" fill="none" strokeWidth="2.5"><path d="M85 20 L80 95 L88 175" className={S} strokeWidth="18" strokeLinecap="round" opacity="0.3" /><circle cx="80" cy="95" r="9" className={G} /><path d="M88 175 L130 180" className={S} strokeWidth="10" strokeLinecap="round" /></g>,
    <g key="b" fill="none" strokeWidth="2.5"><path d="M50 150 L60 110 L95 120 L150 150 L150 165 L50 165 Z" className={S} /><path d="M60 110 L95 120 L80 165" className={G} /></g>,
    <g key="c" fill="none" strokeWidth="2.5"><path d="M70 30 Q55 100 75 175 M130 30 Q145 100 125 175" className={S} /><line x1="100" y1="20" x2="100" y2="180" className={G} strokeDasharray="4 4" /></g>,
  ],
  figura: [
    <g key="a" fill="none" strokeWidth="2.5">{Array.from({ length: 8 }).map((_, i) => <line key={i} x1="40" y1={10 + i * 22} x2="160" y2={10 + i * 22} className={G} strokeDasharray="3 5" />)}<circle cx="100" cy="21" r="11" className={S} /><path d="M100 32 L100 100 M75 50 L125 50 M75 50 L68 100 M125 50 L132 100 M100 100 L85 185 M100 100 L115 185" className={S} /></g>,
    <g key="b" fill="none" strokeWidth="2.5"><circle cx="70" cy="35" r="12" className={S} /><path d="M70 47 Q100 100 130 170" className={G} strokeWidth="4" /><path d="M80 70 L50 100 M80 70 L130 60 M110 120 L80 175 M110 120 L150 160" className={S} /></g>,
    <g key="c" fill="none" strokeWidth="2.5"><circle cx="100" cy="30" r="14" className={S} /><rect x="80" y="50" width="40" height="45" rx="10" className={S} /><rect x="83" y="100" width="34" height="22" rx="8" className={S} /><path d="M80 58 L60 110 M120 58 L140 110 M90 122 L85 185 M110 122 L115 185" className={S} strokeWidth="9" strokeLinecap="round" opacity="0.35" /></g>,
  ],
};

const cats = [
  { key: "cabeza", name: "Cabeza y rostro", cards: [
    { t: "Método Loomis", d: "Empieza con una esfera, corta los lados y añade la mandíbula. Las líneas guía marcan la dirección de la cara." },
    { t: "Proporciones del rostro", d: "Los ojos están a mitad de la cabeza. La nariz termina a mitad entre ojos y mentón; la boca, a un tercio bajo la nariz." },
    { t: "Vista de perfil", d: "El cráneo es más ancho que largo de perfil. La oreja se sitúa detrás de la línea media, entre cejas y nariz." },
  ]},
  { key: "torso", name: "Torso", cards: [
    { t: "Caja torácica y pelvis", d: "Simplifica el torso en dos masas: un óvalo para el tórax y una caja para la pelvis, unidas por la columna flexible." },
    { t: "Formas básicas", d: "El torso masculino suele leerse como trapecio invertido; el femenino, con caderas más anchas en relación al hombro." },
    { t: "Contrapposto", d: "Cuando el peso cae sobre una pierna, hombros y caderas se inclinan en direcciones opuestas, creando naturalidad." },
  ]},
  { key: "brazos", name: "Brazos y manos", cards: [
    { t: "Longitud del brazo", d: "Con el brazo relajado, el codo llega a la cintura y la muñeca a la altura de la ingle." },
    { t: "La mano en bloques", d: "Dibuja la palma como un bloque y los dedos como cilindros de tres segmentos. El dedo medio mide casi lo que la palma." },
    { t: "Ritmo del brazo", d: "Los músculos alternan curvas: convexo por fuera arriba, por dentro abajo. Evita contornos rectos y paralelos." },
  ]},
  { key: "piernas", name: "Piernas y pies", cards: [
    { t: "Articulaciones", d: "La rodilla está a mitad de la pierna. Marca cadera, rodilla y tobillo como esferas para articular el movimiento." },
    { t: "El pie como cuña", d: "Simplifica el pie en una cuña: talón, arco y dedos. Su largo equivale aproximadamente a la altura de la cabeza." },
    { t: "Curvas y peso", d: "El contorno de la pierna nunca es simétrico: la pantorrilla interior está más baja que la exterior." },
  ]},
  { key: "figura", name: "Figura completa", cards: [
    { t: "Canon de 8 cabezas", d: "Una figura idealizada mide 8 cabezas. La entrepierna cae en la mitad (4) y las rodillas cerca de la 6." },
    { t: "Línea de acción", d: "Antes de cualquier detalle, traza una curva que capture el gesto. Da energía y dirección a la pose." },
    { t: "Construcción", d: "Combina esferas, cajas y cilindros para levantar volumen. Después ajusta contornos y detalles." },
  ]},
];

const tips = [
  { t: "Proporciones", d: "Mide con la cabeza como unidad y compara tamaños entre partes." },
  { t: "Formas básicas", d: "Esferas, cilindros y cajas facilitan dibujar en 3D." },
  { t: "Líneas de acción", d: "Una curva en C o en S convierte una pose rígida en una viva." },
  { t: "Construcción", d: "Ve de lo general a lo particular: gesto, volumen, contorno, detalle." },
];

function Anatomy() {
  const [cat, setCat] = useState("cabeza");
  const c = cats.find((x) => x.key === cat)!;
  return (
    <>
      <PageIntro kicker="Dibujo de figura" title="Anatomía para artistas">
        Entiende el cuerpo humano a partir de formas simples. Elige una categoría para ver sus referencias y explicaciones.
      </PageIntro>
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorías de anatomía">
          {cats.map((x) => (
            <button key={x.key} role="tab" aria-selected={cat === x.key} onClick={() => setCat(x.key)}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold ${cat === x.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-lilac"}`}>
              {x.name}
            </button>
          ))}
        </div>
        <div role="tabpanel" aria-label={c.name} className="mt-8 grid gap-5 md:grid-cols-3">
          {c.cards.map((card, i) => (
            <article key={card.t} className="card-soft overflow-hidden">
              <div className="paper bg-muted p-4">
                <svg viewBox="0 0 200 200" className="mx-auto h-48 w-48" role="img" aria-label={`Ilustración de referencia: ${card.t}`}>{svgs[cat]?.[i]}</svg>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{card.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="text-3xl font-bold">Cuatro claves para dibujar figuras</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((t, i) => (
            <div key={t.t} className="rounded-2xl bg-accent p-5">
              <span className="font-display text-3xl font-extrabold text-coral">0{i + 1}</span>
              <p className="mt-2 font-semibold text-accent-foreground">{t.t}</p>
              <p className="text-sm text-accent-foreground/80">{t.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
