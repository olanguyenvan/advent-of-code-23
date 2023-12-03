import fs from "fs";

const day = process.argv[2];

if (!day) {
  console.log(
    "Please provide day number as first argument, for example:\bun run scaffold 03"
  );
  process.exit(0);
}

const directoryPath = `src/days/${day}`;

if (fs.existsSync(directoryPath)) {
  console.log(`Directory ${directoryPath} already exists`);
} else {
  fs.mkdirSync(directoryPath);
}

const FILES_TO_CREATE = [
  "parser.ts",
  "solution.ts",
  "example_input_part_1",
  "example_input_part_2",
];

const TEMPLATE_DIRECTORY = "src/runner/templates";

for (const file of FILES_TO_CREATE) {
  const fullPath = `${directoryPath}/${file}`;
  if (fs.existsSync(fullPath)) {
    console.log(`File ${fullPath} already exists`);
  } else {
    const templateFilePath = `${TEMPLATE_DIRECTORY}/${file}`;
    if (fs.existsSync(templateFilePath)) {
      const templateContent = Bun.file(templateFilePath);
      await Bun.write(fullPath, templateContent);
    } else {
      fs.writeFileSync(fullPath, "");
    }
  }
}
