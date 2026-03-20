# ForgeStack CLI

`forge-stack` is a publishable npm CLI that scaffolds the ForgeStack React template into a new project directory.

It is not the React template itself. This repository contains the generator. The generated app comes from the ForgeStack template repository and is then customized with your project name and API base URL.

## What The Generated Template Provides

The generated ForgeStack React project is a production-oriented scaffold for applications that need more than a blank Vite starter.

Included in the template:

- React 19 + TypeScript + Vite setup
- Tailwind CSS v4 foundation
- Shadcn/Radix UI primitives
- React Router with public and admin layouts
- auth bootstrap and guarded routes
- Zustand stores for auth, theme, and app state
- React Query provider and shared query client
- Axios clients for public and authenticated API calls
- refresh-token retry handling
- shared error normalization and form error helpers
- reusable React Hook Form + Zod form components
- reusable data table primitives for client-side and backend-driven use
- demo public and admin routes that show intended structure

## CLI Flow

Running the CLI:

1. prompts for a project name
2. prompts for an API base URL
3. clones the template repository
4. removes template git history
5. replaces template placeholders
6. copies `.env.example` to `.env`
7. runs `npm install`

## Usage

```bash
npx forge-stack
```

Example prompt values:

```text
Project name: my-app
API Base URL: http://localhost:8080/api
```

Then start the generated app:

```bash
cd my-app
npm run dev
```

## Generated Template Stack

- `react`, `react-dom`
- `typescript`
- `vite`
- `react-router-dom`
- `@tanstack/react-query`
- `@tanstack/react-table`
- `zustand`
- `axios`
- `react-hook-form`
- `zod`
- `tailwindcss`
- `lucide-react`
- `sonner`

## Environment Injection

The CLI currently injects:

- project name
- `VITE_API_BASE_URL`

The template expects:

```env
VITE_API_BASE_URL="__API_BASE_URL__"
```

Example:

```env
VITE_API_BASE_URL="http://localhost:8080/api"
```

## Generated Template Structure

```text
src/
  app/
    App.tsx
    router/
    providers/
  components/
    data-table/
    form/
    layouts/
    shared/
    ui/
  features/
    auth/
    data-table-demo/
    form-demo/
  hooks/
  lib/
  pages/
  stores/
  constants/
  enums/
  utils/
```

## Notes

- Git must be installed because the CLI clones the template repository.
- The generated app intentionally includes demo pages and placeholder routes so teams can adapt a complete reference structure instead of starting from an empty shell.
- The CLI currently installs dependencies with `npm install`.

## Package Metadata

- Package name: `forge-stack`
- Current version: `1.3.2`
- Binary: `forge-stack`
- Repository: `https://github.com/mrnmyd/forge-stack-cli.git`
