import { describe, it, expect } from "vitest";
import { generatePalette, hexToHsl, hslToHex } from "./color";

describe("paletas", () => {
  it("complementario del rojo es cian", () => {
    expect(generatePalette("#FF0000", "complementaria")[2]).toBe("#00FFFF");
  });
  it("triádica del rojo incluye verde y azul", () => {
    expect(generatePalette("#FF0000", "triadica")).toEqual(["#FF0000", "#00FF00", "#0000FF"]);
  });
  it("hex ida y vuelta", () => {
    expect(hslToHex(hexToHsl("#8A5CF6"))).toBe("#8A5CF6");
  });
});
