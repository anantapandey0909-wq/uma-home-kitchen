/**
 * Menu.jsx
 * Implements the full ordering flow for Uma Home Kitchen.
 * - Fetches available menu items from backend API.
 * - Manages shopping cart state via CartContext.
 * - Handles order submission and routes to Order Confirmation.
 */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Spin, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Tabs, 
  Button, 
  Tag, 
  Space, 
  Empty, 
  List, 
  InputNumber, 
  Form, 
  Input, 
  Select, 
  message,
  Affix,
  Divider
} from 'antd';
import { 
  ShoppingCartOutlined, 
  DeleteOutlined, 
  PlusOutlined, 
  MinusOutlined,
  CheckCircleOutlined,
  ShoppingOutlined
} from '@ant-design/icons';

import { getMenu, createOrder, createPaymentOrder } from '../services/api';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/format';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const Menu = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    cartItemCount 
  } = useContext(CartContext);

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [customerLocation, setCustomerLocation] = useState(null);
const [locationLoading, setLocationLoading] = useState(false);
const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }

  setLocationLoading(true);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
  latitude: position.coords.latitude,
  longitude: position.coords.longitude
};

console.log(location);
setCustomerLocation(location);

      setLocationLoading(false);
      alert('Location captured successfully!');
    },
    (error) => {
      console.error(error);
      setLocationLoading(false);
      alert('Unable to get your location');
    }
  );
};
  
  const [form] = Form.useForm();
  const cartSectionRef = useRef(null);

  // Fetch Menu Items on mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await getMenu();
        if (response.success) {
          setMenuItems(response.data);
        } else {
          setError('Failed to load menu items.');
        }
      } catch (err) {
        console.error(err);
        setError('Error connecting to backend API. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();

    // Scroll to cart if URL contains hash #cart-section
    if (window.location.hash === '#cart-section' && cartSectionRef.current) {
      setTimeout(() => {
        cartSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  const categories = ['All', 'Breakfast & Parathas', 'Kumaoni Specials', 'Combos', 'Beverages'];

  // Filter items by category
  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Scroll smoothly to cart section
  const scrollToCart = () => {
    if (cartSectionRef.current) {
      cartSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Submit Order to Backend
  const handleOnlinePayment = async (amount) => {
  try {
  

    console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

    const paymentResponse = await createPaymentOrder(amount);

    console.log("Payment Response:", paymentResponse);
    console.log("Window Razorpay:", window.Razorpay);

  

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: paymentResponse.order.amount,
      currency: paymentResponse.order.currency,
      name: 'Uma Home Kitchen',
      description: 'Food Order Payment',
      order_id: paymentResponse.order.id,

      handler: async function (response) {
        message.success('Payment Successful!');
        console.log('Razorpay Response:', response);

        // We will place the order after successful payment
      },

      theme: {
        color: '#e85a1e'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
  console.error('RAZORPAY ERROR:', error);
  message.error(
    error?.response?.data?.message ||
    error?.message ||
    'Failed to initiate payment'
  );
}
};
  const handleCheckout = async (values) => {
    console.log("Selected Payment Method:", values.paymentMethod);
    if (cart.length === 0) {
      message.error('Your cart is empty! Add items to cart before checking out.');
      return;
    }

    try {
      setSubmittingOrder(true);
      
      const orderData = {
        customerName: values.customerName,
        phone: values.phone,
        email:values.email,
        address: values.address,
        deliveryTime: values.deliveryTime,
        paymentMethod: values.paymentMethod,
        items: cart.map(item => ({
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: cartTotal,
        latitude: customerLocation?.latitude,
longitude: customerLocation?.longitude,
      };
if (values.paymentMethod === 'online') {
  await handleOnlinePayment(cartTotal);
  return;
}
      const response = await createOrder(orderData);
      
      if (response.success) {
        message.success('Order placed successfully!');
        clearCart();
        form.resetFields();
        // Redirect to confirmation and pass the receipt details via state
        navigate('/order-confirmation', { state: { order: response.data } });
      } else {
        message.error(response.message || 'Failed to place order.');
      }
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || 'Failed to connect to server to place order.');
    } finally {
      setSubmittingOrder(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: '16px' }}>
        <Spin size="large" tip="Loading fresh menu..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '64px 24px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <Empty 
          description={
            <Space direction="vertical">
              <Text type="danger" style={{ fontSize: '16px', fontWeight: 'bold' }}>{error}</Text>
              <Text type="secondary">Please verify backend server connectivity and database setups.</Text>
            </Space>
          } 
        />
        <Button type="primary" onClick={() => window.location.reload()} style={{ marginTop: '24px', background: '#e85a1e', borderColor: '#e85a1e' }}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div style={{ background: '#faf7f2', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Banner Section */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ fontFamily: 'Outfit', fontWeight: 800, margin: 0 }}>Our Kitchen Menu</Title>
          <Paragraph type="secondary" style={{ fontSize: '15px', marginTop: '8px' }}>
            Fresh Homemade North Indian & Kumaoni Food
          </Paragraph>
          <div style={{ width: '50px', height: '3px', background: '#e85a1e', margin: '12px auto 0 auto', borderRadius: '2px' }} />
        </div>

        <Row gutter={[24, 24]}>
          
          {/* LEFT COLUMN: Menu Filters and Grid List */}
          <Col xs={24} lg={cartItemCount > 0 ? 16 : 24}>
            
            {/* Category Filter Tabs */}
            <Tabs 
              activeKey={activeCategory} 
              onChange={setActiveCategory}
              centered
              items={categories.map(cat => ({
                key: cat,
                label: <span style={{ fontWeight: 600, fontSize: '15px' }}>{cat}</span>
              }))}
              style={{ marginBottom: '24px' }}
            />

            {filteredItems.length === 0 ? (
              <Card>
                <Empty description={`No items found in category "${activeCategory}"`} />
              </Card>
            ) : (
              <Row gutter={[16, 16]}>
                {filteredItems.map(item => (
                  <Col xs={24} sm={12} key={item.id}>
                    <Card 
                      style={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        opacity: item.isAvailable ? 1 : 0.6
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <Space size="small">
                            {item.isVeg ? <Tag color="green">VEG</Tag> : <Tag color="red">NON-VEG</Tag>}
                            {item.category === 'Kumaoni Specials' && <Tag color="orange">Kumaoni Special</Tag>}
                          </Space>
                          <Text style={{ fontWeight: 'bold', fontSize: '16px', color: '#e85a1e' }}>
                            {formatCurrency(item.price)}
                          </Text>
                        </div>
                        <Title level={4} style={{ fontSize: '16px', margin: '4px 0', fontFamily: 'Outfit' }}>
                          {item.name}
                        </Title>
                        <Paragraph type="secondary" style={{ fontSize: '13px', margin: '8px 0 0 0' }}>
                          {item.description || 'No description available.'}
                        </Paragraph>
                      </div>

                      <div style={{ marginTop: '16px', borderTop: '1px solid #f5f5f5', paddingTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                        {item.isAvailable ? (
                          <Button 
                            type="primary" 
                            size="small" 
                            icon={<ShoppingCartOutlined />}
                            onClick={() => addToCart(item)}
                            style={{ background: '#e85a1e', borderColor: '#e85a1e' }}
                          >
                            Add to Cart
                          </Button>
                        ) : (
                          <Button size="small" disabled>
                            Unavailable
                          </Button>
                        )}
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>

          {/* RIGHT COLUMN: Sticky Cart & Checkout form */}
          {cartItemCount > 0 && (
            <Col xs={24} lg={8}>
              <Affix offsetTop={80}>
                <div className="sticky-cart-summary">
                  
                  {/* Cart Overview Itemized Card */}
                  <Card 
                    title={
                      <Space>
                        <ShoppingCartOutlined style={{ color: '#e85a1e' }} />
                        <span>Shopping Cart ({cartItemCount})</span>
                      </Space>
                    }
                    extra={
                      <Button type="link" danger onClick={clearCart} style={{ padding: 0 }}>
                        Clear
                      </Button>
                    }
                    style={{ marginBottom: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                  >
                    <List
                      dataSource={cart}
                      renderItem={item => (
                        <List.Item 
                          style={{ padding: '12px 0' }}
                          actions={[
                            <Space size="small">
                              <Button 
                                size="small" 
                                icon={<MinusOutlined />} 
                                onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                              />
                              <Text style={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}>
                                {item.quantity}
                              </Text>
                              <Button 
                                size="small" 
                                icon={<PlusOutlined />} 
                                onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                              />
                            </Space>,
                            <Button 
                              type="text" 
                              danger 
                              icon={<DeleteOutlined />} 
                              onClick={() => removeFromCart(item.menuItemId)} 
                            />
                          ]}
                        >
                          <List.Item.Meta
                            title={<span style={{ fontSize: '13px', fontWeight: 600 }}>{item.name}</span>}
                            description={
                              <Space style={{ fontSize: '12px' }}>
                                <span>{formatCurrency(item.price)} each</span>
                                <span style={{ color: '#aaa' }}>|</span>
                                <span style={{ fontWeight: 'bold', color: '#e85a1e' }}>
                                  Subtotal: {formatCurrency(item.price * item.quantity)}
                                </span>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                    
                    <Divider style={{ margin: '16px 0' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>Grand Total:</Text>
                      <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#e85a1e' }}>
                        {formatCurrency(cartTotal)}
                      </Text>
                    </div>

                    <Button 
                      type="primary" 
                      block 
                      size="large" 
                      onClick={scrollToCart}
                      style={{ marginTop: '16px', background: '#52c41a', borderColor: '#52c41a', fontWeight: 'bold' }}
                    >
                      Proceed to Checkout
                    </Button>
                  </Card>

                </div>
              </Affix>
            </Col>
          )}

        </Row>

        {/* CART & CHECKOUT FORM SECTION */}
        {cart.length > 0 && (
          <div ref={cartSectionRef} id="cart-section" style={{ marginTop: '48px' }}>
            <Card title="Checkout & Delivery Details" style={{ borderTop: '4px solid #52c41a' }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleCheckout}
                initialValues={{ deliveryTime: '30-40 mins' }}
              >
                <Row gutter={24}>
                  
                  {/* Customer Information */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="customerName"
                      label="Your Name"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input placeholder="Enter your full name" size="large" />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label="Contact Phone Number"
                      rules={[
                        { required: true, message: 'Please enter your phone number' },
                        { pattern: /^\d{10,}$/, message: 'Please enter a valid phone number (at least 10 digits)' }
                      ]}
                    >
                      <Input placeholder="Enter 10-digit mobile number" size="large" />
                    </Form.Item>
<Form.Item
  name="email"
  label="Email Address"
  rules={[
    { required: true, message: 'Please enter your email address' },
    { type: 'email', message: 'Please enter a valid email address' }
  ]}
>
  <Input
    placeholder="Enter your email address"
    size="large"
  />
</Form.Item>

                    <Form.Item
                      name="deliveryTime"
                      label="Preferred Delivery Time"
                      rules={[{ required: true, message: 'Please choose or enter a delivery time' }]}
                    >
                      <Select size="large">
                        <Option value="As soon as possible">As soon as possible (30-45 mins)</Option>
                        <Option value="30-40 mins">30-40 minutes</Option>
                        <Option value="1 hour">Within 1 hour</Option>
                        <Option value="Specific time pre-order">Pre-order for later</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Form.Item
  label="Payment Method"
  name="paymentMethod"
  initialValue="cod"
>
  <Select
    size="large"
    onChange={(value) => setPaymentMethod(value)}
  >
    <Option value="cod">Cash on Delivery</Option>
    <Option value="online">Pay Online (Razorpay)</Option>
  </Select>
</Form.Item>

                  {/* Delivery Location */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="address"
                      label="Full Delivery Address"
                      rules={[{ required: true, message: 'Please enter your delivery address' }]}
                      
                    >
                      <Input.TextArea 
                        rows={6} 
                        placeholder="Enter your complete home, flat, or kitchen location address in Haldwani (e.g. 288, Talli Barmori, near landmark)" 
                        size="large"
                      />
                    </Form.Item>
                    <Button
  type="dashed"
  onClick={getCurrentLocation}
  loading={locationLoading}
  style={{ marginTop: '8px' }}
>
  📍 Use My Current Location
</Button>
{customerLocation && (
  <div style={{ marginTop: '8px', color: 'green' }}>
    ✅ Location captured

    <br />

    Lat: {customerLocation.latitude}

    <br />

    Lng: {customerLocation.longitude}
  </div>
)}
                  </Col>

                </Row>

                <div style={{ textAlign: 'center', marginTop: '24px', borderTop: '1px solid #f0f0f0', paddingTop: '24px' }}>
                  <Text style={{ display: 'block', fontSize: '15px', marginBottom: '12px' }}>
                    Order Total: <strong style={{ color: '#e85a1e', fontSize: '18px' }}>{formatCurrency(cartTotal)}</strong>
                  </Text>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    icon={<ShoppingOutlined />}
                    loading={submittingOrder}
                    style={{ background: '#52c41a', borderColor: '#52c41a', height: '50px', padding: '0 40px', fontWeight: 'bold' }}
                  >
                    Place Delivery Order Now
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;
