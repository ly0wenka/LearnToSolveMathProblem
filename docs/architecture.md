# MathMentor Flow Architecture

## Overview

The project is split into three layers:

1. `frontend` in the repository root: student-facing educational interface.
2. `backend` in `/backend`: lightweight HTTP API for content and progress tracking.
3. `database` in `/database/schema.sql`: relational model for users, tasks, steps, attempts, and recommendations.

## Current API

- `GET /api/health`
- `GET /api/modules`
- `GET /api/problems`
- `GET /api/problems/:id`
- `GET /api/progress`
- `POST /api/progress/check`
- `POST /api/progress/complete`
- `POST /api/progress/reset`

## Scaling Path

- Replace file storage in `/backend/storage/progress.json` with PostgreSQL.
- Add authentication with roles: student, teacher, administrator.
- Add teacher dashboard for content management and analytics.
- Add recommendation logic based on attempt history and weak topics.
- Move static content from `backend/src/content.js` into database seed scripts and admin tools.
