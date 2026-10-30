import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Copy, Flame, Snowflake } from "lucide-react";
import { ColorWheel, wheel } from "@/components/ColorWheel";
import { PageIntro, useCopy } from "@/components/SiteChrome";
import { generatePalette, harmonies, readableText, type HarmonyKey } from "@/lib/color";

export const Route = createFileRoute("/laboratorio-del-color")({
  head: () => ({
    meta: [
      { title: "Laboratorio del color — Trazo & Color" },
      { name: "description", content: "Rueda cromática interactiva, colores primarios, secundarios y terciarios, y generador de paletas con códigos HEX." },
      { property: "og:title", content: "Laboratorio del color — Trazo & Color" },
      { property: "og:description", content: "Explora la rueda cromática y genera paletas armoniosas copiando sus códigos HEX." },
    ],
  }),
  component: ColorLab,
});

const types = [
  { key: "Primario", title: "Primarios", text: "Amarillo, rojo y azul. No se obtienen mezclando otros colores: son la base de todos los demás." },
  { key: "Secundario", title: "Secundarios", text: "Naranja, violeta y verde. Surgen al mezclar dos primarios en partes iguales." },
  { key: "Terciario", title: "Terciarios", text: "Mezcla de un primario con un secundario vecino, como rojo anaranjado o azul verdoso." },
];

const examples = [
  { name: "Complementarios", idx: [4, 10], text: "Opuestos en la rueda: rojo y verde." },
  { name: "Análogos", idx: [8, 9, 10], text: "Vecinos en la rueda: azul, azul verdoso y verde." },
  { name: "Triádicos", idx: [0, 4, 8], text: "Equidistantes: amarillo, rojo y azul." },
];

