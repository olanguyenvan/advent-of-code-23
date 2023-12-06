import { expect, test } from "bun:test";
import { isInRange, mapToDestination } from "./solution";
import type { Range } from "./parser";

const TRUE_TEST_CASES: [Range, number][] = [
  [
    {
      destinationRangeStart: 1,
      sourceRangeStart: 1,
      length: 1,
    },
    1,
  ],
  [
    {
      destinationRangeStart: 1,
      sourceRangeStart: 3,
      length: 3,
    },
    5,
  ],
];

const FALSE_TEST_CASES: [Range, number][] = [
  [
    {
      destinationRangeStart: 1,
      sourceRangeStart: 1,
      length: 1,
    },
    3,
  ],
  [
    {
      destinationRangeStart: 1,
      sourceRangeStart: 3,
      length: 3,
    },
    2,
  ],
  [
    {
      destinationRangeStart: 1,
      sourceRangeStart: 3,
      length: 0,
    },
    2,
  ],
  [
    {
      destinationRangeStart: 1,
      sourceRangeStart: 3,
      length: 5,
    },
    8,
  ],
];

test.each(TRUE_TEST_CASES)("isInRange returns true for %s", (range, number) => {
  expect(isInRange(range, number)).toBe(true);
});

test.each(FALSE_TEST_CASES)(
  "isInRange returns false for %s",
  (range, number) => {
    expect(isInRange(range, number)).toBe(false);
  }
);

test("mapToDestination", () => {
  expect(
    mapToDestination(
      {
        destinationRangeStart: 1,
        sourceRangeStart: 3,
        length: 3,
      },
      4
    )
  ).toEqual(2);
});
