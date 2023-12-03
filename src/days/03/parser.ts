export function parserPart1(input: string): string[][] {
  const lines = input.split("\n");

  return lines.map(parseLine);
}

function parseLine(line: string): string[] {
  return line.split("");
}
