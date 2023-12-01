export function parserPart1(input: string): string[][] {
  const lines = input.split("\n");

  return lines.map((line) => line.split(""));
}

const DIGITS_SPELLING: [string, number][] = [
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
];

export function parserPart2(input: string): [number, number][] {
  const lines = input.split("\n");

  return lines.map(getFirstAndLastDigit);
}

function getFirstAndLastDigit(line: string): [number, number] {
  let tmpIndex = 0;

  let first: number | null = null;
  let last: number | null = null;

  while (tmpIndex < line.length) {
    let foundDigit: null | number = null;

    for (const [spelling, digit] of DIGITS_SPELLING) {
      if (line.slice(tmpIndex).startsWith(spelling)) {
        foundDigit = digit;
        break;
      }
    }

    if (!foundDigit) {
      let possibleDigit = parseInt(line[tmpIndex]);

      if (Number.isInteger(possibleDigit)) {
        foundDigit = possibleDigit;
      }
    }

    if (foundDigit) {
      if (!first) {
        first = foundDigit;
      }

      last = foundDigit;
    }

    tmpIndex++;
  }

  return [first!, last!];
}
