# Frontend Src Directory

This directory contains the main React single-page application source files.

## Structure

- **`components/`**: Layout wrappers, navigation headers, footer layout, and Route-protection guards (`ProtectedRoute.jsx`).
- **`context/`**: Auth and Cart context providers handling global states.
- **`pages/`**: Single pages (Home, Menu, About, OrderConfirmation) and Admin tools (Login, Dashboard, Orders table, Menu table).
- **`services/`**: Axios configuration and API helper stubs.
- **`utils/`**: Utility formatters for Indian Rupees and dates.
- **`App.jsx`**: Shell configuring routers and wraps context providers.
- **`index.jsx`**: Entry script loading styles and renders DOM node.
