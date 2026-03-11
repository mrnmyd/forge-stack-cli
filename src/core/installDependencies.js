import { runCommand } from "../utils/command.js";

export function installDependencies(projectPath) {
  runCommand("npm install", { cwd: projectPath });
}
