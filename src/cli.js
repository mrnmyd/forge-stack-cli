import { cancel, spinner } from "@clack/prompts";
import path from "path";
import {
  PLACEHOLDER_API_BASE_URL,
  PLACEHOLDER_PROJECT_NAME,
  TEMPLATE_REPO,
} from "./constants/template.constants.js";
import {
  cloneTemplate,
  ensureGitInstalled,
  removeTemplateGitHistory,
} from "./core/cloneTemplate.js";
import { installDependencies } from "./core/installDependencies.js";
import { replacePlaceholders } from "./core/replacePlaceholders.js";
import {
  confirmOverwrite,
  endCli,
  promptProjectDetails,
  startCli,
} from "./prompts/project.prompts.js";
import { copyFile, pathExists, removeDirectory } from "./utils/file.js";

export async function run() {
  try {
    startCli();
    ensureGitInstalled();

    const { projectName, apiBaseUrl } = await promptProjectDetails();
    const projectPath = path.join(process.cwd(), projectName);

    if (pathExists(projectPath)) {
      const shouldOverwrite = await confirmOverwrite(projectName);

      if (!shouldOverwrite) {
        cancel("Operation cancelled.");
        process.exit(0);
      }

      removeDirectory(projectPath);
    }

    const cloneTask = spinner();
    cloneTask.start("Cloning template");
    cloneTemplate(TEMPLATE_REPO, projectName);
    cloneTask.stop("Template cloned");

    removeTemplateGitHistory(projectPath);

    replacePlaceholders(projectPath, {
      [PLACEHOLDER_PROJECT_NAME]: projectName,
      [PLACEHOLDER_API_BASE_URL]: apiBaseUrl,
    });

    copyFile(
      path.join(projectPath, ".env.example"),
      path.join(projectPath, ".env"),
    );

    const installTask = spinner();
    installTask.start("Installing dependencies");
    installDependencies(projectPath);
    installTask.stop("Project ready");

    endCli(projectName);
  } catch (error) {
    cancel(error instanceof Error ? error.message : "Something went wrong");
    process.exit(1);
  }
}
