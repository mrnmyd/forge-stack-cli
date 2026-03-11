export function validateProjectName(value) {
  if (!value || value.trim().length === 0) {
    return "Project name is required";
  }

  if (value !== value.trim()) {
    return "Project name cannot start or end with spaces";
  }

  if (/\s/.test(value)) {
    return "Project name cannot contain spaces";
  }

  if (value !== value.toLowerCase()) {
    return "Project name must be lowercase";
  }

  if (!/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/.test(value)) {
    return "Project name must be a valid npm package name";
  }
}
