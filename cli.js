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

  execSync(`rm -rf ${projectPath}/.git`);

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
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      replacePlaceholder(filePath, search, replace);
    } else {
      const content = fs.readFileSync(filePath, "utf8");

      if (content.includes(search)) {
        fs.writeFileSync(filePath, content.replaceAll(search, replace));
      }
    }
  }
}

run();
