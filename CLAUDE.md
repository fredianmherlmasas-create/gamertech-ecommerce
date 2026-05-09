# GamerTech E-Commerce

A professional full-stack gaming laptop store built with React, Tailwind CSS, Framer Motion, and Node.js.

## 🛠 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Zustand (State Management)
- **Backend:** Node.js, Express, Prisma (ORM)
- **Database:** PostgreSQL (Ready for connection)

## 🏗 Project Structure
- `/frontend`: React application (Vite)
- `/backend`: Express API with Prisma ORM
- `/gamertech-ecommerce/node_modules`: Shared monorepo dependencies

## 🚀 Getting Started
1. **Install Dependencies:** `npm install` in root, then `npm run install:all`
2. **Start Dev Mode:** `npm run dev` (Starts frontend on :5173 and backend on :5000)
3. **Database Setup:** See `DATABASE_SETUP.md` for instructions.

## 💡 Key Features
- **UI Animations:** Powered by `framer-motion` for a premium feel.
- **Mock Mode:** Frontend services (`product.service.ts`) automatically fall back to mock data if the backend/DB is not available.
- **Persistent Cart:** Cart state is saved in `localStorage` via Zustand middleware.
- **Full Checkout Flow:** Includes shipping, payment simulation, and review steps.

## 📝 Development Notes
- The app is currently in "UI Demo Mode" with mock data fallbacks.
- To connect a real database, update `backend/.env` and run `npm run db:setup`.
- Admin credentials for demo: `admin@gamertech.com` / `Admin123!`
