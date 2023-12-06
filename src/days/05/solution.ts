import { parseInput } from "./parser";
import type { Almanac, Mapping, Range } from "./parser";

export function part1(input: string) {
  const almanac = parseInput(input);

  const result: number = getLowestLocation(almanac.mappings, almanac.seeds);

  console.log(`Solution to part 1 is ${result}`);
}

export function part2(input: string) {
  const almanac = parseInput(input);

  const { seeds: originalSeeds } = almanac;
  const { mappings } = almanac;
  let currentMin = getLocationNumber(mappings, originalSeeds[0]);

  for (let i = 0; i < originalSeeds.length; i = i + 2) {
    let index = 0;
    let range = originalSeeds[i + 1];

    while (index < range) {
      const currentSeed = originalSeeds[i] + index;
      currentMin = Math.min(
        currentMin,
        getLocationNumber(mappings, currentSeed)
      );

      index++;
    }
  }
  console.log(`Solution to part 2 is ${currentMin}`);
}

function getLowestLocation(mappings: Mapping[], seeds: number[]): number {
  return Math.min(...seeds.map((seed) => getLocationNumber(mappings, seed)));
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
