# Kvasir

**Kvasir** is a full-stack TypeScript project developed for the **"The Best Computer Program 2026"** competition.

This Nx monorepo contains a Next.js frontend and a NestJS backend.

## Tech Stack

- Next.js 16 and React 19
- NestJS
- TypeScript
- Nx 24
- ESLint, Vitest, and Jest

## Project Structure

```text
apps/
  frontend/  # Next.js web application
  backend/   # NestJS API
```

## Getting Started

Requirements: Node.js and npm.

```bash
npm install
```

### Run the applications

```bash
npx nx dev @org/frontend
npx nx serve @org/backend
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000/api`

### Common commands

```bash
npx nx build @org/frontend
npx nx build @org/backend
npx nx test @org/backend
npx nx lint @org/frontend
```

## License

GPL-3.0
