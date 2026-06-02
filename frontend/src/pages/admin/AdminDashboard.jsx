/**
 * AdminDashboard.jsx
 * Admin dashboard displaying order statistics compiled client-side from fetched orders list,
 * alongside shortcut navigation controls.
 */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Statistic, Row, Col, Typography, Button, Space, Divider, Spin, Empty } from 'antd';
import { 
  ShoppingOutlined, 
  MenuOutlined, 
  LogoutOutlined, 
  DollarOutlined, 
  HourglassOutlined, 
  CheckCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';

import { AuthContext } from '../../context/AuthContext';
import { getOrders } from '../../services/api';
import { formatCurrency } from '../../utils/format';

const { Title, Paragraph, Text } = Typography;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOrders();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch dashboard stats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsData();
  }, []);

  const handleLogout = () => {
    authContext.logout();
    navigate('/');
  };

  // Compile Stats from loaded order list
  const getStats = () => {
    const today = new Date().toDateString();
    
    const ordersToday = orders.filter(order => new Date(order.createdAt).toDateString() === today);
    const pendingOrders = orders.filter(order => ['Pending', 'In Kitchen', 'Out for Delivery'].includes(order.status));
    const completedOrders = orders.filter(order => order.status === 'Completed');
    
    // Revenue compiled from Completed orders
    const revenueToday = ordersToday
      .filter(order => order.status === 'Completed')
      .reduce((sum, order) => sum + order.totalAmount, 0);

    return {
      todayCount: ordersToday.length,
      pendingCount: pendingOrders.length,
      completedCount: completedOrders.length,
      revenueToday: revenueToday
    };
  };

  const stats = getStats();

  return (
    <div style={{ background: '#faf7f2', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header Panel */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <Title level={2} style={{ fontFamily: 'Outfit', fontWeight: 800, margin: 0 }}>Admin Dashboard</Title>
            <Text type="secondary">Welcome back, {authContext.user?.email || 'Administrator'}</Text>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={fetchStatsData} loading={loading}>
              Refresh
            </Button>
            <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
          </Space>
        </div>

        {error && (
          <Card style={{ marginBottom: '24px', borderColor: '#ffa39e', background: '#fff2f0' }}>
            <Text type="danger">{error} Statistics shown below may be cached or incomplete.</Text>
          </Card>
        )}

        {/* Statistics Panels Grid */}
        <Spin spinning={loading}>
          <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ borderLeft: '4px solid #1890ff' }}>
                <Statistic 
                  title="Orders Today" 
                  value={stats.todayCount} 
                  prefix={<ShoppingOutlined style={{ color: '#1890ff' }} />}
                />
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ borderLeft: '4px solid #faad14' }}>
                <Statistic 
                  title="Pending Orders" 
                  value={stats.pendingCount} 
                  prefix={<HourglassOutlined style={{ color: '#faad14' }} />}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ borderLeft: '4px solid #52c41a' }}>
                <Statistic 
                  title="Completed Orders" 
                  value={stats.completedCount} 
                  prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ borderLeft: '4px solid #eb2f96' }}>
                <Statistic 
                  title="Revenue Today" 
                  value={stats.revenueToday} 
                  precision={2}
                  formatter={value => formatCurrency(value)}
                  prefix={<DollarOutlined style={{ color: '#eb2f96' }} />}
                />
              </Card>
            </Col>
          </Row>
        </Spin>

        {/* Navigation Action Buttons Card */}
        <Card title="Quick Management Options" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <Paragraph>
            Select an option below to view customer orders or manage active menu listings.
          </Paragraph>
          <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            <Col xs={24} sm={12}>
              <Card 
                hoverable 
                onClick={() => navigate('/admin/orders')}
                style={{ textAlign: 'center', background: '#fffcf5', border: '1px dashed #e85a1e' }}
              >
                <ShoppingOutlined style={{ fontSize: '36px', color: '#e85a1e', marginBottom: '12px' }} />
                <Title level={4} style={{ fontFamily: 'Outfit', margin: '0 0 8px 0' }}>Manage Orders</Title>
                <Text type="secondary">View incoming orders and update delivery status</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card 
                hoverable 
                onClick={() => navigate('/admin/menu')}
                style={{ textAlign: 'center', background: '#fffcf5', border: '1px dashed #8b5a2b' }}
              >
                <MenuOutlined style={{ fontSize: '36px', color: '#8b5a2b', marginBottom: '12px' }} />
                <Title level={4} style={{ fontFamily: 'Outfit', margin: '0 0 8px 0' }}>Manage Menu</Title>
                <Text type="secondary">Add, edit, or remove dishes from the active listing</Text>
              </Card>
            </Col>
          </Row>
        </Card>

      </div>
    </div>
  );
};

export default AdminDashboard;
