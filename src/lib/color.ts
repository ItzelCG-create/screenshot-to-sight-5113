export type HSL = { h: number; s: number; l: number };

export function hexToHsl(hex: string): HSL {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

export function hslToHex({ h, s, l }: HSL): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const hx = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${hx(f(0))}${hx(f(8))}${hx(f(4))}`.toUpperCase();
}

const rot = (c: HSL, d: number) => hslToHex({ ...c, h: c.h + d });

export type HarmonyKey = "complementaria" | "analoga" | "triadica" | "complementaria-dividida" | "monocromatica";

export const harmonies: { key: HarmonyKey; name: string; desc: string }[] = [
  { key: "complementaria", name: "Complementaria", desc: "Colores opuestos en la rueda. Máximo contraste: ideal para resaltar un elemento." },
  { key: "analoga", name: "Análoga", desc: "Colores vecinos en la rueda. Transmite calma y unidad, muy presente en la naturaleza." },
  { key: "triadica", name: "Triádica", desc: "Tres colores separados 120°. Vibrante y equilibrada; usa uno como dominante." },
  { key: "complementaria-dividida", name: "Complementaria dividida", desc: "Un color base y los dos vecinos de su complementario. Contraste con menos tensión." },
  { key: "monocromatica", name: "Monocromática", desc: "Un solo tono con distintas luminosidades. Elegante, coherente y fácil de controlar." },
];

export function generatePalette(hex: string, key: HarmonyKey): string[] {
  const c = hexToHsl(hex);
  switch (key) {
    case "complementaria":
      return [hex.toUpperCase(), hslToHex({ ...c, l: c.l + 18 }), rot(c, 180), hslToHex({ ...c, h: c.h + 180, l: c.l - 15 })];
    case "analoga":
      return [rot(c, -30), hex.toUpperCase(), rot(c, 30), rot(c, 60)];
    case "triadica":
      return [hex.toUpperCase(), rot(c, 120), rot(c, 240)];
    case "complementaria-dividida":
      return [hex.toUpperCase(), rot(c, 150), rot(c, 210)];
    case "monocromatica":
      return [-30, -15, 0, 15, 30].map((d) => hslToHex({ ...c, l: c.l + d }));
  }
}

export function readableText(hex: string): "dark" | "light" {
  return hexToHsl(hex).l > 60 ? "dark" : "light";
}
