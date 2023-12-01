import { parserPart1, parserPart2 } from "./parser";

export function part1(input: string) {
  const lines = parserPart1(input);
  const onlyNumbers = filterOnlyNumbers(lines);

  const sum: number = onlyNumbers
    .map(getCalibrationValue)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(`Solution to part 1 is ${sum}`);
}

function filterOnlyNumbers(lines: string[][]): number[][] {
  const mappedToNumbers = lines.map((line) =>
    line.map((char) => parseInt(char))
  );

  return mappedToNumbers.map((line) =>
    line.filter((char) => Number.isInteger(char))
  );
}

function getCalibrationValue(line: number[]) {
  return line[0] * 10 + line[line.length - 1];
}

export function part2(input: string) {
  const firstAndLastDigits = parserPart2(input);

  const calibrationValues = firstAndLastDigits.map(getCalibrationValue);

  const sum: number = calibrationValues.reduce((acc, curr) => acc + curr, 0);

  console.log(`Solution to part 2 is ${sum}`);
}
