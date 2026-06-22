# MathMentor Flow

`MathMentor Flow` is an educational application for learning how to solve mathematical problems:

`Проєктування та розробка програмного забезпечення для навчання з розв'язання математичних задач`

## Repository structure

- `index.html`, `styles.css`, `app.js` - frontend client for the backend API;
- `backend/` - HTTP API for modules, problems, and learner progress;
- `database/schema.sql` - relational schema for a scalable PostgreSQL deployment;
- `docs/architecture.md` - concise architecture description;
- `project-rules.md` - project topic facts and scope.

## Current capabilities

- interactive learning modules and step-by-step math problem solving;
- self-check flow with progress tracking;
- API mode with server-side progress persistence in `backend/storage/progress.json`;
- starter backend structure that can later be migrated to PostgreSQL and authentication.

## Run frontend

Serve the repository root via a local static server while the backend API is running.

Examples:

```powershell
php -S localhost:8080
```

```powershell
python -m http.server 8080
```

## Run backend

The backend is a plain Node.js server without third-party dependencies.

```powershell
cd backend
node src/server.js
```

Then open the frontend and keep the API at `http://localhost:3000`. Direct opening of `index.html` without backend is no longer supported.
