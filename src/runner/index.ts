import fs from "fs";

const day = process.argv[2] || "01";

const customInputPath = process.argv[3];
const exampleInputPathPart1 = `src/days/${day}/example_input_part_1`;
const exampleInputPathPart2 = `src/days/${day}/example_input_part_2`;

try {
  let customInputData: null | string = customInputPath
    ? fs.readFileSync(customInputPath, "utf8")
    : null;

  let part1Input: string =
    customInputData || fs.readFileSync(exampleInputPathPart1, "utf-8");

  let part2Input: string =
    customInputData || fs.readFileSync(exampleInputPathPart2, "utf-8");

  import(`../days/${day}/solution`).then((dayModule) => {
    const { part1, part2 } = dayModule;

    if (part1) {
      part1(part1Input);
    }

    if (part2) {
      part2(part2Input);
    }
  });
} catch (err) {
  console.error(err);
}
