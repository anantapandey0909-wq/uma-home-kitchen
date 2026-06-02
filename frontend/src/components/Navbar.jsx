import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Badge, Button, Space } from 'antd';
import { ShoppingCartOutlined, UserOutlined, ShopOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const { Header } = Layout;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { cartItemCount } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Resolve active navigation key based on current pathname
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/menu')) return 'menu';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/admin')) return 'admin';
    return '';
  };

  const navItems = [
    {
      key: 'home',
      label: <Link to="/">Home</Link>
    },
    {
      key: 'menu',
      label: <Link to="/menu">Menu</Link>
    },
    {
      key: 'about',
      label: <Link to="/about">About Us</Link>
    }
  ];

  return (
    <Header className="navbar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <ShopOutlined style={{ fontSize: '24px', color: '#e85a1e' }} />
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#e85a1e', fontFamily: 'Outfit' }}>
          Uma Home Kitchen
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Menu
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          items={navItems}
          style={{ borderBottom: 'none', minWidth: '250px' }}
        />
      </div>

      <Space size="large" align="center">
        {/* Shopping Cart Badge and Icon */}
        <Link to="/menu#cart-section" style={{ color: '#2d2d2d', display: 'flex', alignItems: 'center' }}>
          <Badge count={cartItemCount} offset={[10, 0]} color="#e85a1e">
            <ShoppingCartOutlined style={{ fontSize: '22px' }} />
          </Badge>
        </Link>

        {/* Authentication Controls */}
        {isAuthenticated ? (
          <Space>
            <Button
              type="text"
              icon={<UserOutlined />}
              onClick={() => navigate('/admin/dashboard')}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ display: 'inline' }}>Dashboard</span>
            </Button>
            <Button type="primary" danger onClick={handleLogout}>
              Logout
            </Button>
          </Space>
        ) : (
          <Button
            type="dashed"
            icon={<UserOutlined />}
            onClick={() => navigate('/admin/login')}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            Admin Panel
          </Button>
        )}
      </Space>
    </Header>
  );
};

export default Navbar;
