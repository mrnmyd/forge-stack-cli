import { execSync } from "child_process";

export function runCommand(command, options = {}) {
  try {
    return execSync(command, {
      stdio: "pipe",
      encoding: "utf8",
      ...options,
    });
  } catch (error) {
    const message =
      error?.stderr?.trim() ||
      error?.stdout?.trim() ||
      error?.message ||
      "Command failed";

    throw new Error(message);
  }
}
