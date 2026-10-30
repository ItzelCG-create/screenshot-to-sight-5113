import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageIntro } from "@/components/SiteChrome";

export const Route = createFileRoute("/recursos")({
  head: () => ({
    meta: [
      { title: "Recursos — Trazo & Color" },
      { name: "description", content: "Consejos de dibujo, recomendaciones de color y ejercicios para principiantes organizados por categoría." },
      { property: "og:title", content: "Recursos — Trazo & Color" },
      { property: "og:description", content: "Materiales prácticos de dibujo y color para artistas principiantes." },
    ],
  }),
  component: Resources,
});

type R = { cat: string; title: string; summary: string; steps: string[] };
const resources: R[] = [
  { cat: "Dibujo", title: "Calienta la mano", summary: "Cinco minutos antes de dibujar mejoran tu trazo.", steps: ["Traza 20 líneas rectas de lado a lado de la hoja.", "Dibuja óvalos y espirales sin levantar el lápiz.", "Mueve el brazo desde el hombro, no solo la muñeca."] },
  { cat: "Dibujo", title: "Dibuja con valores", summary: "La luz y la sombra dan volumen.", steps: ["Haz una escala de 5 grises.", "Ilumina una esfera desde un lado.", "Identifica luz, medio tono, sombra propia y proyectada."] },
  { cat: "Dibujo", title: "Observa antes de trazar", summary: "Mira más al modelo que a tu hoja.", steps: ["Practica el dibujo de contorno ciego durante 3 minutos.", "Compara ángulos con el lápiz extendido.", "Busca los espacios negativos entre las formas."] },
  { cat: "Color", title: "Regla 60-30-10", summary: "Distribuye tus colores con equilibrio.", steps: ["60% para el color dominante.", "30% para el secundario.", "10% para un acento llamativo."] },
  { cat: "Color", title: "Controla la saturación", summary: "No todo tiene que ser intenso.", steps: ["Usa colores apagados para fondos.", "Reserva la máxima saturación para el punto focal.", "Mezcla con el complementario para desaturar en pintura."] },
  { cat: "Color", title: "Piensa en temperatura", summary: "Luz cálida, sombra fría (o viceversa).", steps: ["Elige la temperatura de la luz principal.", "Enfría o calienta las sombras en contraste.", "Mantén la coherencia en toda la escena."] },
  { cat: "Ejercicios", title: "Gestos de 30 segundos", summary: "Velocidad para captar movimiento.", steps: ["Busca fotos de poses.", "Dibuja cada una en 30 segundos.", "Repite 20 veces enfocando solo la línea de acción."] },
  { cat: "Ejercicios", title: "Estudio de color de 3 tonos", summary: "Simplifica una foto en tres colores.", steps: ["Elige una fotografía de paisaje.", "Reduce todo a tres manchas de color.", "Compara cuál paleta transmite mejor la atmósfera."] },
  { cat: "Ejercicios", title: "Cien cabezas", summary: "Un clásico para dominar el rostro.", steps: ["Dibuja 10 cabezas al día durante 10 días.", "Varía ángulos e iluminación.", "Usa el método Loomis como base."] },
];
const cats = ["Todos", "Dibujo", "Color", "Ejercicios"];
const tone: Record<string, string> = { Dibujo: "bg-secondary text-secondary-foreground", Color: "bg-accent text-accent-foreground", Ejercicios: "bg-teal/25 text-foreground" };

function Resources() {
  const [cat, setCat] = useState("Todos");
  const [open, setOpen] = useState<string | null>(null);
  const list = resources.filter((r) => cat === "Todos" || r.cat === cat);
  return (
    <>
      <PageIntro kicker="Biblioteca" title="Recursos">
        Consejos, recomendaciones y ejercicios breves para practicar a tu ritmo.
      </PageIntro>
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar categoría">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => {
            const isOpen = open === r.title;
            return (
              <article key={r.title} className="card-soft flex flex-col p-6">
                <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${tone[r.cat]}`}>{r.cat}</span>
                <h3 className="mt-3 text-lg font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.summary}</p>
                {isOpen && (
                  <ol id={`r-${r.title}`} className="mt-4 list-decimal space-y-1 pl-5 text-sm">
                    {r.steps.map((s) => <li key={s}>{s}</li>)}
                  </ol>
                )}
                <button onClick={() => setOpen(isOpen ? null : r.title)} aria-expanded={isOpen} aria-controls={`r-${r.title}`}
                  className="btn btn-outline mt-5 self-start text-sm">
                  {isOpen ? "Ocultar material" : "Ver material"} <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
