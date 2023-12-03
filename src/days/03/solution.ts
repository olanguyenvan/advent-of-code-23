import { parserPart1 } from "./parser";

type Position = {
  x: number;
  y: number;
};

type MapValue = {
  value: number | string;
  id: number;
};

type MapNumberValue = {
  value: number;
  id: number;
};
type Map = MapValue[][];
export function part1(input: string) {
  const schematic = parserPart1(input);

  const mapWithFullNumbers = createMapWithFullNumbers(schematic);

  const partNumbers = findPartNumbers(schematic, mapWithFullNumbers);

  const result: number = partNumbers.reduce((acc, curr) => acc + curr, 0);

  console.log(`Solution to part 1 is ${result}`);
}

export function part2(input: string) {
  const schematic = parserPart1(input);

  const mapWithFullNumbers = createMapWithFullNumbers(schematic);

  const partNumbers = findGearRatios(schematic, mapWithFullNumbers);

  const result: number = partNumbers.reduce((acc, curr) => acc + curr, 0);

  console.log(`Solution to part 2 is ${result}`);
}

function createMapWithFullNumbers(schematic: string[][]): Map {
  const height = schematic.length;
  const width = schematic[0].length;

  const map: Map = Array.from(Array(height), () =>
    Array.from(Array(width), () => {
      return { value: ".", id: 0 };
    })
  );

  let counter = 0;
  for (let lineIndex = 0; lineIndex < height; lineIndex++) {
    let tmpIndex = 0;
    let tmpNumber = 0;
    let startPosition: Position = { x: 0, y: 0 };

    while (tmpIndex <= width) {
      const parsedDigit = parseInt(schematic[lineIndex][tmpIndex]);
      const isDigit = !isNaN(parsedDigit);

      if (isDigit) {
        if (tmpNumber === 0) {
          startPosition = {
            y: lineIndex,
            x: tmpIndex,
          };
        }
        tmpNumber = tmpNumber * 10 + parsedDigit;
      }

      if ((isDigit && tmpIndex === width) || (tmpNumber !== 0 && !isDigit)) {
        const endXPosition = isDigit ? tmpIndex : tmpIndex - 1;
        // fill map with numbers
        for (let i = startPosition.x; i <= endXPosition; i++) {
          map[lineIndex][i] = {
            value: tmpNumber,
            id: counter,
          };
        }
        counter++;
        tmpNumber = 0;
      }
      tmpIndex++;
    }
  }

  return map;
}

function findPartNumbers(
  schematic: string[][],
  mapWithFullNumbers: Map
): number[] {
  const partNumbers: number[] = [];
  const height = schematic.length;
  const width = schematic[0].length;

  for (let lineIndex = 0; lineIndex < height; lineIndex++) {
    for (let widthIndex = 0; widthIndex < width; widthIndex++) {
      if (isSymbolPart1(schematic[lineIndex][widthIndex])) {
        const adjacentNumbers = findAdjacentNumbers(mapWithFullNumbers, {
          x: widthIndex,
          y: lineIndex,
        });
        for (const adjacentNumber of adjacentNumbers) {
          const number = adjacentNumber.value;

          partNumbers.push(number);
        }
      }
    }
  }

  return partNumbers;
}

function findGearRatios(
  schematic: string[][],
  mapWithFullNumbers: Map
): number[] {
  const gearRatios: number[] = [];
  const height = schematic.length;
  const width = schematic[0].length;

  for (let lineIndex = 0; lineIndex < height; lineIndex++) {
    for (let widthIndex = 0; widthIndex < width; widthIndex++) {
      if (isSymbolPart2(schematic[lineIndex][widthIndex])) {
        let gearRatio = 1;
        const adjacentNumbers = findAdjacentNumbers(mapWithFullNumbers, {
          x: widthIndex,
          y: lineIndex,
        });
        const foundIds = new Set();
        for (const adjacentNumber of adjacentNumbers) {
          foundIds.add(adjacentNumber.id);
          const number = adjacentNumber.value;

          gearRatio *= number;
        }

        if (foundIds.size === 2) {
          gearRatios.push(gearRatio);
        }
      }
    }
  }

  return gearRatios;
}

function findAdjacentNumbers(
  mapWithFullNumbers: Map,
  pos: Position
): MapNumberValue[] {
  const mapValues: MapNumberValue[] = [];
  const height = mapWithFullNumbers.length;
  const width = mapWithFullNumbers[0].length;

  const startIndexY = pos.y - 1;
  const endIndexY = pos.y + 1;
  const startIndexX = pos.x - 1;
  const endIndexX = pos.x + 1;

  const numberAlreadyAdded = Array.from(Array(height * width), () => false);

  for (let tmpY = startIndexY; tmpY <= endIndexY; tmpY++) {
    for (let tmpX = startIndexX; tmpX <= endIndexX; tmpX++) {
      const pos = { x: tmpX, y: tmpY };
      if (!isValidPosition(mapWithFullNumbers, pos)) {
        continue;
      }

      const mapValue = mapWithFullNumbers[tmpY][tmpX];
      const { id, value: adjacentNumber } = mapValue;
      if (Number.isInteger(adjacentNumber)) {
        if (!numberAlreadyAdded[id] && typeof adjacentNumber === "number") {
          numberAlreadyAdded[id] = true;
          mapValues.push({
            id,
            value: adjacentNumber,
          });
        }
      }
    }
  }

  return mapValues;
}

function isValidPosition(mapWithFullNumbers: Map, pos: Position): boolean {
  const height = mapWithFullNumbers.length;
  const width = mapWithFullNumbers[0].length;

  const { x, y } = pos;
  return x >= 0 && x < width && y >= 0 && y < height;
}

export function isSymbolPart1(char: string) {
  const isNumber = !isNaN(parseInt(char));

  return !isNumber && char !== ".";
}

function isSymbolPart2(char: string) {
  return char === "*";
}
