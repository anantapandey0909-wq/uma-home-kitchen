import React from 'react';
import { Typography, Card, Row, Col, Space, Button, Empty, Divider, List } from 'antd';
import { 
  HeartOutlined, 
  SafetyCertificateOutlined, 
  EnvironmentOutlined, 
  PhoneOutlined,
  CompassOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const About = () => {
  return (
    <div style={{ background: '#faf7f2', minHeight: '100vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={2} style={{ fontFamily: 'Outfit', fontWeight: 800 }}>About Uma Home Kitchen</Title>
          <div style={{ width: '50px', height: '3px', background: '#e85a1e', margin: '12px auto 0 auto', borderRadius: '2px' }} />
        </div>

        {/* Section 1: Story */}
        <Card style={{ marginBottom: '32px' }}>
          <Title level={3} style={{ fontFamily: 'Outfit', color: '#e85a1e', fontWeight: 700 }}>Our Story & Culinary Philosophy</Title>
          <Paragraph style={{ fontSize: '15px', lineHeight: '1.7', color: '#444' }}>
            At <strong>Uma Home Kitchen</strong>, we believe that clean, homemade food is the key to good health and happiness. We serve fresh, hygienic, home-style North Indian food prepared with authentic local Kumaoni flavors.
          </Paragraph>
          <Paragraph style={{ fontSize: '15px', lineHeight: '1.7', color: '#444' }}>
            Operating as a dedicated, delivery-only kitchen in Haldwani, we focus entirely on sourcing quality regional ingredients and preparing meals in small batches. This ensures that every order placed carries the distinct, aromatic warmth of a traditional family recipe. From our signature Kumaoni <strong>Aloo ke Gutke</strong> dry-spiced potatoes to soft stuffed parathas, everything is prepared to order.
          </Paragraph>
        </Card>

        {/* Section 2: Why Customers Choose Us */}
        <Card style={{ marginBottom: '32px' }}>
          <Title level={3} style={{ fontFamily: 'Outfit', marginBottom: '20px', fontWeight: 700 }}>Why Customers Choose Us</Title>
          
          <Row gutter={[16, 16]}>
            {[
              'Freshly prepared homemade food made on order',
              'Strict hygienic cooking conditions and clean packaging',
              'Affordable and nourishing breakfast and lunch combos',
              'Authentic regional Kumaoni specials and spices',
              'Quick delivery service across local Haldwani areas',
              'FSSAI Licensed kitchen operating under registration standards'
            ].map((point, index) => (
              <Col xs={24} sm={12} key={index}>
                <Space align="start">
                  <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px', marginTop: '3px' }} />
                  <Text style={{ fontSize: '14px', color: '#444' }}>{point}</Text>
                </Space>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Section 3: Contact & Google Maps Placeholder */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card style={{ height: '100%' }} title="Contact Information">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>KITCHEN LOCATION</Text>
                  <Space align="start" style={{ marginTop: '4px' }}>
                    <EnvironmentOutlined style={{ color: '#e85a1e', fontSize: '16px' }} />
                    <Text style={{ fontSize: '14px' }}>
                      288, Talli Barmori, Haldwani, Uttarakhand - 263139
                    </Text>
                  </Space>
                </div>

                <div>
                  <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>ORDER CONTACT PHONE</Text>
                  <Space align="start" style={{ marginTop: '4px' }}>
                    <PhoneOutlined style={{ color: '#e85a1e', fontSize: '16px' }} />
                    <a href="tel:+918954327490" style={{ fontSize: '15px', fontWeight: 'bold', color: '#e85a1e' }}>
                      +91 89543 27490
                    </a>
                  </Space>
                </div>

                <div>
                  <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>FSSAI LICENSING STATUS</Text>
                  <Space align="start" style={{ marginTop: '4px' }}>
                    <SafetyCertificateOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                    <Text style={{ fontSize: '14px' }}>
                      FSSAI Licensed Kitchen – No: 22623038001187
                    </Text>
                  </Space>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }} title="Kitchen Location Map">
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderRadius: '8px', padding: '24px', minHeight: '180px' }}>
                <iframe
  src="https://www.google.com/maps?q=Uma%20Home%20Kitchen%20Haldwani&output=embed"
  width="100%"
  height="350"
  style={{
    border: 0,
    borderRadius: '12px'
  }}
  loading="lazy"
  allowFullScreen
  title="Uma Home Kitchen Location"
/>
              </div>
            </Card>
          </Col>
        </Row>

      </div>
    </div>
  );
};

export default About;
