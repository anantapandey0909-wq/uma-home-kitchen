/**
 * OrderConfirmation.jsx
 * Displays order confirmation details received from state of navigation router.
 */
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, Typography, Button, Space, Table, Result, Divider, Row, Col } from 'antd';
import { CheckCircleOutlined, PhoneOutlined, ArrowLeftOutlined, ShoppingOutlined } from '@ant-design/icons';
import { formatCurrency } from '../utils/format';

const { Title, Text, Paragraph } = Typography;

const OrderConfirmation = () => {
  const location = useLocation();
  
  // Extract order object from router state
  const order = location.state?.order;

  if (!order) {
    return (
      <div style={{ background: '#faf7f2', minHeight: '100vh', padding: '64px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <Result
            status="warning"
            title="No Order Found"
            subTitle="It looks like you haven't placed an order yet or your session refreshed."
            extra={
              <Link to="/menu">
                <Button type="primary" size="large" style={{ background: '#e85a1e', borderColor: '#e85a1e' }}>
                  Browse Our Menu
                </Button>
              </Link>
            }
          />
        </Card>
      </div>
    );
  }

  // Items table column configuration
  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text style={{ fontWeight: 600 }}>{text}</Text>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (val) => formatCurrency(val)
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (qty) => <Text style={{ fontWeight: 'bold' }}>x{qty}</Text>
    },
    {
      title: 'Total',
      key: 'total',
      align: 'right',
      render: (_, record) => formatCurrency(record.price * record.quantity)
    }
  ];
const whatsappMessage = `
Hello Uma Home Kitchen,

I have placed an order.

Order ID: ${order.id}

Name: ${order.customerName}
Phone: ${order.phone}
Address: ${order.address}

Total Amount: ₹${order.totalAmount}

Please confirm my order.

Thank you.
`;

const whatsappUrl = `https://wa.me/918954327490?text=${encodeURIComponent(whatsappMessage)}`;
  return (
    <div style={{ background: '#faf7f2', minHeight: '100vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        
        {/* Banner Success Card */}
        <Card style={{ marginBottom: '24px', borderTop: '6px solid #52c41a', textAlign: 'center' }}>
          <CheckCircleOutlined style={{ fontSize: '56px', color: '#52c41a', marginBottom: '16px' }} />
          <Title level={2} style={{ fontFamily: 'Outfit', margin: '0 0 8px 0' }}>Order Placed Successfully!</Title>
          <Paragraph type="secondary" style={{ fontSize: '15px' }}>
            Thank you for ordering from Uma Home Kitchen. We are preparing your warm meal!
          </Paragraph>
          <Text style={{ fontSize: '16px', fontWeight: 'bold', background: '#f5f5f5', padding: '6px 16px', borderRadius: '4px' }}>
            Order ID: #{order.id}
          </Text>
        </Card>

        {/* Order Details & Summary Card */}
        <Card title="Order Summary" style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <Row gutter={[16, 16]} style={{ marginBottom: '8px' }}>
              <Col xs={24} sm={12}>
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>CUSTOMER NAME</Text>
                <Text style={{ fontSize: '14px', fontWeight: 600 }}>{order.customerName}</Text>
              </Col>
              <Col xs={24} sm={12}>
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>PHONE NUMBER</Text>
                <Text style={{ fontSize: '14px', fontWeight: 600 }}>{order.phone}</Text>
              </Col>
            </Row>
            
            <Row gutter={[16, 16]} style={{ marginBottom: '8px' }}>
              <Col xs={24} sm={12}>
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>DELIVERY PREFERENCE</Text>
                <Text style={{ fontSize: '14px', fontWeight: 600 }}>{order.deliveryTime}</Text>
              </Col>
              <Col xs={24} sm={12}>
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>ORDER STATUS</Text>
                <Text style={{ fontSize: '14px', fontWeight: 'bold', color: '#52c41a' }}>{order.status}</Text>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>DELIVERY ADDRESS</Text>
                <Text style={{ fontSize: '14px', fontWeight: 600 }}>{order.address}</Text>
              </Col>
            </Row>
          </div>

          <Divider style={{ margin: '16px 0' }} />

          {/* Itemized Table */}
          <Table
            dataSource={order.items}
            columns={columns}
            rowKey={(record, idx) => idx}
            pagination={false}
            size="small"
            style={{ marginBottom: '16px' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', background: '#fafafa', padding: '12px 16px', borderRadius: '8px' }}>
            <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>Total Amount Paid:</Text>
            <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#e85a1e' }}>
              {formatCurrency(order.totalAmount)}
            </Text>
          </div>
        </Card>

        {/* Callback Help Action Buttons */}
        <div style={{ textAlign: 'center' }}>
          <Space size="middle" wrap>

            <Link to="/menu">
              <Button type="primary" size="large" icon={<ShoppingOutlined />} style={{ background: '#e85a1e', borderColor: '#e85a1e', fontWeight: 'bold' }}>
                Place Another Order
              </Button>
            </Link>
            <Button
  size="large"
  icon={<PhoneOutlined />}
  href="tel:+918954327490"
  style={{
    color: '#8b5a2b',
    borderColor: '#8b5a2b',
    fontWeight: 'bold'
  }}
>
  Call to Modify Order (+91 89543 27490)
</Button>

<Button
  size="large"
  href={whatsappUrl}
  target="_blank"
  style={{
    background: '#25D366',
    borderColor: '#25D366',
    color: 'white',
    fontWeight: 'bold'
  }}
>
  💬 Confirm on WhatsApp
</Button>
</Space>
</div>
</div>
</div>
  );
};
              
export default OrderConfirmation;

