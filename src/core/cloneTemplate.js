import path from "path";
import { runCommand } from "../utils/command.js";
import { removeDirectory } from "../utils/file.js";

export function ensureGitInstalled() {
  try {
    runCommand("git --version");
  } catch {
    throw new Error("Git is required to download template");
  }
}

export function cloneTemplate(templateRepo, projectName) {
  runCommand(`git clone ${templateRepo} ${projectName}`);
}

export function removeTemplateGitHistory(projectPath) {
  removeDirectory(path.join(projectPath, ".git"));
}
