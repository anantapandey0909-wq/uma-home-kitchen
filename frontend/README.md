# Frontend Client - Uma Home Kitchen

This is the single-page web client for Uma Home Kitchen, built using **React, Vite, and Ant Design**.

## Tech Stack
- **React**: Functional components using hooks.
- **Vite**: Rapid, modern frontend bundling tool.
- **Ant Design**: Top-tier, comprehensive React UI components.
- **React Router (v6)**: Declarative, client-side routing.
- **Axios**: HTTP client requesting information from the Express backend API.

---

## Directory Setup

```
frontend/
├── src/
│   ├── components/
│   │   ├── Footer.jsx           # Footnotes, address details, FSSAI certificates
│   │   ├── Navbar.jsx           # Navigation header, cart counter, session buttons
│   │   └── ProtectedRoute.jsx   # Route guard shielding admin options
│   ├── context/
│   │   ├── AuthContext.jsx      # Holds admin login sessions
│   │   └── CartContext.jsx      # In-memory shopping cart operations
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx  # Admin statistics panel
│   │   │   ├── AdminLogin.jsx      # Secure username-password login
│   │   │   ├── AdminMenu.jsx       # Datatables to create/modify items
│   │   │   └── AdminOrders.jsx     # Datatables to inspect/progress orders
│   │   ├── About.jsx            # About narrative and contact details
│   │   ├── Home.jsx             # Content-rich marketing landing page
│   │   ├── Menu.jsx             # Category filtering, cart management, and checkout form
│   │   └── OrderConfirmation.jsx# Receipt summary screen for submitted orders
│   ├── services/
│   │   └── api.js               # Axios instance wrapping server API endpoints
│   ├── utils/
│   │   └── format.js            # localized currency (₹) and Date formatters
│   ├── App.jsx                  # Root router layout
│   ├── index.css                # Base layouts, variables, shadows, transitions
│   └── index.jsx                # SPA entry point mounting index.html
├── index.html                   # HTML document with SEO meta optimization tags
├── vite.config.js               # Dev server configuration
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
   - Edit `.env` to specify your `VITE_API_URL` (points to the running backend Express API):
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   By default, the Vite server will bind to `http://localhost:5173`.

4. **Production Build**:
   - Compile optimized assets into the `dist/` folder:
     ```bash
     npm run build
     ```
   - Review compilation using:
     ```bash
     npm run preview
     ```

---

## Key Routing Architecture

- `/`: Homely landing page displaying delivery scores, signatures, combos, and address info.
- `/menu`: The menu ordering station. Items filter by category (Breakfast, Specials, Combos, Drinks). Adds to cart, adjusts quantities, and presents checkout forms.
- `/about`: Details the story, reviews, and FSSAI credentials.
- `/order-confirmation`: Displays order receipts (Order IDs, items purchased, totals).
- `/admin/login`: Secure sign-in portal for operators.
- `/admin/dashboard` (Protected): Interactive panel detailing daily stats and action portals.
- `/admin/orders` (Protected): Table mapping orders, itemized overlays, and status progress patch selectors.
- `/admin/menu` (Protected): Table listing menu inventory, allowing creation/edit modals, search options, and delete controls.
