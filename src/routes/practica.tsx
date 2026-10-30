import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Shuffle } from "lucide-react";
import { PageIntro } from "@/components/SiteChrome";

export const Route = createFileRoute("/practica")({
  head: () => ({
    meta: [
      { title: "Práctica creativa — Trazo & Color" },
      { name: "description", content: "Cuestionario interactivo de teoría del color y retos creativos de paletas y dibujo." },
      { property: "og:title", content: "Práctica creativa — Trazo & Color" },
      { property: "og:description", content: "Pon a prueba tus conocimientos de color y acepta retos de dibujo." },
    ],
  }),
  component: Practice,
});

const quiz = [
  { q: "¿Cuáles son los colores primarios en el modelo tradicional de pintura?", o: ["Rojo, verde y azul", "Amarillo, rojo y azul", "Naranja, violeta y verde", "Blanco, negro y gris"], a: 1, e: "En el modelo RYB, usado en pintura, los primarios son amarillo, rojo y azul. RGB (rojo, verde, azul) se usa en pantallas." },
  { q: "¿Qué color es complementario del azul?", o: ["Verde", "Violeta", "Naranja", "Amarillo"], a: 2, e: "El naranja está justo enfrente del azul en la rueda cromática." },
  { q: "Una paleta con azul, azul verdoso y verde es…", o: ["Análoga", "Triádica", "Complementaria", "Monocromática"], a: 0, e: "Son colores vecinos en la rueda: eso define una armonía análoga." },
  { q: "¿Cuál de estos es un color terciario?", o: ["Verde", "Rojo", "Rojo anaranjado", "Naranja"], a: 2, e: "Los terciarios combinan un primario con un secundario vecino: rojo + naranja." },
  { q: "Los colores cálidos suelen percibirse como…", o: ["Más lejanos", "Que avanzan hacia el espectador", "Siempre oscuros", "Neutros"], a: 1, e: "Los cálidos parecen acercarse; los fríos tienden a alejarse, creando profundidad." },
  { q: "¿Cuántos grados separan los colores de una armonía triádica?", o: ["30°", "90°", "120°", "180°"], a: 2, e: "Tres colores repartidos en 360° quedan separados 120° entre sí." },
];

const challenges = [
  "Pinta un paisaje usando solo una paleta análoga de tres colores.",
  "Dibuja 10 poses de 1 minuto marcando únicamente la línea de acción.",
  "Crea una ilustración monocromática con cinco valores de un solo tono.",
  "Dibuja tu mano en tres posiciones diferentes usando bloques y cilindros.",
  "Diseña un póster con una armonía complementaria: 70% un color, 30% su opuesto.",
  "Dibuja una cabeza con el método Loomis en vista frontal, perfil y tres cuartos.",
  "Rediseña un objeto cotidiano con una paleta triádica.",
  "Haz un retrato usando solo colores fríos y luego repítelo con cálidos.",
];

function Quiz() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = quiz[i];

  const reset = () => { setI(0); setPick(null); setChecked(false); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / quiz.length) * 100);
    return (
      <div className="text-center" aria-live="polite">
        <p className="font-display text-6xl font-extrabold text-primary">{score}/{quiz.length}</p>
        <p className="mt-3 text-lg font-semibold">{pct >= 80 ? "¡Excelente! Dominas la teoría del color." : pct >= 50 ? "¡Buen trabajo! Repasa algunas armonías." : "Sigue practicando: visita el laboratorio del color."}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn btn-primary"><RotateCcw className="h-4 w-4" /> Intentar de nuevo</button>
          <Link to="/laboratorio-del-color" className="btn btn-outline">Repasar teoría</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Pregunta {i + 1} de {quiz.length}</span><span>Aciertos: {score}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary transition-all" style={{ width: `${(i / quiz.length) * 100}%` }} /></div>
      <h3 className="mt-6 text-xl font-semibold">{q.q}</h3>
      <div className="mt-4 grid gap-3" role="radiogroup" aria-label="Opciones">
        {q.o.map((opt, k) => {
          const state = checked ? (k === q.a ? "border-success bg-success/10" : k === pick ? "border-destructive bg-destructive/10" : "border-border") : pick === k ? "border-primary bg-secondary" : "border-border hover:bg-muted";
          return (
            <button key={opt} role="radio" aria-checked={pick === k} disabled={checked} onClick={() => setPick(k)}
              className={`flex min-h-12 items-center justify-between rounded-2xl border-2 px-4 py-3 text-left font-medium ${state}`}>
              {opt}
              {checked && k === q.a && <CheckCircle2 className="h-5 w-5 text-success" />}
              {checked && k === pick && k !== q.a && <XCircle className="h-5 w-5 text-destructive" />}
            </button>
          );
        })}
      </div>
      {checked && (
        <p className={`mt-4 rounded-2xl p-4 text-sm ${pick === q.a ? "bg-success/10" : "bg-destructive/10"}`} aria-live="polite">
          <strong>{pick === q.a ? "¡Correcto! " : "Incorrecto. "}</strong>{q.e}
        </p>
      )}
      <div className="mt-6">
        {!checked ? (
          <button className="btn btn-primary disabled:opacity-50" disabled={pick === null} onClick={() => { setChecked(true); if (pick === q.a) setScore((s) => s + 1); }}>Comprobar</button>
        ) : (
          <button className="btn btn-primary" onClick={() => { if (i + 1 >= quiz.length) setDone(true); else { setI(i + 1); setPick(null); setChecked(false); } }}>
            {i + 1 >= quiz.length ? "Ver resultado" : "Siguiente pregunta"}
          </button>
        )}
      </div>
    </div>
  );
}

function Practice() {
  const [c, setC] = useState(0);
  const [doneSet, setDoneSet] = useState<number[]>([]);
  return (
    <>
      <PageIntro kicker="Aprende haciendo" title="Práctica creativa">
        Comprueba lo que sabes con el cuestionario y elige un reto para llevar la teoría a tu cuaderno.
      </PageIntro>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-5">
        <div className="card-soft p-6 md:p-8 lg:col-span-3">
          <h2 className="mb-6 text-2xl font-bold">Cuestionario de teoría del color</h2>
          <Quiz />
        </div>
        <div className="lg:col-span-2">
          <div className="card-soft bg-accent p-6">
            <h2 className="text-2xl font-bold text-accent-foreground">Reto del día</h2>
            <p className="mt-4 min-h-16 text-lg text-accent-foreground" aria-live="polite">{challenges[c]}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="btn btn-primary" onClick={() => setC((x) => (x + 1 + Math.floor(Math.random() * (challenges.length - 1))) % challenges.length)}><Shuffle className="h-4 w-4" /> Otro reto</button>
            </div>
          </div>
          <h3 className="mt-8 text-lg font-semibold">Todos los retos</h3>
          <ul className="mt-3 grid gap-2">
            {challenges.map((ch, k) => (
              <li key={ch}>
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-muted p-3 text-sm">
                  <input type="checkbox" className="mt-0.5 h-5 w-5 accent-primary" checked={doneSet.includes(k)} onChange={() => setDoneSet((d) => d.includes(k) ? d.filter((x) => x !== k) : [...d, k])} />
                  <span className={doneSet.includes(k) ? "line-through opacity-60" : ""}>{ch}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">Completados: {doneSet.length} de {challenges.length}</p>
        </div>
      </section>
    </>
  );
}
