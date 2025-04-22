import { expect, test } from "vitest";
import { dummyFunction } from ".";

test("dummy test", () => {
  const input = 0;
  expect(dummyFunction(input)).toBe(String(input));
});
