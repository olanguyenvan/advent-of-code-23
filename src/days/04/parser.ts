export type Card = {
  winningNumbers: number[];
  scratchedNumbers: number[];
};

export function parseInput(input: string): Card[] {
  const lines = input.split("\n");

  return lines.map(parseLine);
}

function parseLine(line: string): Card {
  const numbersPart = line.split(": ")[1];
  const [winningNumbers, scratchedNumbers] = numbersPart.split(" | ");

  return {
    winningNumbers: parseNumbersStream(winningNumbers),
    scratchedNumbers: parseNumbersStream(scratchedNumbers),
  };
}

function parseNumbersStream(numbersAsString: string): number[] {
  return numbersAsString
    .split(" ")
    .map((n) => parseInt(n))
    .filter((n) => !Number.isNaN(n));
}
