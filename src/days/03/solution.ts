import { parserPart1 } from "./parser";

type Position = {
  x: number;
  y: number;
};
export function part1(input: string) {
  const parsedInput = parserPart1(input);

  const partNumbers = findPartNumbers(parsedInput);
  const result: number = partNumbers.reduce((acc, curr) => acc + curr, 0);

  console.log(`Solution to part 1 is ${result}`);
}

export function part2(input: string) {
  const parsedInput = parserPart1(input);

  const partNumbers = findPartNumbers(parsedInput);
  const result: number = partNumbers.reduce((acc, curr) => acc + curr, 0);

  console.log(`Solution to part 2 is ${result}`);
}

function findPartNumbers(schematic: string[][]): number[] {
  const partNumbers: number[] = [];
  const height = schematic.length;
  const width = schematic[0].length;

  for (let lineIndex = 0; lineIndex < height; lineIndex++) {
    let tmpIndex = 0;
    let tmpNumber = 0;
    let startPosition: Position = { x: 0, y: 0 };

    while (tmpIndex <= width) {
      const parsedDigit = parseInt(schematic[lineIndex][tmpIndex]);
      const isNumber = !isNaN(parsedDigit);

      if (isNumber) {
        if (tmpNumber === 0) {
          startPosition = {
            y: lineIndex,
            x: tmpIndex,
          };
        }
        tmpNumber = tmpNumber * 10 + parsedDigit;
      } else {
        if (tmpNumber !== 0 || tmpIndex == width) {
          if (
            hasAdjacentSymbol(schematic, startPosition, {
              y: lineIndex,
              x: tmpIndex - 1,
            })
          ) {
            partNumbers.push(tmpNumber);
          }
        }
        tmpNumber = 0;
      }
      tmpIndex++;
    }
  }

  return partNumbers;
}

function hasAdjacentSymbol(
  schematic: string[][],
  start: Position,
  end: Position
): boolean {
  let foundSymbol = false;

  const startIndexY = start.y - 1;
  const endIndexY = end.y + 1;
  const startIndexX = start.x - 1;
  const endIndexX = end.x + 1;

  for (let tmpY = startIndexY; tmpY <= endIndexY; tmpY++) {
    for (let tmpX = startIndexX; tmpX <= endIndexX; tmpX++) {
      const pos = { x: tmpX, y: tmpY };
      if (!isValidPosition(schematic, pos)) {
        continue;
      }

      if (isSpecialSymbol(schematic[tmpY][tmpX])) {
        return true;
      }
    }
  }

  return foundSymbol;
}

function isValidPosition(schematic: string[][], pos: Position): boolean {
  const height = schematic.length;
  const width = schematic[0].length;

  const { x, y } = pos;
  return x >= 0 && x < width && y >= 0 && y < height;
}

function isSpecialSymbol(char: string) {
  const isNumber = !isNaN(parseInt(char));

  return !isNumber && char !== ".";
}
