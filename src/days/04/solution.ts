import { parseInput } from "./parser";
import type { Card } from "./parser";

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

function getSum(cards: Card[]): number {
  let score = 0;

  for (const card of cards) {
    const { winningNumbers, scratchedNumbers } = card;

    const matchedNumbers = scratchedNumbers.filter((x) =>
      winningNumbers.includes(x)
    );
    score += getScore(matchedNumbers.length);
  }

  return score;
}

function getScore(matchedNumbers: number): number {
  if (matchedNumbers === 0) {
    return 0;
  }

  return Math.pow(2, matchedNumbers - 1);
}
