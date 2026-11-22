# Agent guide

This file contains project-specific setup information for agents working in the `project/` directory (the Nx workspace). Read it before making changes or running the application.

## Development setup

The Dev Container configuration is in the repository root, one directory above this Nx workspace. Start/reopen the repository in the Dev Container before working on the frontend or backend. PostgreSQL is provided by the container configuration.

The Nx workspace root is this directory (`project/`). Configure the local `.env` here with:

- `DB_URL` for the PostgreSQL connection
- `BETTER_AUTH_BASE_URL` for the backend auth API
- `BETTER_AUTH_SECRET` as a private secret
- `NEXT_PUBLIC_BACKEND_URL` for the frontend's backend URL

Do not expose or commit local environment values. Install dependencies from this directory with `npm install` when needed.

Run the applications in separate terminals from this directory:

```bash
npx nx dev @org/frontend
npx nx serve @org/backend
```

The frontend listens on `http://localhost:3000`; the backend API is at `http://localhost:4000/api`.

The Tauri shell must be started on the host machine, not in the Dev Container. From the host, change to the checked-out `project/` directory and run `bash ./start-tauri.sh`. The script can install Linux packages and Rust/Tauri CLI, requiring network access and possibly `sudo`.

## Nx guidance

Use the Nx workspace commands and conventions documented in [`AGENTS.md`](./AGENTS.md). Run Nx commands from this directory.
