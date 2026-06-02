/**
 * AdminOrders.jsx
 * Admin Orders Management Page.
 * Allows viewing all orders, filtering by status, viewing details, and updating status.
 */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  Tag, 
  Button, 
  Card, 
  Modal, 
  Select, 
  Space, 
  Typography, 
  message, 
  Divider, 
  Form, 
  Row, 
  Col 
} from 'antd';
import { 
  EyeOutlined, 
  ReloadOutlined, 
  LeftOutlined, 
  LogoutOutlined,
  EditOutlined 
} from '@ant-design/icons';

import { getOrders, updateOrderStatus } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/format';
import { AuthContext } from '../../context/AuthContext';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const AdminOrders = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal configurations
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [form] = Form.useForm();

  // Load orders on mount or when filter status changes
  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders(statusFilter);
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'Failed to fetch customer orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const handleLogout = () => {
    authContext.logout();
    navigate('/');
  };

  // Status mapping to Antd tag colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'In Kitchen': return 'blue';
      case 'Out for Delivery': return 'cyan';
      case 'Completed': return 'green';
      case 'Cancelled': return 'red';
      default: return 'default';
    }
  };

  // Open detail overlay modal
  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    form.setFieldsValue({ status: order.status });
    setIsModalOpen(true);
  };

  // Close detail overlay modal
  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  // Handle status update form submission
  const handleUpdateStatus = async (values) => {
    if (!selectedOrder) return;
    try {
      setUpdateLoading(true);
      const response = await updateOrderStatus(selectedOrder.id, values.status);
      if (response.success) {
        message.success(`Order status updated to "${values.status}"`);
        loadOrders();
        handleCloseDetails();
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'Failed to update order status.');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Datatable column configs
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      width: 90,
      render: (id) => <Text style={{ fontWeight: 'bold' }}>#{id}</Text>
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <Text style={{ fontWeight: 600 }}>{text}</Text>
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Delivery Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
      render: (addr) => <Text style={{ fontSize: '13px' }}>{addr}</Text>
    },
    {
      title: 'Preferred Time',
      dataIndex: 'deliveryTime',
      key: 'deliveryTime'
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'right',
      render: (val) => <Text style={{ fontWeight: 'bold', color: '#e85a1e' }}>{formatCurrency(val)}</Text>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => (
        <Tag color={getStatusColor(status)} style={{ fontWeight: 'bold' }}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <span style={{ fontSize: '12px' }}>{formatDate(date)}</span>
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Button 
          type="primary" 
          size="small" 
          icon={<EyeOutlined />} 
          onClick={() => handleOpenDetails(record)}
          style={{ background: '#e85a1e', borderColor: '#e85a1e' }}
        >
          Details
        </Button>
      )
    }
  ];

  // Modal itemized list column configs
  const itemColumns = [
    {
      title: 'Menu Item',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <Text style={{ fontWeight: 500 }}>{name}</Text>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (p) => formatCurrency(p)
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (q) => <strong>x{q}</strong>
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      align: 'right',
      render: (_, record) => formatCurrency(record.price * record.quantity)
    }
  ];

  const validStatuses = ['Pending', 'In Kitchen', 'Out for Delivery', 'Completed', 'Cancelled'];

  return (
    <div style={{ background: '#faf7f2', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Navigation Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Space>
            <Button icon={<LeftOutlined />} onClick={() => navigate('/admin/dashboard')}>
              Back to Dashboard
            </Button>
            <Title level={3} style={{ fontFamily: 'Outfit', margin: 0 }}>Customer Orders</Title>
          </Space>
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Filters and Datatable Card */}
        <Card style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            
            {/* Status Filter */}
            <Space align="center">
              <Text style={{ fontWeight: 'bold' }}>Filter by Status:</Text>
              <Select 
                defaultValue="All" 
                style={{ width: 160 }} 
                onChange={setStatusFilter}
              >
                <Option value="All">All Statuses</Option>
                {validStatuses.map(status => (
                  <Option key={status} value={status}>{status}</Option>
                ))}
              </Select>
            </Space>

            <Button type="primary" icon={<ReloadOutlined />} onClick={loadOrders} loading={loading}>
              Refresh Orders
            </Button>
          </div>

          <Table
            dataSource={orders}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
            size="middle"
          />
        </Card>

        {/* View Details / Update Status Modal */}
        <Modal
          title={
            <Space>
              <EyeOutlined style={{ color: '#e85a1e' }} />
              <span>Order Details - #{selectedOrder?.id}</span>
            </Space>
          }
          open={isModalOpen}
          onCancel={handleCloseDetails}
          footer={null}
          width={700}
        >
          {selectedOrder && (
            <div>
              <Divider style={{ margin: '12px 0' }} />
              
              {/* Customer Metadata grid */}
              <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
                <Col xs={24} sm={12}>
                  <Text type="secondary" style={{ display: 'block', fontSize: '11px' }}>CUSTOMER NAME</Text>
                  <Text style={{ fontSize: '14px', fontWeight: 600 }}>{selectedOrder.customerName}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text type="secondary" style={{ display: 'block', fontSize: '11px' }}>PHONE NUMBER</Text>
                  <Text style={{ fontSize: '14px', fontWeight: 600 }}>{selectedOrder.phone}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text type="secondary" style={{ display: 'block', fontSize: '11px' }}>DELIVERY PREFERENCE</Text>
                  <Text style={{ fontSize: '14px', fontWeight: 600 }}>{selectedOrder.deliveryTime}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text type="secondary" style={{ display: 'block', fontSize: '11px' }}>ORDER DATE</Text>
                  <Text style={{ fontSize: '14px', fontWeight: 600 }}>{formatDate(selectedOrder.createdAt)}</Text>
                </Col>
                <Col xs={24}>
                  <Text type="secondary" style={{ display: 'block', fontSize: '11px' }}>DELIVERY ADDRESS</Text>
                  <Text style={{ fontSize: '13px', fontWeight: 600 }}>{selectedOrder.address}</Text>
                </Col>
              </Row>

              <Divider style={{ margin: '16px 0' }} />

              {/* Itemized summary table */}
              <Table
                dataSource={selectedOrder.items}
                columns={itemColumns}
                rowKey={(record, idx) => idx}
                pagination={false}
                size="small"
                style={{ marginBottom: '16px' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9f9f9', padding: '12px 16px', borderRadius: '4px', marginBottom: '24px' }}>
                <Text style={{ fontSize: '15px', fontWeight: 'bold' }}>Total Amount:</Text>
                <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#e85a1e' }}>
                  {formatCurrency(selectedOrder.totalAmount)}
                </Text>
              </div>

              <Divider style={{ margin: '16px 0' }} />

              {/* Update Status form */}
              <Card size="small" title="Update Order Progress Status" style={{ background: '#fcfbf9' }}>
                <Form
                  form={form}
                  layout="inline"
                  onFinish={handleUpdateStatus}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Form.Item
                    name="status"
                    style={{ flex: 1, marginRight: '16px' }}
                  >
                    <Select size="middle" style={{ width: '100%' }}>
                      {validStatuses.map(status => (
                        <Option key={status} value={status}>{status}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={updateLoading}
                      icon={<EditOutlined />}
                      style={{ background: '#52c41a', borderColor: '#52c41a' }}
                    >
                      Update Status
                    </Button>
                  </Form.Item>
                </Form>
              </Card>

            </div>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default AdminOrders;
