import { expect, test } from "bun:test";
import { isSymbolPart1 } from "./solution";

test("isSymbolPart1", () => {
  expect(isSymbolPart1("*")).toBe(true);
  expect(isSymbolPart1(".")).toBe(false);
  expect(isSymbolPart1("1")).toBe(false);
});
