/**
 * AdminMenu.jsx
 * Admin Menu Management Page.
 * Allows viewing all menu items, adding new items, editing items, and deleting items.
 */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  Tag, 
  Button, 
  Card, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Checkbox, 
  Space, 
  Typography, 
  message, 
  Divider, 
  Row, 
  Col, 
  Tooltip 
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ReloadOutlined, 
  LeftOutlined, 
  LogoutOutlined,
  SearchOutlined 
} from '@ant-design/icons';

import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/format';
import { AuthContext } from '../../context/AuthContext';

const { Title, Text } = Typography;
const { Option } = Select;

const AdminMenu = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter state
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal management states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingItem, setEditingItem] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  const [form] = Form.useForm();

  const loadMenu = async () => {
    try {
      setLoading(true);
      const response = await getMenuItems();
      if (response.success) {
        setMenuItems(response.data);
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to load menu items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const handleLogout = () => {
    authContext.logout();
    navigate('/');
  };

  // Open creation modal
  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Open editor modal and populate fields
  const handleOpenEdit = (item) => {
    setModalMode('edit');
    setEditingItem(item);
    form.setFieldsValue({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      isVeg: item.isVeg,
      isAvailable: item.isAvailable
    });
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    form.resetFields();
  };

  // Submit create or update item form
  const handleFormSubmit = async (values) => {
    try {
      setSubmitLoading(true);
      if (modalMode === 'add') {
        const response = await createMenuItem(values);
        if (response.success) {
          message.success('New menu item created successfully!');
          loadMenu();
          handleCloseModal();
        }
      } else {
        const response = await updateMenuItem(editingItem.id, values);
        if (response.success) {
          message.success('Menu item updated successfully!');
          loadMenu();
          handleCloseModal();
        }
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'Failed to submit form.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Delete menu item with warning verification dialog
  const handleDeleteItem = (item) => {
    Modal.confirm({
      title: 'Delete Menu Item?',
      content: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const response = await deleteMenuItem(item.id);
          if (response.success) {
            message.success('Menu item deleted.');
            loadMenu();
          }
        } catch (error) {
          console.error(error);
          message.error(error.response?.data?.message || 'Failed to delete item.');
        }
      }
    });
  };

  // Client-Side Search and Category Filtering compilation
  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Table Column Configs
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      render: (id) => <strong>#{id}</strong>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text style={{ fontWeight: 600 }}>{text}</Text>
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat) => <Tag color="geekblue">{cat}</Tag>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (val) => <Text style={{ fontWeight: 'bold' }}>{formatCurrency(val)}</Text>
    },
    {
      title: 'Veg/Non-veg',
      dataIndex: 'isVeg',
      key: 'isVeg',
      align: 'center',
      render: (isVeg) => (
        <Tooltip title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}>
          <span style={{ fontSize: '18px' }}>{isVeg ? '🟢' : '🔴'}</span>
        </Tooltip>
      )
    },
    {
      title: 'Available',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      align: 'center',
      render: (isAvail) => (
        <Tag color={isAvail ? 'green' : 'red'}>
          {isAvail ? 'YES' : 'NO'}
        </Tag>
      )
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <span style={{ fontSize: '12px' }}>{formatDate(date)}</span>
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Button 
            size="small" 
            icon={<EditOutlined />} 
            onClick={() => handleOpenEdit(record)} 
          />
          <Button 
            size="small" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteItem(record)} 
          />
        </Space>
      )
    }
  ];

  const categories = ['Breakfast & Parathas', 'Kumaoni Specials', 'Combos', 'Beverages'];

  return (
    <div style={{ background: '#faf7f2', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Navigation Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Space>
            <Button icon={<LeftOutlined />} onClick={() => navigate('/admin/dashboard')}>
              Back to Dashboard
            </Button>
            <Title level={3} style={{ fontFamily: 'Outfit', margin: 0 }}>Menu Item Management</Title>
          </Space>
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Action Controls & Datatable */}
        <Card style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            
            <Space wrap>
              {/* Search Box */}
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search items by name..."
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 220 }}
                allowClear
              />
              
              {/* Category Filter */}
              <Select 
                defaultValue="All" 
                style={{ width: 180 }} 
                onChange={setCategoryFilter}
              >
                <Option value="All">All Categories</Option>
                {categories.map(cat => (
                  <Option key={cat} value={cat}>{cat}</Option>
                ))}
              </Select>
            </Space>

            <Space>
              <Button icon={<ReloadOutlined />} onClick={loadMenu} loading={loading}>
                Refresh
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleOpenAdd}
                style={{ background: '#e85a1e', borderColor: '#e85a1e', fontWeight: 'bold' }}
              >
                Add New Item
              </Button>
            </Space>
          </div>

          <Table
            dataSource={filteredMenuItems}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
            size="middle"
          />
        </Card>

        {/* Creation/Edit Form Modal */}
        <Modal
          title={
            <Space>
              {modalMode === 'add' ? <PlusOutlined style={{ color: '#e85a1e' }} /> : <EditOutlined style={{ color: '#e85a1e' }} />}
              <span>{modalMode === 'add' ? 'Add New Menu Item' : 'Edit Menu Item'}</span>
            </Space>
          }
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{ isVeg: true, isAvailable: true }}
            onFinish={handleFormSubmit}
            style={{ marginTop: '16px' }}
          >
            <Form.Item
              name="name"
              label="Item Name"
              rules={[{ required: true, message: 'Please enter item name' }]}
            >
              <Input placeholder="Enter dish name" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select placeholder="Choose item category">
                {categories.map(cat => (
                  <Option key={cat} value={cat}>{cat}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Enter recipe or dish description" rows={3} />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price (₹)"
              rules={[
                { required: true, message: 'Please specify the price' },
                { type: 'number', min: 0.01, message: 'Price must be greater than 0' }
              ]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Enter price in Rupees" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="isVeg" valuePropName="checked">
                  <Checkbox>Vegetarian Dish (Veg)</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="isAvailable" valuePropName="checked">
                  <Checkbox>Available for Orders</Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Divider style={{ margin: '16px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={submitLoading}
                style={{ background: '#e85a1e', borderColor: '#e85a1e', fontWeight: 'bold' }}
              >
                {modalMode === 'add' ? 'Create Item' : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </Modal>

      </div>
    </div>
  );
};

export default AdminMenu;
