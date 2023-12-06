export type Range = {
  destinationRangeStart: number;
  sourceRangeStart: number;
  length: number;
};

export type Mapping = {
  from: string;
  to: string;
  ranges: Range[];
};
export type Almanac = {
  seeds: number[];
  mappings: Mapping[];
};

export function parseInput(input: string): Almanac {
  const sections = input.split("\n\n");

  const seedsAsString = sections[0];
  const seeds = seedsAsString
    .split(": ")[1]
    .split(" ")
    .map((n) => parseInt(n));

  const mappings = sections.slice(1).map(parseMapping);

  return {
    seeds,
    mappings: mappings,
  };
  // return lines.map(parseLine);
}

function parseMapping(section: string): Mapping {
  const mappings: Mapping[] = [];

  const lines = section.split("\n");
  const mapLineAsString = lines[0];
  const matched = mapLineAsString.match(/([a-z]*)-to-([a-z]*)/);

  if (!matched) {
    throw new Error(`Could not parse mapping ${mapLineAsString}`);
  }

  const rangesLinesAsString = lines.slice(1);
  const ranges: Range[] = rangesLinesAsString
    .map((line) => line.split(" ").map((n) => parseInt(n)))
    .map((splittedLine) => ({
      destinationRangeStart: splittedLine[0],
      sourceRangeStart: splittedLine[1],
      length: splittedLine[2],
    }));

  return {
    from: matched[1],
    to: matched[2],
    ranges: ranges,
  };
}
