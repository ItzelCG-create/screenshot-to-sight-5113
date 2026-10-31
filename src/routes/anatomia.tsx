import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Lightbulb, PencilLine } from "lucide-react";
import { PageIntro } from "@/components/SiteChrome";

export const Route = createFileRoute("/anatomia")({
  head: () => ({
    meta: [
      { title: "Anatomía para artistas — Trazo & Color" },
      { name: "description", content: "Biblioteca visual de anatomía artística: rostro, torso, manos, pies y figura completa con láminas de proporciones y construcción." },
      { property: "og:title", content: "Anatomía para artistas — Trazo & Color" },
      { property: "og:description", content: "Láminas de estudio para aprender a dibujar la figura humana paso a paso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Anatomy,
});

const S = "stroke-primary";
const G = "stroke-coral";
const T = "stroke-teal";
const guide = { strokeDasharray: "4 4", strokeWidth: 1.5 } as const;
const Label = ({ x, y, children }: { x: number; y: number; children: string }) => (
  <text x={x} y={y} className="fill-muted-foreground" fontSize="9" fontFamily="sans-serif">{children}</text>
);

type Plate = { t: string; tag: string; d: string; tip: string; art: React.ReactNode };
type Cat = { key: string; name: string; intro: string; focus: string[]; cover: React.ReactNode; plates: Plate[] };

const cats: Cat[] = [
  {
    key: "rostro", name: "Rostro",
    intro: "La cabeza se construye a partir de una esfera y un plano para la mandíbula. Dominar sus divisiones te permite dibujar cualquier rostro desde cualquier ángulo.",
    focus: ["Método Loomis", "Línea de ojos a la mitad", "Tres tercios del rostro"],
    cover: <g fill="none" strokeWidth="3"><circle cx="50" cy="44" r="26" className={S} /><path d="M28 58 Q50 92 72 58" className={S} /><line x1="50" y1="18" x2="50" y2="86" className={G} strokeWidth="1.5" strokeDasharray="3 3" /></g>,
    plates: [
      { t: "Método Loomis", tag: "Construcción", d: "Dibuja una esfera, corta un disco a cada lado y añade la mandíbula. La cruz marca hacia dónde mira la cara.", tip: "Practica 10 esferas girándolas en distintas direcciones.",
        art: <g fill="none" strokeWidth="2.5"><circle cx="100" cy="80" r="50" className={S} /><ellipse cx="128" cy="80" rx="14" ry="38" className={T} strokeWidth="1.5" /><path d="M60 110 Q72 165 100 172 Q128 165 140 110" className={S} /><line x1="100" y1="30" x2="100" y2="172" className={G} {...guide} /><line x1="50" y1="80" x2="150" y2="80" className={G} {...guide} /><Label x={152} y={83}>cejas</Label></g> },
      { t: "Proporciones frontales", tag: "Proporción", d: "Los ojos están a la mitad de la cabeza; entre ellos cabe un ojo. La nariz llega a la mitad entre ojos y mentón.", tip: "Mide con el ancho de un ojo como unidad.",
        art: <g fill="none" strokeWidth="2.5"><ellipse cx="100" cy="98" rx="48" ry="64" className={S} />{[{ y: 50, l: "cabello" }, { y: 98, l: "ojos" }, { y: 128, l: "nariz" }, { y: 143, l: "boca" }].map((g) => <g key={g.y}><line x1="46" y1={g.y} x2="154" y2={g.y} className={G} {...guide} /><Label x={156} y={g.y + 3}>{g.l}</Label></g>)}<path d="M70 98 Q80 91 90 98 Q80 104 70 98 M110 98 Q120 91 130 98 Q120 104 110 98" className={S} strokeWidth="2" /><path d="M96 112 L93 127 L107 127" className={S} strokeWidth="2" /><path d="M86 143 Q100 150 114 143" className={S} strokeWidth="2" /></g> },
      { t: "Vista de perfil", tag: "Ángulo", d: "De perfil el cráneo es casi tan ancho como alto. La oreja va detrás de la línea media, entre la ceja y la base de la nariz.", tip: "Copia perfiles de fotos marcando solo la silueta.",
        art: <g fill="none" strokeWidth="2.5"><path d="M68 48 Q120 22 145 70 L146 92 L158 112 L146 118 L148 132 Q146 142 136 142 L134 156 Q120 170 100 166 L88 182" className={S} /><path d="M68 48 Q48 85 70 130 L88 182" className={S} /><ellipse cx="96" cy="104" rx="9" ry="15" className={G} /><line x1="100" y1="30" x2="100" y2="180" className={T} {...guide} /><Label x={60} y={196}>oreja tras la línea media</Label></g> },
    ],
  },
  {
    key: "torso", name: "Torso",
    intro: "El torso se resume en dos grandes masas, la caja torácica y la pelvis, unidas por la columna. Su inclinación define la pose de toda la figura.",
    focus: ["Dos masas", "Columna flexible", "Contrapposto"],
    cover: <g fill="none" strokeWidth="3"><ellipse cx="50" cy="34" rx="22" ry="18" className={S} /><rect x="34" y="62" width="32" height="22" rx="9" className={S} /><path d="M50 52 Q46 58 50 62" className={G} /></g>,
    plates: [
      { t: "Caja torácica y pelvis", tag: "Construcción", d: "Un óvalo para el tórax y una caja para la pelvis. Entre ambas queda el abdomen, la zona que se dobla y gira.", tip: "Dibuja las dos masas en 20 poses distintas.",
        art: <g fill="none" strokeWidth="2.5"><ellipse cx="100" cy="68" rx="46" ry="38" className={S} /><path d="M70 130 L130 130 L138 165 L62 165 Z" className={S} /><path d="M100 30 Q94 100 100 165" className={G} strokeWidth="3" /><Label x={150} y={70}>tórax</Label><Label x={142} y={150}>pelvis</Label><Label x={106} y={120}>columna</Label></g> },
      { t: "Anchos y planos", tag: "Proporción", d: "Los hombros miden unas dos cabezas de ancho. Divide el torso en planos frontal y laterales para darle volumen.", tip: "Sombrea solo los planos laterales con un gris.",
        art: <g fill="none" strokeWidth="2.5"><path d="M50 42 L150 42 L128 112 L72 112 Z" className={S} /><path d="M72 112 L128 112 L136 162 L64 162 Z" className={S} /><path d="M70 42 L84 112 M130 42 L116 112" className={T} {...guide} /><line x1="50" y1="30" x2="150" y2="30" className={G} strokeWidth="1.5" /><Label x={78} y={24}>≈ 2 cabezas</Label></g> },
      { t: "Contrapposto", tag: "Movimiento", d: "Con el peso en una pierna, la cadera sube de ese lado y los hombros bajan. Las líneas se inclinan en sentidos opuestos.", tip: "Observa a alguien de pie esperando: casi siempre lo hace.",
        art: <g fill="none" strokeWidth="2.5"><circle cx="100" cy="28" r="14" className={S} /><line x1="58" y1="58" x2="142" y2="70" className={G} strokeWidth="3" /><line x1="68" y1="128" x2="132" y2="114" className={G} strokeWidth="3" /><path d="M100 42 Q90 90 100 122 M128 116 L118 185 M72 126 L66 185" className={S} /><Label x={144} y={74}>hombros</Label><Label x={136} y={112}>cadera</Label></g> },
    ],
  },
  {
    key: "manos", name: "Manos",
    intro: "La mano parece compleja, pero se entiende como una palma en bloque y dedos en cilindros. Fíjate en los arcos que forman los nudillos.",
    focus: ["Palma como bloque", "Dedos en 3 segmentos", "Arco de nudillos"],
    cover: <g fill="none" strokeWidth="3"><rect x="32" y="50" width="34" height="32" rx="7" className={S} />{[36, 45, 54, 63].map((x, i) => <line key={x} x1={x} y1="50" x2={x} y2={i === 1 || i === 2 ? 18 : 26} className={S} strokeLinecap="round" />)}<line x1="66" y1="68" x2="80" y2="54" className={S} strokeLinecap="round" /></g>,
    plates: [
      { t: "La mano en bloques", tag: "Construcción", d: "La palma es un bloque ligeramente trapezoidal. Cada dedo tiene tres falanges que se acortan hacia la punta.", tip: "Dibuja tu propia mano en bloques antes de detallarla.",
        art: <g fill="none" strokeWidth="2.5"><rect x="60" y="100" width="70" height="70" rx="12" className={S} />{[{ x: 68, h: 52 }, { x: 86, h: 62 }, { x: 104, h: 58 }, { x: 122, h: 44 }].map((f) => <g key={f.x}><rect x={f.x - 7} y={100 - f.h} width="14" height={f.h} rx="7" className={S} /><line x1={f.x - 7} y1={100 - f.h / 2} x2={f.x + 7} y2={100 - f.h / 2} className={G} strokeWidth="1.5" /><line x1={f.x - 7} y1={100 - f.h * 0.8} x2={f.x + 7} y2={100 - f.h * 0.8} className={G} strokeWidth="1.5" /></g>)}<path d="M60 140 L36 116 L28 98" className={S} strokeWidth="12" strokeLinecap="round" opacity="0.35" /></g> },
      { t: "Proporciones", tag: "Proporción", d: "El dedo medio mide casi lo mismo que la palma. La mano completa cubre el rostro desde el mentón hasta la frente.", tip: "Compara: coloca tu mano sobre tu cara frente al espejo.",
        art: <g fill="none" strokeWidth="2.5"><rect x="70" y="100" width="56" height="70" rx="10" className={S} /><rect x="91" y="34" width="14" height="66" rx="7" className={S} /><line x1="140" y1="34" x2="140" y2="100" className={G} strokeWidth="2" /><line x1="140" y1="100" x2="140" y2="170" className={T} strokeWidth="2" /><Label x={146} y={70}>dedo</Label><Label x={146} y={138}>palma</Label><Label x={146} y={150}>≈ igual</Label></g> },
      { t: "Arco de los nudillos", tag: "Ritmo", d: "Los nudillos no forman una línea recta, sino un arco. Al cerrar la mano ese arco se acentúa.", tip: "Traza primero el arco y luego coloca los dedos sobre él.",
        art: <g fill="none" strokeWidth="2.5"><path d="M50 110 Q100 70 150 110" className={G} strokeWidth="3" />{[60, 85, 112, 138].map((x, i) => <circle key={x} cx={x} cy={[100, 86, 86, 100][i]} r="7" className={S} />)}<path d="M48 112 L60 175 L140 175 L152 112" className={S} /><Label x={74} y={64}>arco, no recta</Label></g> },
    ],
  },
  {
    key: "pies", name: "Pies",
    intro: "El pie es una cuña que soporta todo el peso. Piensa en talón, arco y dedos como tres partes que se apoyan en el suelo de forma distinta.",
    focus: ["Forma de cuña", "Arco interior", "Tobillos asimétricos"],
    cover: <g fill="none" strokeWidth="3"><path d="M18 78 L30 40 L52 50 L84 72 L84 82 L18 82 Z" className={S} /><path d="M30 40 L52 50 L42 82" className={G} strokeWidth="1.5" /></g>,
    plates: [
      { t: "El pie como cuña", tag: "Construcción", d: "De lado, el pie es una cuña: alto en el tobillo y bajo en los dedos. Su largo equivale aproximadamente a una cabeza.", tip: "Dibuja zapatos: tienen la misma estructura.",
        art: <g fill="none" strokeWidth="2.5"><path d="M40 160 L56 90 L96 104 L160 146 L160 166 L40 166 Z" className={S} /><path d="M56 90 L96 104 L76 166" className={G} /><line x1="40" y1="182" x2="160" y2="182" className={T} strokeWidth="2" /><Label x={80} y={196}>≈ 1 cabeza</Label></g> },
      { t: "Arco y apoyos", tag: "Estructura", d: "El pie toca el suelo en el talón, el borde exterior y la base de los dedos. El lado interior se eleva formando el arco.", tip: "Marca los tres puntos de apoyo antes del contorno.",
        art: <g fill="none" strokeWidth="2.5"><path d="M30 150 Q60 152 80 130 Q110 110 150 140 L172 148 L172 156 L30 158 Z" className={S} />{[[40, 156], [110, 156], [165, 156]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="6" className={G} />)}<line x1="20" y1="162" x2="185" y2="162" className={T} strokeWidth="1.5" /><Label x={86} y={108}>arco</Label></g> },
      { t: "Vista frontal y tobillos", tag: "Detalle", d: "El tobillo interior está más alto que el exterior. De frente, el pie se ensancha hacia los dedos.", tip: "Une ambos tobillos con una línea inclinada.",
        art: <g fill="none" strokeWidth="2.5"><path d="M80 30 L76 120 Q60 150 58 175 L142 175 Q140 150 124 120 L120 30" className={S} /><circle cx="78" cy="110" r="6" className={G} /><circle cx="122" cy="122" r="6" className={G} /><line x1="70" y1="106" x2="130" y2="126" className={T} {...guide} /><Label x={20} y={108}>interior</Label><Label x={132} y={124}>exterior</Label></g> },
    ],
  },
  {
    key: "figura", name: "Figura completa",
    intro: "Une todas las partes con proporción y gesto. Empieza siempre por la línea de acción y el canon; los detalles llegan al final.",
    focus: ["Canon de 8 cabezas", "Línea de acción", "Maniquí de formas"],
    cover: <g fill="none" strokeWidth="3"><circle cx="50" cy="16" r="9" className={S} /><path d="M50 25 L50 58 M34 36 L66 36 M50 58 L38 88 M50 58 L62 88" className={S} strokeLinecap="round" /></g>,
    plates: [
      { t: "Canon de 8 cabezas", tag: "Proporción", d: "La figura ideal mide 8 cabezas. La entrepierna cae en la cuarta y las rodillas cerca de la sexta.", tip: "Divide tu hoja en 8 antes de dibujar.",
        art: <g fill="none" strokeWidth="2.5">{Array.from({ length: 9 }).map((_, i) => <g key={i}><line x1="50" y1={10 + i * 22} x2="150" y2={10 + i * 22} className={G} strokeDasharray="3 5" strokeWidth="1" /><Label x={158} y={14 + i * 22}>{String(i)}</Label></g>)}<circle cx="100" cy="21" r="11" className={S} /><path d="M100 32 L100 98 M76 48 L124 48 M76 48 L70 104 M124 48 L130 104 M100 98 L88 186 M100 98 L112 186" className={S} /></g> },
      { t: "Línea de acción", tag: "Gesto", d: "Una curva en C o en S resume el movimiento de la pose. Da energía antes de cualquier detalle.", tip: "Haz gestos de 30 segundos solo con esa curva.",
        art: <g fill="none" strokeWidth="2.5"><circle cx="72" cy="30" r="12" className={S} /><path d="M72 42 Q110 100 128 178" className={G} strokeWidth="4" /><path d="M84 66 L52 96 M84 66 L136 54 M112 118 L80 176 M112 118 L152 162" className={S} /><Label x={130} y={110}>curva en C</Label></g> },
      { t: "Maniquí de formas", tag: "Construcción", d: "Esferas para articulaciones, cilindros para extremidades y cajas para tórax y pelvis. Así piensas en 3D.", tip: "Dibuja un maniquí sobre una foto de referencia.",
        art: <g fill="none" strokeWidth="2.5"><circle cx="100" cy="26" r="13" className={S} /><rect x="80" y="46" width="40" height="44" rx="10" className={S} /><rect x="83" y="96" width="34" height="22" rx="8" className={S} />{[[78, 52], [122, 52], [90, 120], [110, 120]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5" className={G} />)}<path d="M78 56 L62 108 M122 56 L138 108 M90 124 L85 186 M110 124 L115 186" className={S} strokeWidth="9" strokeLinecap="round" opacity="0.35" /></g> },
    ],
  },
];

function Anatomy() {
  const [key, setKey] = useState("rostro");
  const c = cats.find((x) => x.key === key)!;
  return (
    <>
      <PageIntro kicker="Biblioteca visual de estudio" title="Anatomía para artistas">
        Láminas de referencia para entender el cuerpo humano a partir de formas simples. Elige una categoría para consultar sus estudios.
      </PageIntro>

      <section className="mx-auto max-w-6xl px-5 py-8" aria-labelledby="cat-heading">
        <h2 id="cat-heading" className="sr-only">Categorías</h2>
        <div role="tablist" aria-label="Categorías de anatomía" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {cats.map((x) => {
            const active = x.key === key;
            return (
              <button key={x.key} role="tab" aria-selected={active} aria-controls="anat-panel" onClick={() => setKey(x.key)}
                className={`card-soft group flex flex-col items-center gap-2 p-4 text-center transition ${active ? "ring-2 ring-primary bg-secondary" : "hover:-translate-y-0.5"}`}>
                <svg viewBox="0 0 100 100" className="h-16 w-16" aria-hidden="true">{x.cover}</svg>
                <span className="font-display font-semibold">{x.name}</span>
                <span className="text-xs text-muted-foreground">{x.plates.length} láminas</span>
              </button>
            );
          })}
        </div>
      </section>

      <section id="anat-panel" role="tabpanel" aria-label={c.name} className="mx-auto max-w-6xl px-5 pb-12">
        <div className="card-soft paper grid gap-6 p-6 md:grid-cols-[2fr_1fr] md:p-8">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-coral"><BookOpen className="h-4 w-4" /> Categoría</p>
            <h2 className="mt-1 text-3xl font-bold">{c.name}</h2>
            <p className="mt-3 text-muted-foreground">{c.intro}</p>
          </div>
          <div className="rounded-2xl bg-card p-5">
            <p className="text-sm font-semibold">Qué estudiarás</p>
            <ul className="mt-2 space-y-2 text-sm">
              {c.focus.map((f) => <li key={f} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-coral" />{f}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {c.plates.map((p, i) => (
            <article key={p.t} className="card-soft flex flex-col overflow-hidden">
              <div className="paper relative bg-muted p-4">
                <span className="absolute left-3 top-3 rounded-full bg-card px-2.5 py-0.5 text-xs font-semibold text-primary">Lámina {i + 1}</span>
                <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{p.tag}</span>
                <svg viewBox="0 0 200 200" className="mx-auto mt-4 h-52 w-52" role="img" aria-label={`Ilustración de referencia: ${p.t}`}>{p.art}</svg>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.d}</p>
                <p className="mt-4 flex gap-2 rounded-xl bg-secondary p-3 text-sm text-secondary-foreground">
                  <PencilLine className="mt-0.5 h-4 w-4 shrink-0" /> <span><strong>Ejercicio:</strong> {p.tip}</span>
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Lightbulb className="h-4 w-4 text-coral" /> Las líneas coral marcan guías de proporción; las turquesa, medidas y ejes.
        </p>
      </section>
    </>
  );
}
