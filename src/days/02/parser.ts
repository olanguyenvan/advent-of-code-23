export type GameSet = {
  blue: number;
  red: number;
  green: number;
};

type Color = keyof GameSet;

export type GameDescription = {
  id: number;
  sets: GameSet[];
};

export const COLORS: Color[] = ["blue", "red", "green"];

export function parserPart1(input: string): GameDescription[] {
  const lines = input.split("\n");

  return lines.map(parseLine);
}

function parseLine(line: string): GameDescription {
  const [idPart, setsPart] = line.split(": ");
  const idAsString = idPart.split(" ")[1];
  const id = parseInt(idAsString);

  const setsAsString = setsPart.split("; ");

  const parsedSets: GameSet[] = [];

  for (const setAsString of setsAsString) {
    const set: GameSet = {
      blue: 0,
      red: 0,
      green: 0,
    };

    const cubesAsString = setAsString.split(", ");

    for (const cubes of cubesAsString) {
      const [numberAsString, color] = cubes.split(" ");

      set[color as Color] = parseInt(numberAsString);
    }

    parsedSets.push(set);
  }

  return {
    id,
    sets: parsedSets,
  };
}
