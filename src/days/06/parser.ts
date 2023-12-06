export type Race = {
  time: number;
  record: number;
};

export function parseInput(input: string): Race[] {
  const [time, record] = input.split("\n");

  const times: number[] = parseLine(time);
  const records: number[] = parseLine(record);

  const races: Race[] = [];

  for (let i = 0; i < times.length; i++) {
    races.push({
      time: times[i],
      record: records[i],
    });
  }

  return races;
}

function parseLine(line: string): number[] {
  const numbersAsString = line.split(":")[1];

  return numbersAsString
    .split(" ")
    .map((n) => parseInt(n))
    .filter((n) => !Number.isNaN(n));
}

export function parseInputPart2(input: string): Race {
  const [timeLine, recordLine] = input.split("\n");

  const time = parseLinePart2(timeLine);
  const record = parseLinePart2(recordLine);

  return {
    time,
    record,
  };
}

function parseLinePart2(line: string): number {
  const numberParts = line.split(":")[1];
  return parseInt(numberParts.replaceAll(" ", ""));
}
