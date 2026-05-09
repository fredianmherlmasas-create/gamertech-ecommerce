# 🎮 GamerTech E-Commerce Platform

A production-ready, full-stack e-commerce application for gaming laptops built with modern technologies and best practices.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast development server and optimized builds
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Declarative routing
- **Zustand** - Lightweight state management
- **Axios** - HTTP client with interceptors
- **React Hot Toast** - Beautiful toast notifications
- **Heroicons** - Modern icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Prisma ORM** - Database ORM with type safety
- **PostgreSQL** - Relational database
- **JWT** - Authentication with JSON Web Tokens
- **bcryptjs** - Password hashing
- **Zod** - Schema validation
- **Winston** - Logging
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting

### Database Schema
- Users (authentication, profiles)
- Products (gaming laptops with specs)
- Categories (product organization)
- Cart Items (shopping cart)
- Orders (order management)
- Reviews (product reviews)

## 📁 Project Structure

```
gamertech-ecommerce/
├── backend/               # Node.js + Express API
│   ├── prisma/           # Database schema & migrations
│   │   ├── schema.prisma
│   │   └── seed/
│   ├── src/
│   │   ├── config/       # Database, env config
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Auth, validation, errors
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Helpers, logger
│   └── package.json
├── frontend/             # React + Vite SPA
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks & stores
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
│   └── package.json
└── README.md
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database

### 1. Clone and Navigate

```bash
cd gamertech-ecommerce
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔑 Default Credentials

After seeding the database, you can login with:

- **Admin**: `admin@gamertech.com` / `Admin123!`
- **Customer**: `customer@example.com` / `Customer123!`

## 📦 Available Scripts

### Backend
```bash
npm run dev          # Start with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:reset     # Reset database
npm run lint         # Run ESLint
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt (12 rounds)
- ✅ Rate limiting on auth endpoints
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Input validation with Zod & express-validator
- ✅ SQL injection protection via Prisma ORM
- ✅ XSS protection
- ✅ Role-based access control (RBAC)

## 📱 Features

### Public Features
- Browse products with filters & search
- View product details with specifications
- Add to cart (for authenticated users)
- User registration & login

### Customer Features
- Shopping cart management
- Checkout process
- Order history & tracking
- Profile management

### Admin Features
- Dashboard with statistics
- Product management (CRUD)
- Order management & status updates
- Category management

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get profile (protected)
- `PATCH /api/auth/profile` - Update profile (protected)

### Products
- `GET /api/products` - List all products
- `GET /api/products/:slug` - Get single product
- `GET /api/products/featured` - Get featured products
- `POST /api/products` - Create product (admin)
- `PATCH /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get cart (protected)
- `POST /api/cart/items` - Add to cart (protected)
- `PATCH /api/cart/items/:id` - Update quantity (protected)
- `DELETE /api/cart/items/:id` - Remove item (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `GET /api/orders` - Get my orders (protected)
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `PATCH /api/orders/:id/cancel` - Cancel order (protected)

### Admin
- `GET /api/admin/orders` - Get all orders (admin)
- `GET /api/admin/orders/stats` - Order statistics (admin)
- `PATCH /api/admin/orders/:id/status` - Update order status (admin)

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. Push code to GitHub
2. Connect repository to Railway or Render
3. Add environment variables in dashboard
4. Deploy with `npm run db:deploy` for migrations

### Frontend Deployment (Vercel)

```bash
cd frontend
npm run build
# Upload dist/ folder to Vercel
```

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
PORT=5000
NODE_ENV=development
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=GamerTech
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Original design based on gaming aesthetic with neon green accents
- Product images from various laptop manufacturers
- Icons by Heroicons

---

Built with ❤️ for gamers everywhere.
