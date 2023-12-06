import { parseInput, parseInputPart2 } from "./parser";
import type { Race } from "./parser";

export function part1(input: string) {
  const races = parseInput(input);

  console.log(races);

  const result: number = getProductOfWaysToWin(races);

  console.log(`Solution to part 1 is ${result}`);
}

export function part2(input: string) {
  const race = parseInputPart2(input);

  const result: number = getWaysToWin(race);

  console.log(`Solution to part 2 is ${result}`);
}

function getProductOfWaysToWin(races: Race[]): number {
  return races.map(getWaysToWin).reduce((acc, curr) => acc * curr, 1);
}

function getWaysToWin(race: Race): number {
  const { time, record } = race;

  const delta = time * time - 4 * record;

  const deltaRootSquare = Math.sqrt(delta);
  const x1 = (time - deltaRootSquare) / 2;
  const x2 = (time + deltaRootSquare) / 2;

  const min = Number.isInteger(x1) ? x1 + 1 : Math.ceil(x1);
  const max = Number.isInteger(x2) ? x2 - 1 : Math.floor(x2);

  return max - min + 1;
}
