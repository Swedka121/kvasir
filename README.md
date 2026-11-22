# Kvasir

**Kvasir** is a full-stack TypeScript project developed for the **"The Best Computer Program 2026"** competition. The application is an Nx monorepo with a Next.js frontend, a NestJS backend, and a Tauri desktop shell.

## Project layout

The repository root contains the Dev Container configuration. The Nx workspace and application are in `project/`.

```text
.devcontainer/       # Dev Container configuration
project/
  apps/frontend/     # Next.js application and Tauri shell
  apps/backend/      # NestJS API
  start-tauri.sh     # Starts the desktop app on the host machine
  Agent.md           # Development setup and guidance for agents
```

## Run the project in development mode

The web frontend and API run in the Dev Container. The Tauri desktop shell runs on your host machine and connects to the frontend.

1. **Start the Dev Container.** Open this repository in VS Code and choose **Dev Containers: Reopen in Container**. The Dev Container includes PostgreSQL. Wait for the container to finish starting.
2. **Configure the environment.** Create or update `project/.env` (the Nx workspace root). Set the values for `DB_URL`, `BETTER_AUTH_BASE_URL`, `BETTER_AUTH_SECRET`, and `NEXT_PUBLIC_BACKEND_URL`. Use a strong, private value for `BETTER_AUTH_SECRET`; do not commit your local `.env`.
3. **Install dependencies** once, from the repository root in the Dev Container:

   ```bash
   cd project
   npm install
   ```

4. **Start the frontend and backend** in two separate terminals in the Dev Container, both from the `project/` directory:

   ```bash
   cd project
   npx nx dev @org/frontend
   ```

   ```bash
   cd project
   npx nx serve @org/backend
   ```

   The frontend is available at `http://localhost:3000` and the API at `http://localhost:4000/api`.
5. **Start Tauri on your host machine.** In a terminal on the host (not inside the Dev Container), go to the checked-out `project/` directory and run:

   ```bash
   cd /path/to/kvasir/project
   bash ./start-tauri.sh
   ```

   The script checks/installs the required Linux system packages and Rust/Tauri CLI if needed, then launches the desktop app. It may ask for your password to install system packages. Once the Tauri window opens, the project is running in development mode.

## Common Nx commands

Run these from the `project/` directory:

```bash
npx nx build @org/frontend
npx nx build @org/backend
npx nx test @org/backend
npx nx lint @org/frontend
```

## For agents

Before working in `project/`, read [`project/Agent.md`](./project/Agent.md) for project-specific setup and guidance.

## License

GPL-3.0
