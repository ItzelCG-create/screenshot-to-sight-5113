import { hslToHex } from "@/lib/color";

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

function arc(i: number, n: number, r1: number, r2: number) {
  const a0 = ((i - 0.5) / n) * 2 * Math.PI - Math.PI / 2;
  const a1 = ((i + 0.5) / n) * 2 * Math.PI - Math.PI / 2;
  const p = (r: number, a: number) => `${100 + r * Math.cos(a)} ${100 + r * Math.sin(a)}`;
  return `M ${p(r2, a0)} A ${r2} ${r2} 0 0 1 ${p(r2, a1)} L ${p(r1, a1)} A ${r1} ${r1} 0 0 0 ${p(r1, a0)} Z`;
}

export function ColorWheel({ selected, onSelect, filter }: { selected: number; onSelect: (i: number) => void; filter?: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-sm" role="group" aria-label="Rueda cromática interactiva">
      {wheel.map((c, i) => {
        const dim = filter && filter !== "Todos" && c.type !== filter;
        return (
          <path
            key={c.name}
            d={arc(i, 12, 42, selected === i ? 98 : 92)}
            fill={c.hex}
            opacity={dim ? 0.18 : 1}
            stroke="white"
            strokeWidth={1.5}
            tabIndex={0}
            role="button"
            aria-label={`${c.name}, color ${c.type.toLowerCase()}`}
            aria-pressed={selected === i}
            className="cursor-pointer outline-none transition-all focus-visible:opacity-80"
            onClick={() => onSelect(i)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect(i))}
          />
        );
      })}
      <circle cx="100" cy="100" r="36" fill={wheel[selected]!.hex} stroke="white" strokeWidth="3" />
    </svg>
  );
}

export const hueStrip = Array.from({ length: 12 }, (_, i) => hslToHex({ h: i * 30, s: 70, l: 60 }));
