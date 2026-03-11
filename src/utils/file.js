import fs from "fs";
import path from "path";
import { BINARY_EXTENSIONS } from "../constants/template.constants.js";

export function pathExists(targetPath) {
  return fs.existsSync(targetPath);
}

export function removeDirectory(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

export function copyFile(sourcePath, destinationPath) {
  fs.copyFileSync(sourcePath, destinationPath);
}

export function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (BINARY_EXTENSIONS.has(ext)) {
    return false;
  }

  const content = fs.readFileSync(filePath);
  const sample = content.subarray(0, 512);

  return !sample.includes(0);
}
