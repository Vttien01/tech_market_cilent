import useTranslate from '@hooks/useTranslate';
import React from 'react';
import './contact.css';

const ContactHome = () => {
    const translate = useTranslate();
    return (
        <div className="container2">
            {/* <Space style={{ margin: 100 }}>
                <div className="areaContact1">
                    <Image
                        src={imgContact}
                        style={{ objectFit: 'cover',height: 600, width: 600, borderRadius: 12 }}
                        preview={false}
                    />
                </div>
                <div className="areaContact2">
                    <BaseForm style={{ width: 500 }}>
                        <Card
                            title="LIÊN HỆ VỚI CHÚNG TÔI"
                            headStyle={{ fontSize: 25, marginLeft: 80 }}
                            hoverable={true}
                            style={{  }}
                        >
                            <Row gutter={16}>
                                <Col span={24}>
                                    <TextField
                                        label={<FormattedMessage defaultMessage="Tên của bạn" />}
                                        rules={[
                                            {
                                                required: true,
                                                message: translate.formatMessage(commonMessage.required),
                                            },
                                        ]}
                                        name="Name"
                                    />
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={24}>
                                    <TextField
                                        label={translate.formatMessage(commonMessage.email)}
                                        type="email"
                                        name="email"
                                    />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <TextField
                                        label={<FormattedMessage defaultMessage="Tiêu đề" />}
                                        rules={[
                                            {
                                                required: true,
                                                message: translate.formatMessage(commonMessage.required),
                                            },
                                        ]}
                                        name="address"
                                    />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <TextField
                                        label={<FormattedMessage defaultMessage="Nội dung" />}
                                        rules={[
                                            {
                                                required: true,
                                                message: translate.formatMessage(commonMessage.required),
                                            },
                                        ]}
                                        type="textarea"
                                        name="content"
                                    />
                                </Col>
                            </Row>
                            <Button
                                type="primary"
                                size="large"
                                // loading={loading || loginLoading}
                                htmlType="submit"
                                style={{ width: '100%' }}
                            >
                                {<FormattedMessage defaultMessage="Gửi liên hệ" />}
                            </Button>

                            <div className="footer-card-form"></div>
                        </Card>
                    </BaseForm>
                </div>
            </Space> */}
        </div>
    );
};

export default ContactHome;
