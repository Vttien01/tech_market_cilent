import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, List, Skeleton, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import './Product.css';

const { Meta } = Card;
const count = 6;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const dataContent = Array.from({
    length: 23,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `Kinh nghiệm hay ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'Bộ hình nền siêu đẹp từ Huawei Mate 10 đến với nhiều chủ đề trừu tượng, phong cảnh khác nhau nhưng phù hợp cho mọi smartphone Android hay iPhone của bạn.',
}));

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const ExperienceHome = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => setCollapsed((prev) => !prev);

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);
    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                    name: {},
                    picture: {},
                })),
            ),
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false);
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    marginBottom: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>Tải thêm</Button>
            </div>
        ) : null;
    return (
        <Space style={{ alignItems: 'start' }}>
            <div style={{ margin: '20px 20px 20px 100px', width: '200px' }}>
                <List
                    header={<strong style={{ fontSize:'15px' }}>Bài viết gần đây</strong>}
                    bordered={true}
                    className="demo-loadmore-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item>
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} />}
                                    title={<a href="https://ant.design">{item.name?.last}</a>}
                                    // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
            <div className="Product">
                <List
                    header={<strong style={{ fontSize:'20px' }}>Kinh nghiệm hay</strong>}
                    // itemLayout="vertical"
                    loading={initLoading}
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 6,
                    }}
                    dataSource={dataContent}
                    grid={{ column: 3 }}
                    renderItem={(item) => (
                        <Card
                            className="itemCard"
                            style={{
                                width: 300,
                            }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://fptshop.com.vn/Uploads/images/2015/Tin-Tuc/BinhNN/TINTUC1/TINTUC01/hinh-nen-mate-10-pro-02.jpg"
                                />
                            }
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                        >
                            <Meta
                                // avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                // description={item.description}
                            />

                            <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                {item.content}
                            </Typography.Paragraph>
                        </Card>
                    )}
                />
            </div>
        </Space>
    );
};

export default ExperienceHome;
