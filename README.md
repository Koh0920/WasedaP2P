# WasedaP2P

WasedaP2P is a full-stack project with:

- `frontend/`: React + Vite
- `backend/`: FastAPI + PostgreSQL

This README explains how to run the project locally from the repository root.

## Prerequisites

- Node.js 18+ and `npm`
- Python 3.10+
- PostgreSQL 14+ running locally

## Project Structure

```text
WasedaP2P/
├── backend/
├── frontend/
└── README.md
```

## 1. Create the Database

Create a PostgreSQL database named `wasedap2p`.

Example with `psql`:

```bash
psql -U postgres
CREATE DATABASE wasedap2p;
```

If you need more detail, see [backend/README.md](/Users/jihunpark/Desktop/개발/WasedaP2P/backend/README.md).

## 2. Configure Backend Environment

Create `backend/.env` from `backend/.env.template`.

Example:

```env
SECRET_KEY=replace-with-a-long-random-secret
ALGORITHM=HS256
DATABASE_URL=postgresql+psycopg://jihunpark:jihunpark@localhost:5432/wasedap2p

FRONTEND_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_USE_TLS=true
SMTP_USE_SSL=false
```

Notes:

- `SMTP_PASSWORD` should be an app password if you use Gmail.
- Do not keep placeholder values like `smtp.example.com`.
- Restart the backend after changing `.env`.

## 3. Install Frontend Dependencies

From the repository root:

```bash
cd frontend
npm install
```

## 4. Install Backend Dependencies

The backend does not currently include a `requirements.txt`, so install the packages used by the app manually in a virtual environment.

Example:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg python-dotenv passlib[argon2] pyjwt python-multipart
```

If `psycopg` is not installed correctly, also run:

```bash
pip install "psycopg[binary]"
```

## 5. Run the Backend

From `backend/`:

```bash
uvicorn main:app --reload
```

The backend runs at:

```text
http://localhost:8000
```

On startup, it will:

- create tables if they do not exist
- apply the current runtime schema update for `email_verified`

## 6. Run the Frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## 7. Login and Email Flow

Current auth-related behavior:

- signup calls `POST /api/auth/signup`
- login calls `POST /api/auth/login`
- session restore uses the backend auth cookie via `GET /users/me/`
- signup sends a verification email
- password reset sends a reset email

For email features to work, the SMTP settings in `backend/.env` must be valid.

## Useful Commands

Frontend build:

```bash
cd frontend
npm run build
```

Backend syntax check:

```bash
python3 -m py_compile backend/main.py
```

## Common Issues

`400 Bad Request` on signup:

- the username may already exist
- check the frontend toast or backend response body for `detail`

`500 Internal Server Error` during signup or reset email:

- SMTP settings in `backend/.env` are invalid
- the mail server may reject login
- `SMTP_HOST` may still be a placeholder

User appears signed out after refresh:

- make sure backend and frontend are both running on the expected local URLs
- make sure cookies are not being blocked

## Current Limitations

- backend dependencies are not yet pinned in a lockfile or `requirements.txt`
- password reset currently sends an email link, but the final password update flow is not implemented in the backend yet
- email verification is persisted in the database, but additional access rules for unverified users may still need to be enforced
