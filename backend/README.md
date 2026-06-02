# Backend Server - Uma Home Kitchen

This is the backend REST API server for Uma Home Kitchen, built using **Node.js, Express, and PostgreSQL with Prisma ORM**.

## Tech Stack
- **Express**: Fast, unopinionated minimalist web framework.
- **Prisma**: Next-generation Node.js and TypeScript ORM for PostgreSQL.
- **Bcrypt**: Used for hashing password values securely.
- **JSON Web Token (JWT)**: Used for secure, stateless admin panel authentication.

---

## Directory Setup

```
backend/
├── prisma/
│   ├── schema.prisma       # Prisma Database Schema definitions
│   └── seed.js             # Seed script for initial DB content
├── src/
│   ├── config/
│   │   └── database.js     # Prisma database configuration helper
│   ├── middleware/
│   │   ├── auth.js         # JWT validation route guard
│   │   ├── validation.js   # Input field checkers
│   │   └── errorHandler.js # Consolidated API error output helper
│   ├── routes/
│   │   ├── auth.js         # Endpoint handlers for login
│   │   ├── menu.js         # Endpoint handlers for menu CRUD
│   │   └── orders.js       # Endpoint handlers for placing & updating orders
│   └── index.js            # Express application entry point
├── .env.example
├── package.json
└── README.md
```

---

## Setup & Run Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Environment Configuration**:
   - Create `.env` from `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` to specify your `DATABASE_URL` (PostgreSQL connection string) and `JWT_SECRET`.
3. **Database Migration**:
   - Execute the Prisma migration command to create tables:
     ```bash
     npx prisma migrate dev --name init
     ```
4. **Seed Database**:
   - Insert the default Admin User (`admin@umahomekitchen.com` / `admin123`) and 13 menu items:
     ```bash
     npm run seed
     ```
5. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Server runs by default on `http://localhost:5000/api`.

---

## Environment Variables

- `PORT`: Server port number (default: `5000`).
- `NODE_ENV`: Setup environment (`development` / `production`).
- `DATABASE_URL`: Connection string URL for your PostgreSQL DB.
- `JWT_SECRET`: Secret key used to sign session cookies. In production, change this to a long random hash.
- `FRONTEND_URL`: Allowed cross-origin origin (default: `http://localhost:3000`).

---

## REST API Endpoints

### 1. Authentication (Public)
- **POST `/api/auth/login`**
  - **Body**: `{ "email": "admin@umahomekitchen.com", "password": "admin123" }`
  - **Response**: `{ "success": true, "token": "jwt_token_here", "user": { "id": 1, "email": "admin@umahomekitchen.com" } }`

### 2. Menu Management
- **GET `/api/menu` (Public)**
  - Optional Query Params: `category` (string), `available` (boolean string: `true`/`false`)
  - **Response**: `{ "success": true, "data": [ ... ] }`
- **POST `/api/menu` (Admin Only)**
  - Header: `Authorization: Bearer YOUR_JWT_TOKEN`
  - **Body**: `{ "name": "Aloo Paratha", "category": "Breakfast & Parathas", "description": "...", "price": 40, "isVeg": true, "isAvailable": true }`
  - **Response (201)**: `{ "success": true, "data": { ... } }`
- **PUT `/api/menu/:id` (Admin Only)**
  - Header: `Authorization: Bearer YOUR_JWT_TOKEN`
  - **Body**: `{ "name": "Aloo Paratha", "category": "Breakfast & Parathas", "price": 45, "isVeg": true, "isAvailable": true }`
  - **Response**: `{ "success": true, "data": { ... } }`
- **DELETE `/api/menu/:id` (Admin Only)**
  - Header: `Authorization: Bearer YOUR_JWT_TOKEN`
  - **Response**: `{ "success": true, "message": "Menu item deleted successfully" }`

### 3. Order Processing
- **POST `/api/orders` (Public)**
  - **Body**:
    ```json
    {
      "customerName": "Ramesh Kumar",
      "phone": "9876543210",
      "address": "288, Talli Barmori, Haldwani",
      "deliveryTime": "30-40 mins",
      "items": [
        { "menuItemId": 1, "name": "Aloo ke Gutke", "price": 80, "quantity": 1 }
      ],
      "totalAmount": 80
    }
    ```
  - **Response (201)**: `{ "success": true, "data": { ... } }`
- **GET `/api/orders` (Admin Only)**
  - Header: `Authorization: Bearer YOUR_JWT_TOKEN`
  - Optional Query Params: `status` (string)
  - **Response**: `{ "success": true, "data": [ ... ] }`
- **GET `/api/orders/:id` (Admin Only)**
  - Header: `Authorization: Bearer YOUR_JWT_TOKEN`
  - **Response**: `{ "success": true, "data": { ... } }`
- **PATCH `/api/orders/:id/status` (Admin Only)**
  - Header: `Authorization: Bearer YOUR_JWT_TOKEN`
  - **Body**: `{ "status": "In Kitchen" }`
  - **Response**: `{ "success": true, "data": { ... } }`

---

## Example Curl Requests

### Login (Public)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@umahomekitchen.com","password":"admin123"}'
```

### Get Menu Items (Public)
```bash
curl http://localhost:5000/api/menu
```

### Create Order (Public)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Ramesh Kumar","phone":"9876543210","address":"Haldwani","deliveryTime":"30-40 mins","items":[{"menuItemId":1,"name":"Aloo ke Gutke","price":80,"quantity":1}],"totalAmount":80}'
```

### View Orders (Admin Only)
```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Order Status (Admin Only)
```bash
curl -X PATCH http://localhost:5000/api/orders/1/status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"In Kitchen"}'
```

---

## Security Notes

1. **Environmental Protection**: Always keep database connection string URLs and JWT signing secret keys out of code commits. Load them using the configured `dotenv` module.
2. **HTTPS Configs**: In production setups, configure reverse proxy layers (e.g. Nginx or Cloudflare SSL configurations) to handle encrypted connections.
3. **CORS Control**: In local development setups, the CORS middleware allows all origins. For production systems, configure the environment variable `FRONTEND_URL` to restrict requests to only your active hosted URL.
