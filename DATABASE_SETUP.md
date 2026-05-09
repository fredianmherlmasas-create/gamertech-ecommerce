# 🛠️ Database Setup Guide

This project is built with **Node.js**, **Express**, **Prisma**, and **React**. Currently, the frontend is configured to use **Mock Data** as a fallback so you can demo and develop the UI without a live database.

When you are ready to connect a real database, follow these steps:

## Option 1: Using Supabase (Recommended)

1. Create a project at [Supabase.com](https://supabase.com).
2. Go to **Project Settings > Database** and copy your **Connection String** (URI).
3. Open `backend/.env` and update the `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://postgres.[YOUR_PROJECT_REF]:[YOUR_PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```
4. Run the setup command from the project root:
   ```bash
   npm run db:setup
   ```

## Option 2: Using Local PostgreSQL

1. Install [PostgreSQL](https://www.postgresql.org/download/) on your machine.
2. Create a database named `gamertech_db`.
3. Update `backend/.env`:
   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@localhost:5432/gamertech_db"
   ```
4. Run the setup command:
   ```bash
   npm run db:setup
   ```

## Option 3: Switching to SQLite (No Install Required)

If you want to use a simple file-based database:

1. Open `backend/prisma/schema.prisma`.
2. Change the `datasource db` block:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```
3. Update `backend/.env`:
   ```env
   DATABASE_URL="file:./dev.db"
   ```
4. **Note:** SQLite doesn't support some advanced Postgres types (like `String[]` or `Json` in some cases). You may need to adjust the schema types to `String` and handle JSON parsing in the code.

---

## 🚀 Commands

- `npm run dev`: Starts both frontend and backend.
- `npm run db:setup`: Generates Prisma client, runs migrations, and seeds the database.
- `cd backend && npx prisma studio`: Opens a visual editor for your database.
