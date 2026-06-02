import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import OrderConfirmation from './pages/OrderConfirmation';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMenu from './pages/admin/AdminMenu';

const { Content } = Layout;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Header Layout Component */}
          <Navbar />

          {/* Main Content Layout Component */}
          <Content style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />

              {/* Admin Access Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/menu"
                element={
                  <ProtectedRoute>
                    <AdminMenu />
                  </ProtectedRoute>
                }
              />

              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Content>

          {/* Footer Layout Component */}
          <Footer />
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
