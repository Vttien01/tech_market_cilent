import {
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Col, Layout, Row, Space, Typography } from 'antd';
import React from 'react';
const { Footer } = Layout;
const { Title, Text } = Typography;

import facebook from '@assets/images/facebook.png';
import footer1 from '@assets/images/footer1.png';
import footer2 from '@assets/images/footer2.png';
import footer_card from '@assets/images/footer4.png';
import footer_hotline from '@assets/images/footer_hotline.png';
import footer_ship from '@assets/images/footer_ship.png';
import useAuth from '@hooks/useAuth';
import useTranslate from '@hooks/useTranslate';
import { defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './AppFooter.module.scss';

import { brandName } from '@constants';

const messages = defineMessages({
    profile: 'Profile',
    logout: 'Logout',
});

const AppFooter = () => {
    const { profile } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const translate = useTranslate();

    return (
        <Layout>
            <Footer className={styles.appFooter1}>
                <>
                    <Row justify="space-around" align="middle" style={{ paddingTop:0 }}>
                        <Col span={4}>
                            <Space>
                                <Avatar icon={<UserOutlined />} src={facebook} size={60} />
                                <div style={{ marginBottom: 25 }}>
                                    <Title level={4}>Hỗ trợ 24/24</Title>
                                    <Text strong>https://facebook.com</Text>
                                </div>
                            </Space>
                        </Col>
                        <Col span={4}>
                            <Space>
                                <Avatar icon={<UserOutlined />} src={footer_hotline} size={60} />
                                <div style={{ marginBottom: 25 }}>
                                    <Title level={4}>Hotline</Title>
                                    <Text strong>1900 636 648</Text>
                                </div>
                            </Space>
                        </Col>
                        <Col span={4} >
                            <Space>
                                <Avatar icon={<UserOutlined />} src={footer_ship} size={60} />
                                <div style={{ marginBottom: 25 }}>
                                    <Title level={4}>Ship hàng COD</Title>
                                    <Text strong>Thu tiền tận nơi</Text>
                                </div>
                            </Space>
                        </Col>
                        <Col span={5} >
                            <Space>
                                <Avatar icon={<UserOutlined />} src={footer_card} size={60} />
                                <div style={{ marginBottom: 25 }}>
                                    <Title level={4}>Miễn phí thanh toán</Title>
                                    <Text strong>ATM, VISA, MASTER, JCB</Text>
                                </div>
                            </Space>
                        </Col>
                    </Row>
                </>
            </Footer>
            <Footer className={styles.appFooter1}>
                <>
                    <Row>
                        <Col span={4} offset={2}>
                            <Text strong>HỆ THỐNG TECH MARKET</Text>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Chính sách & Quy định chung
                            </Typography.Link>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Chính sách đổi trả sản phẩm
                            </Typography.Link>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Chính sách bảo hành
                            </Typography.Link>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Chính sách giao hàng
                            </Typography.Link>
                            <br />
                        </Col>
                        <Col span={4} offset={1}>
                            <Text strong>HỖ TRỢ KHÁCH HÀNG</Text>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Giới thiệu
                            </Typography.Link>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Tin tức
                            </Typography.Link>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Tin khuyến mãi
                            </Typography.Link>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Tuyển dụng
                            </Typography.Link>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Quan hệ cổ đông
                            </Typography.Link>
                            <br />
                        </Col>
                        <Col span={4} offset={1}>
                            <Text strong>HỖ TRỢ MUA HÀNG</Text>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Hỗ trợ mua hàng trực tuyến
                            </Typography.Link>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Các hình thức thanh toán
                            </Typography.Link>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Hướng dẫn mua hàng trực tuyến
                            </Typography.Link>
                            <br />
                            <Typography.Link href="https://ant.design" target="_blank">
                                Phát hành hóa đơn
                            </Typography.Link>
                            <br />
                        </Col>
                        <Col span={4} offset={2}>
                            <Text strong>Chấp nhận thanh toán</Text>
                            {/* <br /> */}
                            <a
                                href=""
                                title="Hình thức thanh toán"
                                rel="home"
                                // style={{ marginLeft: '150px', marginTop: 35 }}
                            >
                                <img width="180" height="80" src={footer2} className="header-logo-dark" alt="Broshop" />
                            </a>
                        </Col>
                    </Row>
                </>
            </Footer>
            <Footer className={styles.appFooter1}>
                <>
                    <Row>
                        <Col span={12} offset={2}>
                            <Text strong>
                                CÔNG TY TNHH TECH MARKET - MST : 0313728397 DO SỞ KHĐT TPHCM CẤP NGÀY 01/01/2023
                            </Text>
                            <br />
                            <Typography.Text>
                                <Text strong>ĐỊA CHỈ :</Text> 319 C16 Lý Thường Kiệt, phường 15, quận 11, TP Hồ Chí Minh
                            </Typography.Text>
                            <br />
                            <Typography.Text>
                                <Text strong>HOTLINE :</Text> 1900 636 648 - <Text strong>EMAIL :</Text> mon@tech.media
                            </Typography.Text>
                            <br />
                        </Col>
                        <Col span={6}>
                            <a
                                href=""
                                title="Tech Market - Một trang web mới sử dụng React"
                                rel="home"
                                style={{ marginLeft: '150px', marginTop: 35 }}
                            >
                                <img width="200" height="60" src={footer1} className="header-logo-dark" alt="Broshop" />
                            </a>
                        </Col>
                    </Row>
                </>
            </Footer>
            {/* <div className={ styles.horizontal_line }></div> */}
            <Footer className={styles.appFooter}>
                <strong>{brandName} </strong>- © Copyright {new Date().getFullYear()}. All Rights Reserved.
            </Footer>
        </Layout>
    );
};

export default AppFooter;
