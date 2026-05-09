# 🎮 GamerTech E-Commerce Platform

A professional, high-performance e-commerce application for premium gaming laptops. Built with a modern dark-themed aesthetic, smooth animations, and a robust full-stack architecture.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?logo=framer)](https://www.framer.com/motion/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://www.prisma.io/)

---

## ✨ Key Features

### 🖥️ Premium User Experience
- **Interactive UI**: Fully animated interface using `framer-motion` for a premium gaming feel.
- **Smart Search**: Real-time product search and filtering by brand and category.
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop.
- **Mock Mode**: Built-in mock data fallback allows for instant demos even without a live database connection.

### 🛒 Advanced Commerce Flow
- **Multi-step Checkout**: Professional flow including Shipping, Delivery Method selection, and Payment.
- **Flexible Shipping**: Choice of Standard (Free), Express, and Overnight delivery.
- **Payment Options**: Integrated UI for Credit Card, PayPal, and Crypto payments.
- **Persistent Cart**: Zustand-powered state management with `localStorage` persistence.

### 🛡️ Admin & Security
- **Full Admin Panel**: Dashboard with stats, product management, and order tracking.
- **Secure Auth**: JWT-based authentication with role-based access control (RBAC).
- **Security Headers**: Protected by Helmet, CORS, and Rate Limiting.

---

## 🚀 Quick Start

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/fredianmherlmasas-create/gamertech-ecommerce.git

# Install shared dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 2. Database Setup (Optional)
The app works out-of-the-box with **Mock Data**. To use a real database:
1. Update `backend/.env` with your PostgreSQL string (see `DATABASE_SETUP.md`).
2. Run `npm run db:setup`.

### 3. Start Development
```bash
npm run dev
```
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:5000`

---

## 📁 Architecture

- **`/frontend`**: React + TypeScript + Tailwind + Framer Motion.
- **`/backend`**: Node.js + Express + Prisma + Zod.
- **`/mockData`**: Comprehensive product catalog for zero-config demos.

---

## 🔑 Demo Credentials
- **Admin**: `admin@gamertech.com` / `Admin123!`
- **Customer**: `customer@example.com` / `Customer123!`

---

## 📄 License
MIT License. Built for enthusiasts and professionals.

---
*Generated with [Claude Code](https://claude.ai)* 🤖
