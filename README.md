# Uma Home Kitchen - Restaurant Website Monorepo

Welcome to the **Uma Home Kitchen** project repository. This is a full-stack, production-ready monorepo scaffolding for a home-style North Indian food delivery kitchen located in Haldwani, Uttarakhand.

## Features

### Customer-Facing UI
- **Interactive Landing Page**: Displays the rating (⭐ 4.4/5 from 763 ratings), specialties (Aloo ke Gutke), combos, beverages, and contact/location details.
- **Menu Tab filtering**: Dynamic client-side categorization (Breakfast & Parathas, Kumaoni Specials, Combos, Beverages) fetched from the Express API.
- **Client-Side Cart**: Dynamic cart addition, removal, and quantity adjustments with automated subtotal and total calculations.
- **Checkout validations**: Form validator for customer contact details, time choices, and addresses, integrated with the order endpoint.
- **Receipt view**: Friendly confirmation screen summarizing order details.

### Admin Panel (Protected)
- **JWT authentication**: Admin login with encrypted sessions.
- **Stats Dashboard**: Displays key metric counters (Pending, Completed, Revenue).
- **Interactive Orders Table**: Status badges, detailed item overlays, and status update dropdowns (Pending, In Kitchen, Out for Delivery, Completed, Cancelled).
- **Interactive Menu Table**: Veg tags, price formatting, item creations, updating, and deletions.

---

## Project Structure

```
uma-home-kitchen/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.js         # Seed script (Default Admin & 13 items)
│   ├── src/
│   │   ├── config/         # Database connection init
│   │   ├── middleware/     # Auth, custom validations, error handlers
│   │   ├── routes/         # Auth, menu, orders endpoints
│   │   └── index.js        # Express main server script
│   ├── .env.example
│   ├── package.json
│   └── README.md           # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── components/     # Layout headers, footers, route protection
│   │   ├── context/        # Auth and Cart contexts state
│   │   ├── pages/          # Home, Menu, About, Confirmation, Admin pages
│   │   ├── services/       # Axios API client
│   │   ├── utils/          # Indian Rupee and date localized formatters
│   │   ├── App.jsx         # Routing framework shell
│   │   └── index.jsx       # App entry point
│   ├── index.html          # SEO configurations
│   ├── vite.config.js      # Vite build setup
│   ├── .env.example
│   ├── package.json
│   └── README.md           # Frontend documentation
├── .gitignore
└── README.md               # Root documentation
```

---

## Setup & Running Instructions

### 1. Prerequisite
Ensure you have **Node.js** (v16+) and a running **PostgreSQL** instance.

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy the sample env file:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your database connection details and a secure JWT secret:
     ```env
     DATABASE_URL="postgresql://username:password@localhost:5432/uma_home_kitchen?schema=public"
     JWT_SECRET="your_jwt_secret_here"
     ```
4. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Seed the database (creates default admin user `admin@umahomekitchen.com` / `admin123` and 13 menu items):
   ```bash
   npm run seed
   ```
6. Start the server in development mode:
   ```bash
   npm run dev
   ```
   The backend server runs on `http://localhost:5000` by default.

### 3. Frontend Setup
1. Open another terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
4. Start the frontend developer server:
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` (or Vite's default dev port).

---

## Final Testing Checklist

Use this checklist to verify your setup:

- [ ] Backend starts without errors
- [ ] Database migrations run successfully
- [ ] Database is seeded with menu items
- [ ] Frontend starts without errors
- [ ] Homepage displays all business information (rating, location, famous Aloo ke Gutke, FSSAI)
- [ ] Menu page loads items from backend
- [ ] Can add items to cart
- [ ] Can place an order
- [ ] Order confirmation shows correctly
- [ ] Admin login works (`admin@umahomekitchen.com` / `admin123`)
- [ ] Protected routes redirect to login
- [ ] Admin can view orders
- [ ] Admin can update order status
- [ ] Admin can add/edit/delete menu items
- [ ] Logout works correctly
