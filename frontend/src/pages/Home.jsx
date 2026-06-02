import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Button, Row, Col, Space, Divider, Tag, Badge, Rate } from 'antd';
import { 
  CheckCircleOutlined, 
  SafetyCertificateOutlined, 
  EnvironmentOutlined, 
  PhoneOutlined,
  RocketOutlined, 
  CoffeeOutlined, 
  HeartOutlined, 
  FireOutlined 
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();

  // Signature Dishes Dummy Data
  const signatureDishes = [
    {
      id: 1,
      name: 'Famous Kumaoni Aloo ke Gutke',
      description: 'Authentic Kumaoni specialty – potato cubes dry-tossed in traditional spices (Jakhiya) and red chillies. Local flavor at its best!',
      price: '₹80',
      isVeg: true,
      tag: 'Kumaoni Specialty'
    },
    {
      id: 2,
      name: 'Poori with Aloo Tamatar Sabzi',
      description: 'Hot, fluffy pooris served with a classic homestyle spiced potato and tomato curry. Perfect for a hearty breakfast.',
      price: '₹60',
      isVeg: true,
      tag: 'Customer Favourite'
    },
    {
      id: 3,
      name: 'Aloo Paratha',
      description: 'Golden whole wheat paratha stuffed with seasoned mashed potatoes, herbs, and mild spices. Served fresh and warm.',
      price: '₹40',
      isVeg: true,
      tag: 'Breakfast Classic'
    },
    {
      id: 4,
      name: 'Masala Poha',
      description: 'Light and fluffy flattened rice roasted with mustard seeds, green chillies, onions, peas, and a touch of turmeric.',
      price: '₹35',
      isVeg: true,
      tag: 'Light & Healthy'
    }
  ];

  // Combos Dummy Data
  const popularCombos = [
    {
      name: 'Aloo ke Gutke + 6 Poori + Mixed Achar',
      description: 'Our signature local combo: authentic Kumaoni spiced potato cubes served with 6 hot pooris and sour mixed pickle.',
      price: '₹150',
      tag: 'Signature Combo'
    },
    {
      name: '6 Poori + Aloo Tamatar Sabzi + Achar + Salad',
      description: 'A complete traditional breakfast platter featuring pooris, potato tomato curry, house pickle, and fresh salad.',
      price: '₹120',
      tag: 'Best Value'
    },
    {
      name: '2 Aloo Paratha with Achar',
      description: 'Two fluffy, stuffed tandoor-style grid-pan aloo parathas served with a side of mixed pickle. The ultimate comfort food.',
      price: '₹80',
      tag: 'Pocket Friendly'
    }
  ];

  // Beverages Dummy Data
  const beverages = [
    {
      name: 'Special Elaichi Chai',
      description: 'Fragrant, homemade cardamom tea brewed slowly to perfection. A warm, aromatic delight.',
      price: '₹20'
    },
    {
      name: 'Masala Tea',
      description: 'Rich spiced tea infused with a blend of local Kumaoni spices, ginger, and cardamom.',
      price: '₹25'
    },
    {
      name: 'Fresh Homemade Coffee',
      description: 'Freshly whipped, smooth, and frothy homemade coffee served hot to complement your meal.',
      price: '₹30'
    }
  ];

  return (
    <div style={{ background: '#faf7f2', minHeight: '100vh', paddingBottom: '48px' }}>
      
      {/* SECTION 1: HERO */}
      <div className="hero-gradient" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Swiggy/Zomato Style Delivery Rating Banner */}
          <Space direction="vertical" style={{ marginBottom: '24px' }}>
            <Badge 
              count={
                <span style={{ 
                  backgroundColor: '#52c41a', 
                  color: '#fff', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  fontWeight: 'bold', 
                  fontSize: '14px', 
                  boxShadow: '0 2px 8px rgba(82, 196, 26, 0.2)' 
                }}>
                  ⭐ 4.4/5 Delivery Rating (763+ Ratings)
                </span>
              }
            />
          </Space>

          <Title level={1} style={{ fontSize: '48px', margin: '0 0 16px 0', color: '#1c1a17', fontFamily: 'Outfit', fontWeight: 800 }}>
            Uma Home Kitchen
          </Title>
          
          <Title level={3} style={{ color: '#e85a1e', fontWeight: 600, marginTop: 0, fontFamily: 'Outfit' }}>
            "Homemade Taste, Delivered Fresh."
          </Title>
          
          <Title level={4} style={{ color: '#555', fontWeight: 400, fontSize: '18px', maxWidth: '650px', margin: '16px auto 32px auto' }}>
            Enjoy authentic Kumaoni specials and home-style North Indian breakfast & lunch combos, prepared hygienically and delivered right to your doorstep in Haldwani.
          </Title>

          <Space size="middle" wrap>
            <Button 
              type="primary" 
              size="large" 
              onClick={() => navigate('/menu')} 
              style={{ background: '#e85a1e', borderColor: '#e85a1e', height: '50px', padding: '0 32px', borderRadius: '8px', fontWeight: 'bold' }}
            >
              Order Online / View Menu
            </Button>
            <Button 
              size="large" 
              icon={<PhoneOutlined />} 
              href="tel:+918954327490"
              style={{ height: '50px', padding: '0 32px', borderRadius: '8px', fontWeight: 'bold', borderColor: '#8b5a2b', color: '#8b5a2b' }}
            >
              Call to Order (+91 89543 27490)
            </Button>
          </Space>
        </div>
      </div>

      {/* SECTION 2: WHY CUSTOMERS CHOOSE US */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Title level={2} style={{ fontFamily: 'Outfit', fontWeight: 700 }}>Why Customers Choose Us</Title>
          <div style={{ width: '60px', height: '4px', background: '#e85a1e', margin: '12px auto 0 auto', borderRadius: '2px' }} />
        </div>

        <Row gutter={[24, 24]}>
          {[
            {
              icon: <HeartOutlined style={{ fontSize: '32px', color: '#e85a1e' }} />,
              title: 'Homemade Goodness',
              desc: 'Freshly prepared food cooked using traditional home recipes, ensuring the clean taste of a home kitchen.'
            },
            {
              icon: <CheckCircleOutlined style={{ fontSize: '32px', color: '#e85a1e' }} />,
              title: 'Hygienic Preparation',
              desc: 'Strict hygiene protocols observed at every stage, from vegetable washing to food container packing.'
            },
            {
              icon: <FireOutlined style={{ fontSize: '32px', color: '#e85a1e' }} />,
              title: 'Kumaoni Specialties',
              desc: 'Relish authentic regional flavors of Uttarakhand, like our famous, seasoned Aloo ke Gutke.'
            },
            {
              icon: <RocketOutlined style={{ fontSize: '32px', color: '#e85a1e' }} />,
              title: 'Quick Home Delivery',
              desc: 'Packed in food-grade insulated packaging and delivered hot to your Haldwani location within 30-40 minutes.'
            },
            {
              icon: <SafetyCertificateOutlined style={{ fontSize: '32px', color: '#e85a1e' }} />,
              title: 'FSSAI Certified',
              desc: 'We operate a registered delivery kitchen. FSSAI License Registration Number: 22623038001187.'
            },
            {
              icon: <CoffeeOutlined style={{ fontSize: '32px', color: '#e85a1e' }} />,
              title: 'Pocket-Friendly Combos',
              desc: 'Nourishing, single-serving breakfast and meal combos configured to offer clean food at accessible prices.'
            }
          ].map((item, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card style={{ height: '100%', textAlign: 'center', padding: '12px 0' }}>
                <div style={{ marginBottom: '16px' }}>{item.icon}</div>
                <Title level={4} style={{ fontSize: '18px', margin: '0 0 8px 0', fontFamily: 'Outfit' }}>{item.title}</Title>
                <Paragraph style={{ color: '#666', margin: 0 }}>{item.desc}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* SECTION 3: SIGNATURE DISHES */}
      <div style={{ background: '#fff', borderTop: '1px solid #f0eae1', borderBottom: '1px solid #f0eae1', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title level={2} style={{ fontFamily: 'Outfit', fontWeight: 700 }}>Signature Dishes</Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>Taste our local Kumaoni specialty and other fresh favorites</Text>
            <div style={{ width: '60px', height: '4px', background: '#e85a1e', margin: '12px auto 0 auto', borderRadius: '2px' }} />
          </div>

          <Row gutter={[24, 24]}>
            {signatureDishes.map((dish) => (
              <Col xs={24} sm={12} md={6} key={dish.id}>
                {/* Highlight Aloo ke Gutke with a badge */}
                <Badge.Ribbon text={dish.tag} color={dish.id === 1 ? '#e85a1e' : '#8b5a2b'}>
                  <Card 
                    hoverable
                    style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    cover={
                      <div style={{ 
                        height: '140px', 
                        background: '#fff3eb', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        borderBottom: '1px solid #f8e9df'
                      }}>
                        <Text style={{ fontSize: '32px' }}>{dish.id === 1 ? '🥔' : dish.id === 2 ? '🥞' : dish.id === 3 ? '🫓' : '🍚'}</Text>
                      </div>
                    }
                  >
                    <div style={{ marginBottom: '16px' }}>
                      <Space style={{ marginBottom: '6px' }}>
                        <Tag color="green">VEG</Tag>
                      </Space>
                      <Title level={4} style={{ fontSize: '16px', margin: '4px 0', fontFamily: 'Outfit' }}>{dish.name}</Title>
                      <Paragraph style={{ color: '#666', fontSize: '13px', margin: '8px 0 0 0', lineBreak: 'strict' }} ellipsis={{ rows: 3 }}>
                        {dish.description}
                      </Paragraph>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f5f5f5', paddingTop: '12px' }}>
                      <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#e85a1e' }}>{dish.price}</Text>
                      <Button size="small" type="primary" style={{ background: '#e85a1e', borderColor: '#e85a1e' }} onClick={() => navigate('/menu')}>
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* SECTION 4: POPULAR COMBOS */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Title level={2} style={{ fontFamily: 'Outfit', fontWeight: 700 }}>Popular Meal Combos</Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>Freshly packaged satisfying meal combinations</Text>
          <div style={{ width: '60px', height: '4px', background: '#e85a1e', margin: '12px auto 0 auto', borderRadius: '2px' }} />
        </div>

        <Row gutter={[24, 24]}>
          {popularCombos.map((combo, index) => (
            <Col xs={24} md={8} key={index}>
              <Badge.Ribbon text={combo.tag} color="#52c41a">
                <Card 
                  hoverable
                  style={{ height: '100%' }}
                  cover={
                    <div style={{ 
                      height: '140px', 
                      background: '#effaf0', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      borderBottom: '1px solid #e1f4e3'
                    }}>
                      <Text style={{ fontSize: '36px' }}>🍱</Text>
                    </div>
                  }
                >
                  <div style={{ height: '120px' }}>
                    <Space style={{ marginBottom: '6px' }}>
                      <Tag color="green">VEG</Tag>
                    </Space>
                    <Title level={4} style={{ fontSize: '16px', margin: '4px 0', fontFamily: 'Outfit' }}>{combo.name}</Title>
                    <Paragraph style={{ color: '#666', fontSize: '13px', margin: '8px 0 0 0' }}>
                      {combo.description}
                    </Paragraph>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f5f5f5', paddingTop: '12px', marginTop: '12px' }}>
                    <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#e85a1e' }}>{combo.price}</Text>
                    <Button size="small" type="primary" style={{ background: '#e85a1e', borderColor: '#e85a1e' }} onClick={() => navigate('/menu')}>
                      Order Combo
                    </Button>
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      </div>

      {/* SECTION 5: BEVERAGES */}
      <div style={{ background: '#fff', borderTop: '1px solid #f0eae1', borderBottom: '1px solid #f0eae1', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title level={2} style={{ fontFamily: 'Outfit', fontWeight: 700 }}>Complementary Beverages</Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>Freshly brewed local teas and homemade frothy coffees</Text>
            <div style={{ width: '60px', height: '4px', background: '#e85a1e', margin: '12px auto 0 auto', borderRadius: '2px' }} />
          </div>

          <Row gutter={[24, 24]}>
            {beverages.map((bev, index) => (
              <Col xs={24} md={8} key={index}>
                <Card style={{ height: '100%', borderLeft: '4px solid #8b5a2b' }}>
                  <Space style={{ marginBottom: '6px' }}>
                    <Tag color="green">VEG</Tag>
                  </Space>
                  <Title level={4} style={{ fontSize: '16px', margin: '4px 0', fontFamily: 'Outfit' }}>{bev.name}</Title>
                  <Paragraph style={{ color: '#666', fontSize: '13px', margin: '8px 0 16px 0' }}>
                    {bev.description}
                  </Paragraph>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#8b5a2b' }}>{bev.price}</Text>
                    <Button size="small" onClick={() => navigate('/menu')} style={{ color: '#8b5a2b', borderColor: '#8b5a2b' }}>
                      Add Drink
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* SECTION 6: DELIVERY & LOCATION DETAILS */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px 24px 24px' }}>
        <Card style={{ 
          background: 'linear-gradient(135deg, #fffcf5 0%, #fff6ef 100%)', 
          border: '1px solid rgba(232, 90, 30, 0.15) !important',
          boxShadow: '0 8px 30px rgba(232, 90, 30, 0.06)'
        }}>
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={14}>
              <Title level={3} style={{ color: '#1c1a17', fontFamily: 'Outfit', fontWeight: 700, margin: '0 0 16px 0' }}>
                Delivery-Only Kitchen in Haldwani
              </Title>
              <Paragraph style={{ color: '#555', fontSize: '14px', lineHeight: '1.6' }}>
                We operate a clean, dedicated food preparation kitchen. To ensure maximum food safety and freshness, we focus exclusively on home delivery and take-away pre-orders.
              </Paragraph>
              
              <Space direction="vertical" size="small" style={{ marginBottom: '24px' }}>
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px' }}>
                  <EnvironmentOutlined style={{ color: '#e85a1e', marginTop: '4px' }} />
                  <span><strong>Kitchen Address:</strong> 288, Talli Barmori, Haldwani, Uttarakhand</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                  <SafetyCertificateOutlined style={{ color: '#52c41a' }} />
                  <span><strong>FSSAI Registration No:</strong> 22623038001187</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#d9363e' }}>
                  <FireOutlined />
                  <span><strong>No Dine-In Available</strong> (Delivery & Pick-Up Only)</span>
                </span>
              </Space>
            </Col>

            <Col xs={24} md={10} style={{ textAlign: 'center' }}>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #f3ebe3' }}>
                <Text style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                  Place Your Order Directly Via Call:
                </Text>
                <Title level={3} style={{ color: '#e85a1e', margin: '0 0 16px 0', fontFamily: 'Outfit' }}>
                  +91 89543 27490
                </Title>
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<PhoneOutlined />}
                  href="tel:+918954327490"
                  style={{ width: '100%', background: '#e85a1e', borderColor: '#e85a1e', fontWeight: 'bold' }}
                >
                  Call Now to Order
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

    </div>
  );
};

export default Home;
