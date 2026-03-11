import { confirm, intro, isCancel, outro, text } from "@clack/prompts";
import { validateProjectName } from "../utils/validation.js";

export function startCli() {
  intro("ForgeStack");
}

export function endCli(projectName) {
  outro(`cd ${projectName} && npm run dev`);
}

export async function promptProjectDetails() {
  const projectName = await text({
    message: "Project name",
    placeholder: "my-app",
    validate: validateProjectName,
  });
  handlePromptCancel(projectName);

  const apiBaseUrl = await text({
    message: "API Base URL",
    placeholder: "https://localhost:8443/api/v1",
  });
  handlePromptCancel(apiBaseUrl);

  return { projectName, apiBaseUrl };
}

export async function confirmOverwrite(projectName) {
  const shouldOverwrite = await confirm({
    message: `Directory already exists: ${projectName}. Overwrite it?`,
    active: "Overwrite",
    inactive: "Abort",
    initialValue: false,
  });

  handlePromptCancel(shouldOverwrite);
  return shouldOverwrite;
}

function handlePromptCancel(value) {
  if (isCancel(value)) {
    outro("Operation cancelled.");
    process.exit(0);
  }
}
