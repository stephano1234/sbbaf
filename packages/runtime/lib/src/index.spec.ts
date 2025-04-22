import { expect, test } from "vitest";
import { func1 } from ".";

test("anything", () => {
  const a = 0;
  const b = func1(a);
  expect(b).toBe(String(a));
});
