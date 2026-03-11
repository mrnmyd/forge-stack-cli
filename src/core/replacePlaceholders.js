import fs from "fs";
import path from "path";
import { SKIPPED_DIRECTORIES } from "../constants/template.constants.js";
import { isTextFile } from "../utils/file.js";

export function replacePlaceholders(dir, replacements) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (SKIPPED_DIRECTORIES.has(entry.name)) {
      continue;
    }

    const filePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      replacePlaceholders(filePath, replacements);
      continue;
    }

    if (!isTextFile(filePath)) {
      continue;
    }

    let content = fs.readFileSync(filePath, "utf8");
    let updated = false;

    for (const [search, replace] of Object.entries(replacements)) {
      if (!content.includes(search)) {
        continue;
      }

      content = content.replaceAll(search, replace);
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(filePath, content);
    }
  }
}
