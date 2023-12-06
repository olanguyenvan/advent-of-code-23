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
