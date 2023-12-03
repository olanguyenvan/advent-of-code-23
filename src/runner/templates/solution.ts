import { parseInput } from "./parser";

export function part1(input: string) {
  const parsed = parseInput(input);

  const result: number = getSum(parsed);

  console.log(`Solution to part 1 is ${result}`);
}

export function part2(input: string) {
  const parsed = parseInput(input);

  const result: number = getSum(parsed);

  console.log(`Solution to part 2 is ${result}`);
}

function getSum(input: string[][]): number {
  return 0;
}
