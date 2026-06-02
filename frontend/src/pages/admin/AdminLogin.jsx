/**
 * AdminLogin.jsx
 * Admin Login Page. Authenticates against Express backend API.
 * Sets token in AuthContext and redirects to Admin Dashboard.
 */
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, Space, message } from 'antd';
import { LockOutlined, MailOutlined, ShopOutlined } from '@ant-design/icons';

import { login } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const { Title, Text } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (authContext.isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [authContext.isAuthenticated, navigate]);

  // Handle Login submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login(values.email, values.password);
      
      if (response.success) {
        authContext.login(response.user, response.token);
        message.success('Login successful! Welcome to Admin Panel.');
        
        // Navigate to intended destination or fallback to dashboard
        const destination = location.state?.from?.pathname || '/admin/dashboard';
        navigate(destination, { replace: true });
      } else {
        message.error(response.message || 'Login failed.');
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'Invalid email or password. Verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#faf7f2', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      <Card style={{ maxWidth: '400px', width: '100%', boxShadow: '0 4px 20px rgba(139, 90, 43, 0.08)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <ShopOutlined style={{ fontSize: '32px', color: '#e85a1e', marginBottom: '8px' }} />
          <Title level={3} style={{ fontFamily: 'Outfit', margin: 0 }}>Uma Home Kitchen</Title>
          <Text type="secondary">Admin Control Dashboard</Text>
        </div>

        <Form
          name="admin_login"
          layout="vertical"
          initialValues={{ email: 'admin@umahomekitchen.com' }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} 
              placeholder="e.g. admin@umahomekitchen.com" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
              placeholder="Enter admin password"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: '24px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block 
              size="large"
              style={{ background: '#e85a1e', borderColor: '#e85a1e', height: '45px', fontWeight: 'bold' }}
            >
              Sign In to Admin Panel
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Default username: <strong>admin@umahomekitchen.com</strong>
            <br />
            Default password: <strong>admin123</strong>
          </Text>
        </div>

      </Card>
    </div>
  );
};

export default AdminLogin;