function Swatch({ hex, copied, onCopy }: { hex: string; copied: boolean; onCopy: () => void }) {
  const dark = readableText(hex) === "dark";
  return (
    <div className="card-soft overflow-hidden">
      <div className="h-28" style={{ backgroundColor: hex }} />
      <div className="flex items-center justify-between gap-2 p-3">
        <code className="font-mono text-sm font-semibold">{hex}</code>
        <button
          onClick={onCopy}
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
          aria-label={`Copiar código ${hex}`}
          data-dark={dark}
        >
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

type WheelHarmony = { key: string; name: string; offsets: number[]; why: (n: string[]) => string };
const wheelHarmonies: WheelHarmony[] = [
  { key: "comp", name: "Complementaria", offsets: [0, 6], why: (n) => `${n[0]} y ${n[1]} están en lados opuestos de la rueda (180°). Al ponerse juntos se intensifican mutuamente, creando el máximo contraste.` },
  { key: "ana", name: "Análoga", offsets: [-1, 0, 1], why: (n) => `${n[0]}, ${n[1]} y ${n[2]} son vecinos en la rueda (30° entre cada uno). Comparten pigmentos, por eso se ven naturales y armoniosos juntos.` },
  { key: "tri", name: "Triádica", offsets: [0, 4, 8], why: (n) => `${n[0]}, ${n[1]} y ${n[2]} forman un triángulo equilátero (120°). Ofrecen variedad y equilibrio; usa uno como dominante y los otros como acento.` },
  { key: "div", name: "Complementaria dividida", offsets: [0, 5, 7], why: (n) => `En lugar del opuesto exacto de ${n[0]}, se usan sus dos vecinos: ${n[1]} y ${n[2]}. Mantiene el contraste pero con menos tensión.` },
  { key: "tet", name: "Tetrádica", offsets: [0, 3, 6, 9], why: (n) => `${n.join(", ")} forman un cuadrado (90°): dos parejas de complementarios. Es una paleta rica; equilibra cálidos y fríos.` },
];

function ColorLab() {
  const [sel, setSel] = useState(4);
  const [wh, setWh] = useState("comp");
  const [base, setBase] = useState("#8A5CF6");
  const [harmony, setHarmony] = useState<HarmonyKey>("complementaria");
  const { copied, copy } = useCopy();
  const palette = generatePalette(base, harmony);
  const current = harmonies.find((h) => h.key === harmony)!;
  const w = wheelHarmonies.find((h) => h.key === wh)!;
  const idx = w.offsets.map((o) => (sel + o + 12) % 12);
  const related = idx.map((i) => wheel[i]!);
  const color = wheel[sel]!;

  return (
    <>
      <PageIntro kicker="Teoría del color" title="Laboratorio del color">
        Descubre cómo se relacionan los colores, por qué algunas combinaciones funcionan y crea tus propias paletas.
      </PageIntro>

      <section className="mx-auto max-w-6xl px-5 py-8" aria-labelledby="rueda">
        <div className="card-soft paper overflow-hidden p-5 md:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="mx-auto w-full max-w-[min(100%,460px)] text-foreground">
              <ColorWheel selected={sel} onSelect={setSel} highlight={idx} />
              <div className="mt-4 flex items-center justify-center gap-3">
                <button onClick={() => setSel((sel + 11) % 12)} className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-secondary-foreground" aria-label="Color anterior"><ChevronLeft /></button>
                <p className="min-w-40 text-center text-sm text-muted-foreground">Toca la rueda o usa las flechas</p>
                <button onClick={() => setSel((sel + 1) % 12)} className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-secondary-foreground" aria-label="Color siguiente"><ChevronRight /></button>
              </div>
            </div>

            <div>
              <h2 id="rueda" className="text-3xl font-bold md:text-4xl">La rueda cromática</h2>
              <div className="mt-4 flex items-center gap-4">
                <span className="h-14 w-14 shrink-0 rounded-2xl shadow-soft" style={{ backgroundColor: color.hex }} />
                <div>
                  <p className="text-xl font-semibold">{color.name}</p>
                  <p className="text-sm text-muted-foreground">Color {color.type.toLowerCase()} · <code className="font-mono">{color.hex}</code></p>
                </div>
              </div>

              <p className="mt-6 text-sm font-semibold">Elige una armonía</p>
              <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Armonía cromática">
                {wheelHarmonies.map((h) => (
                  <button key={h.key} onClick={() => setWh(h.key)} aria-pressed={wh === h.key}
                    className={`min-h-11 rounded-full px-4 text-sm font-medium transition-colors ${wh === h.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-lilac"}`}>
                    {h.name}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-live="polite">
                {related.map((c) => (
                  <div key={c.hex} className="overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="h-16" style={{ backgroundColor: c.hex }} />
                    <div className="p-2">
                      <p className="truncate text-xs font-medium" title={c.name}>{c.name}</p>
                      <button onClick={() => copy(c.hex)} className="mt-1 flex min-h-9 w-full items-center justify-between rounded-lg px-1 font-mono text-xs font-semibold hover:bg-secondary" aria-label={`Copiar código ${c.hex}`}>
                        {c.hex} {copied === c.hex ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-muted p-4 text-sm">
                <p className="font-semibold">¿Por qué se relacionan?</p>
                <p className="mt-1 text-muted-foreground">{w.why(related.map((c) => c.name.toLowerCase()))}</p>
              </div>
              <button onClick={() => setBase(color.hex)} className="btn btn-outline mt-5 text-sm">Usar {color.name.toLowerCase()} en el generador</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6">
        <div className="grid gap-4 md:grid-cols-3">
          {types.map((t) => (
            <div key={t.key} className="card-soft p-5">
              <div className="flex gap-1.5">
                {wheel.map((c, i) => c.type === t.key && (
                  <button key={c.hex} onClick={() => setSel(i)} className="h-8 w-8 rounded-full border-2 border-card shadow-soft" style={{ backgroundColor: c.hex }} aria-label={`Seleccionar ${c.name}`} />
                ))}
              </div>
              <p className="mt-3 font-semibold">{t.title}</p>
              <p className="text-sm text-muted-foreground">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="text-3xl font-bold">Armonías de ejemplo</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {examples.map((e) => (
            <div key={e.name} className="card-soft p-5">
              <div className="flex h-16 overflow-hidden rounded-xl">
                {e.idx.map((i) => <span key={i} className="flex-1" style={{ backgroundColor: wheel[i]!.hex }} />)}
              </div>
              <p className="mt-3 font-semibold">{e.name}</p>
              <p className="text-sm text-muted-foreground">{e.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="card-soft p-5">
            <p className="flex items-center gap-2 font-semibold"><Flame className="h-5 w-5 text-coral" /> Colores cálidos</p>
            <div className="mt-3 flex h-10 overflow-hidden rounded-xl">{[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className="flex-1" style={{ backgroundColor: wheel[i]!.hex }} />)}</div>
            <p className="mt-3 text-sm text-muted-foreground">Rojos, naranjas y amarillos. Transmiten energía y cercanía, y parecen avanzar hacia el espectador.</p>
          </div>
          <div className="card-soft p-5">
            <p className="flex items-center gap-2 font-semibold"><Snowflake className="h-5 w-5 text-teal" /> Colores fríos</p>
            <div className="mt-3 flex h-10 overflow-hidden rounded-xl">{[6, 7, 8, 9, 10, 11].map((i) => <span key={i} className="flex-1" style={{ backgroundColor: wheel[i]!.hex }} />)}</div>
            <p className="mt-3 text-sm text-muted-foreground">Azules, verdes y violetas. Evocan calma y distancia; ayudan a crear profundidad.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10" aria-labelledby="generador">
        <div className="card-soft p-6 md:p-8">
          <h2 id="generador" className="text-3xl font-bold">Generador de paletas</h2>
          <div className="mt-6 flex flex-wrap items-end gap-5">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Color base
              <span className="flex items-center gap-3">
                <input type="color" value={base} onChange={(e) => setBase(e.target.value.toUpperCase())} className="h-12 w-16 cursor-pointer rounded-xl border border-border bg-card" aria-label="Elegir color base" />
                <code className="font-mono">{base.toUpperCase()}</code>
              </span>
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Tipo de armonía">
              {harmonies.map((h) => (
                <button key={h.key} onClick={() => setHarmony(h.key)} aria-pressed={harmony === h.key}
                  className={`min-h-11 rounded-full px-4 text-sm font-medium ${harmony === h.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {h.name}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-5 rounded-2xl bg-muted p-4 text-sm"><strong>{current.name}:</strong> {current.desc}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {palette.map((hex, i) => <Swatch key={i + hex} hex={hex} copied={copied === hex} onCopy={() => copy(hex)} />)}
          </div>
          <button onClick={() => copy(palette.join(", "))} className="btn btn-primary mt-6">
            {copied === palette.join(", ") ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copiar toda la paleta
          </button>
          <p className="sr-only" aria-live="polite">{copied ? `Copiado: ${copied}` : ""}</p>
        </div>
      </section>
    </>
  );
}
