import { parseInput } from "./parser";
import type { Almanac, Mapping, Range } from "./parser";

export function part1(input: string) {
  const parsed = parseInput(input);

  const result: number = getLowestLocation(parsed);

  console.log(`Solution to part 1 is ${result}`);
}

// export function part2(input: string) {
//   const parsed = parseInput(input);

//   const result: number = getSum(parsed);

//   console.log(`Solution to part 2 is ${result}`);
// }

function getLowestLocation(almanac: Almanac): number {
  return Math.min(
    ...almanac.seeds.map((seed) => getLocationNumber(almanac.mappings, seed))
  );
}

function getLocationNumber(mappings: Mapping[], seed: number): number {
  let result = seed;

  for (const mapping of mappings) {
    const { ranges } = mapping;

    for (const range of ranges) {
      if (isInRange(range, result)) {
        result = mapToDestination(range, result);
        break;
      }
    }
  }

  return result;
}

export function isInRange(range: Range, n: number): boolean {
  return (
    n >= range.sourceRangeStart &&
    n <= range.sourceRangeStart + range.length - 1
  );
}

export function mapToDestination(range: Range, n: number): number {
  const offsetFromSource = n - range.sourceRangeStart;
  return range.destinationRangeStart + offsetFromSource;
}
