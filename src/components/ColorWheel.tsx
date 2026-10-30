// Rueda RYB de 12 segmentos (tradicional en artes)
export const wheel = [
  { name: "Amarillo", hex: "#FFE135", type: "Primario" },
  { name: "Amarillo anaranjado", hex: "#FFB627", type: "Terciario" },
  { name: "Naranja", hex: "#FF8C1A", type: "Secundario" },
  { name: "Rojo anaranjado", hex: "#F55A2B", type: "Terciario" },
  { name: "Rojo", hex: "#E5323B", type: "Primario" },
  { name: "Rojo violáceo", hex: "#C2306E", type: "Terciario" },
  { name: "Violeta", hex: "#8A3FA0", type: "Secundario" },
  { name: "Azul violáceo", hex: "#5B47B0", type: "Terciario" },
  { name: "Azul", hex: "#2E5FC2", type: "Primario" },
  { name: "Azul verdoso", hex: "#1F9AA8", type: "Terciario" },
  { name: "Verde", hex: "#3DAA4E", type: "Secundario" },
  { name: "Verde amarillento", hex: "#A6CF3A", type: "Terciario" },
];

const ang = (i: number) => (i / 12) * 2 * Math.PI - Math.PI / 2;
const pt = (r: number, a: number) => [100 + r * Math.cos(a), 100 + r * Math.sin(a)] as const;

function arc(i: number, r1: number, r2: number) {
  const a0 = ang(i - 0.5) + 0.01, a1 = ang(i + 0.5) - 0.01;
  const p = (r: number, a: number) => pt(r, a).join(" ");
  return `M ${p(r2, a0)} A ${r2} ${r2} 0 0 1 ${p(r2, a1)} L ${p(r1, a1)} A ${r1} ${r1} 0 0 0 ${p(r1, a0)} Z`;
}

type Props = {
  selected: number;
  onSelect: (i: number) => void;
  highlight?: number[];
  filter?: string;
};

export function ColorWheel({ selected, onSelect, highlight = [], filter }: Props) {
  const hl = new Set(highlight);
  const poly = highlight.map((i) => pt(60, ang(i)).join(",")).join(" ");
  const sel = wheel[selected]!;
  return (
    <svg viewBox="0 0 200 200" className="w-full touch-manipulation" role="group" aria-label="Rueda cromática interactiva">
      {wheel.map((c, i) => {
        const dim = (filter && filter !== "Todos" && c.type !== filter) || (highlight.length > 0 && !hl.has(i));
        const on = hl.has(i) || i === selected;
        return (
          <path
            key={c.name}
            d={arc(i, 66, on ? 99 : 92)}
            fill={c.hex}
            opacity={dim ? 0.28 : 1}
            tabIndex={0}
            role="button"
            aria-label={`${c.name}, color ${c.type.toLowerCase()}`}
            aria-pressed={selected === i}
            className="cursor-pointer outline-none transition-all duration-200 hover:opacity-100 focus-visible:stroke-foreground"
            strokeWidth={i === selected ? 2.5 : 0}
            stroke="currentColor"
            onClick={() => onSelect(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(i); }
              if (e.key === "ArrowRight") { e.preventDefault(); onSelect((i + 1) % 12); }
              if (e.key === "ArrowLeft") { e.preventDefault(); onSelect((i + 11) % 12); }
            }}
          />
        );
      })}
      <circle cx="100" cy="100" r="62" className="fill-card" />
      {highlight.length > 1 && (
        highlight.length === 2
          ? <line x1={pt(60, ang(highlight[0]!))[0]} y1={pt(60, ang(highlight[0]!))[1]} x2={pt(60, ang(highlight[1]!))[0]} y2={pt(60, ang(highlight[1]!))[1]} className="stroke-primary" strokeWidth="1.5" strokeDasharray="3 3" />
          : <polygon points={poly} className="fill-secondary/60 stroke-primary" strokeWidth="1.5" strokeDasharray="3 3" />
      )}
      {highlight.map((i) => {
        const [x, y] = pt(60, ang(i));
        return <circle key={i} cx={x} cy={y} r={i === selected ? 6 : 4.5} fill={wheel[i]!.hex} className="stroke-card" strokeWidth="2" />;
      })}
      <circle cx="100" cy="100" r="26" fill={sel.hex} className="stroke-card" strokeWidth="3" />
    </svg>
  );
}
