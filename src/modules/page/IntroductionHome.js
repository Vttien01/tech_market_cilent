import IconIntro1 from '@assets/images/iconIntro1.png';
import IconIntro2 from '@assets/images/iconIntro2.png';
import IconIntro3 from '@assets/images/iconIntro3.png';
import IconIntro4 from '@assets/images/iconIntro4.png';
import intro1 from '@assets/images/intro1.png';
import { Avatar, Col, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import './Intro.css';
const { Title, Text } = Typography;
const IntroductionHome = () => {
    return (
        <div className="container">
            <div className="area1">
                <Space align='center' direction='vertical'>
                    <Title level={10}>TECH MARKET</Title>
                    <Text strong>Mua hàng trên Tech Market luôn là một trải nghiệm ấn tượng.</Text>
                    <Text strong>
                        {' '}
                        Ở đây chúng tôi có sự tham gia của các thương hiệu hàng đầu thế giới ở đa dạng nhiều lĩnh vực
                        khác nhau
                    </Text>
                </Space>
            </div>
            <div className="area2"></div>
            <div className="area3" style={{ display: 'flex', justifyContent: 'center', marginLeft:50 }}>
                <Image src={intro1} style={{ objectFit: 'cover' }} preview={false} />
            </div>
            {/* <div className="area4"></div> */}
            <div className="area2_1">
                <Col offset={6}>
                    <Avatar src={IconIntro1} size={120} />
                    <div style={{ marginBottom: 25, width: 150 }}>
                        <Title level={4}>Hỗ trợ đổi trả</Title>
                        {/* <Text strong>https://facebook.com</Text> */}
                    </div>
                </Col>
            </div>
            <div className="area2_2">
                <Row>
                    <Col offset={6}>
                        <Avatar src={IconIntro2} size={120} />
                        <div style={{ marginBottom: 25, width: 150 }}>
                            <Title level={4}>Uy tín hàng đầu</Title>
                            {/* <Text strong>https://facebook.com</Text> */}
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="area4_1">
                <Col offset={6}>
                    <Avatar src={IconIntro3} size={120} />
                    <div style={{ marginBottom: 25, marginLeft: 20 }}>
                        <Title level={4}>Online 24/7</Title>
                        {/* <Text strong>https://facebook.com</Text> */}
                    </div>
                </Col>
            </div>
            <div className="area4_2">
                <Col offset={6}>
                    <Avatar src={IconIntro4} size={120} />
                    <div style={{ marginBottom: 25, width: 150 }}>
                        <Title level={4}>Kết nối toàn cầu</Title>
                        {/* <Text strong>https://facebook.com</Text> */}
                    </div>
                </Col>
            </div>
        </div>
    );
};

export default IntroductionHome;
