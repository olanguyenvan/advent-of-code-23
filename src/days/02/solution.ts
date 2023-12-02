import { COLORS, GameSet, parserPart1 } from "./parser";
import type { GameDescription } from "./parser";

export function part1(input: string) {
  const gamesDescription = parserPart1(input);

  const result: number = countPossibleGames(gamesDescription, LIMITS_PART_1);

  console.log(`Solution to part 1 is ${result}`);
}

export function part2(input: string) {
  const gamesDescription = parserPart1(input);

  const minimumLimits = findMiminimumLimits(gamesDescription);

  const sum = minimumLimits.reduce((acc, curr) => {
    return acc + gamePower(curr);
  }, 0);

  console.log(`Solution to part 2 is ${sum}`);
}

const LIMITS_PART_1 = {
  red: 12,
  green: 13,
  blue: 14,
};

function countPossibleGames(
  gamesDescription: GameDescription[],
  limits: GameSet
): number {
  let sum = 0;

  for (const gameDesc of gamesDescription) {
    let failed = false;

    for (const set of gameDesc.sets) {
      for (const color of COLORS) {
        // @ts-expect-error
        if (set[color as Color] > limits[color]) {
          failed = true;
        }
      }
    }

    if (!failed) {
      sum += gameDesc.id;
    }
  }

  return sum;
}

function findMiminimumLimits(gamesDescription: GameDescription[]): GameSet[] {
  const minimumLimits: GameSet[] = [];

  for (const gameDesc of gamesDescription) {
    const minimumLimit: GameSet = {
      blue: 0,
      red: 0,
      green: 0,
    };

    for (const set of gameDesc.sets) {
      for (const color of COLORS) {
        minimumLimit[color] = Math.max(minimumLimit[color], set[color]);
      }
    }
    minimumLimits.push(minimumLimit);
  }

  return minimumLimits;
}

function gamePower(set: GameSet): number {
  return set.blue * set.red * set.green;
}
