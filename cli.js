#!/usr/bin/env node

import { text } from "@clack/prompts";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const templateRepo = "https://github.com/mrnmyd/forge-stack.git";

async function run() {
  const projectName = await text({
    message: "Project name",
  });

  const apiBaseUrl = await text({
    message: "API Base URL",
  });

  console.log("Creating project...");

  execSync(`git clone ${templateRepo} ${projectName}`, { stdio: "inherit" });

  const projectPath = path.join(process.cwd(), projectName);

  // remove template git history
  fs.rmSync(path.join(projectPath, ".git"), {
    recursive: true,
    force: true,
  });

  replacePlaceholder(projectPath, "forge-stack-template", projectName);
  replacePlaceholder(projectPath, "__API_BASE_URL__", apiBaseUrl);

  fs.copyFileSync(
    path.join(projectPath, ".env.example"),
    path.join(projectPath, ".env"),
  );

  console.log("Installing dependencies...");

  execSync("npm install", { cwd: projectPath, stdio: "inherit" });

  console.log("Project created successfully!");
  console.log(`cd ${projectName}`);
  console.log("npm run dev");
}

function replacePlaceholder(dir, search, replace) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);

    // Skip node_modules and .git
    if (entry.name === "node_modules" || entry.name === ".git") {
      continue;
    }

    if (entry.isDirectory()) {
      replacePlaceholder(filePath, search, replace);
      continue;
    }

    const ext = path.extname(entry.name);

    // Only process text-based files
    const textExtensions = [
      ".js",
      ".ts",
      ".tsx",
      ".jsx",
      ".json",
      ".html",
      ".css",
      ".md",
      ".env",
      ".yml",
      ".yaml",
    ];

    if (!textExtensions.includes(ext)) {
      return;
    }

    const content = fs.readFileSync(filePath, "utf8");

    if (content.includes(search)) {
      fs.writeFileSync(filePath, content.replaceAll(search, replace));
    }
  }
}

run();
