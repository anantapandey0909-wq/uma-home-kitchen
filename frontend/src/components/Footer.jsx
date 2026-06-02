import React from 'react';
import { Layout as AntLayout, Typography as AntTypography, Row as AntRow, Col as AntCol, Space as AntSpace, Divider } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = AntLayout;
const { Title, Text } = AntTypography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="footer-container" style={{ background: '#1c1a17', color: '#a8a29e', borderTop: '4px solid #e85a1e' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <AntRow gutter={[32, 32]}>
          <AntCol xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: '#ffffff', fontFamily: 'Outfit', marginBottom: '16px' }}>
              Uma Home Kitchen
            </Title>
            <Text style={{ color: '#a8a29e', display: 'block', marginBottom: '12px' }}>
              Homemade taste, delivered fresh. Enjoy warm, hygienic North Indian meals and authentic Kumaoni specials prepared with love in our local Haldwani kitchen.
            </Text>
          </AntCol>

          <AntCol xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: '#ffffff', fontFamily: 'Outfit', marginBottom: '16px' }}>
              Contact & Location
            </Title>
            <AntSpace direction="vertical" size="small">
              <span style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <EnvironmentOutlined style={{ color: '#e85a1e', marginTop: '4px' }} />
                <span>288, Talli Barmori, Haldwani, Uttarakhand - 263139</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneOutlined style={{ color: '#e85a1e' }} />
                <a href="tel:+918954327490" style={{ color: '#a8a29e' }}>+91 89543 27490</a>
              </span>
            </AntSpace>
          </AntCol>

          <AntCol xs={24} sm={24} md={8}>
            <Title level={4} style={{ color: '#ffffff', fontFamily: 'Outfit', marginBottom: '16px' }}>
              Licensing & Security
            </Title>
            <AntSpace direction="vertical" size="small">
              <span style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <SafetyCertificateOutlined style={{ color: '#52c41a', marginTop: '4px', fontSize: '18px' }} />
                <span>
                  <strong>FSSAI Licensed Kitchen</strong>
                  <br />
                  License No: 22623038001187
                </span>
              </span>
              <Text style={{ color: '#a8a29e', fontSize: '12px', display: 'block', marginTop: '8px' }}>
                * Delivery-only kitchen (no dine-in). Standard delivery within 30-45 minutes.
              </Text>
            </AntSpace>
          </AntCol>
        </AntRow>

        <Divider style={{ borderColor: '#2d2a25', margin: '24px 0' }} />

        <AntRow justify="space-between" align="middle" style={{ fontSize: '13px' }}>
          <AntCol xs={24} sm={12}>
            <Text style={{ color: '#78716c' }}>
              © {currentYear} Uma Home Kitchen. All rights reserved.
            </Text>
          </AntCol>
          <AntCol xs={24} sm={12} style={{ textAlign: 'right' }}>
            <Text style={{ color: '#78716c' }}>
              Homemade with ❤️ in Haldwani
            </Text>
          </AntCol>
        </AntRow>
      </div>
    </AntFooter>
  );
};

export default Footer;
