import {
    DollarCircleOutlined,
    RiseOutlined,
    ShoppingCartOutlined,
    UngroupOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Card, DatePicker, Space, Statistic, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import DateRangePickerField from '@components/common/form/DateRangePickerField';
import { DATE_FORMAT_VALUE } from '@constants';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import { formatDateString, formatMoney } from '@utils';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
    const [orders, setOrders] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [change, setChange] = useState(false);

    const { data: dataOrder, execute: executeOrder } = useFetch({
        ...apiConfig.order.getList,
    });

    const { data: dataUser, execute: executeUser } = useFetch({
        ...apiConfig.user.getList,
    });

    const { data: dataProduct, execute: executeProduct } = useFetch({
        ...apiConfig.product.getList,
    });

    const { data: dataRevenue, execute: executeRevenue } = useFetch({
        ...apiConfig.revenue.getRevenue,
    });

    useEffect(() => {
        executeOrder({
            onCompleted: (response) => {
                setOrders(response.data?.totalElements);
            },
        });
        executeProduct({
            onCompleted: (response) => {
                setRevenue(response.data?.totalElements);
            },
        });
        executeUser({
            onCompleted: (response) => {
                setCustomers(response.data?.totalElements);
            },
        });
        executeRevenue({
            onCompleted: (response) => {
                setInventory(response.data?.revenue);
            },
        });
        // setOrders(dataOrder?.data?.totalElements);
        // setRevenue(dataProduct?.data?.totalElements);
        // setCustomers(dataUser?.data?.totalElements);
    }, []);
    const onChange = (date, dateString) => {
        // const startDate = formatDateString(date[0]?.$d, DATE_FORMAT_VALUE) + ' 00:00:00';
        if (date) {
            setStartDate(formatDateString(date[0]?.$d, DATE_FORMAT_VALUE) + ' 00:00:00');
            setEndDate(formatDateString(date[1]?.$d, DATE_FORMAT_VALUE) + ' 00:00:00');
            setChange(!change);
        }
        else {
            setStartDate(null);
            setEndDate(null);
            setChange(!change);
        }
    };
    useEffect(() => {
        executeRevenue({
            params: { startDate: startDate, endDate: endDate },
            onCompleted: (response) => {
                setInventory(response.data?.revenue);
            },
        });
    }, [change]);

    return (
        <Space size={20} direction="vertical" style={{ marginLeft: 20 }}>
            <Typography.Title level={4}>Thông số</Typography.Title>
            <Space direction="vertical">
                <DateRangePickerField showTime onChange={onChange} />
                <Space direction="horizontal">
                    <DashboardCard
                        icon={
                            <DollarCircleOutlined
                                style={{
                                    // color: 'red',
                                    backgroundColor: 'rgba(255,0,0,0.25)',
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        icon1={
                            <RiseOutlined
                                style={{
                                    color: 'red',
                                    fontSize: 20,
                                    paddingRight: 4,
                                }}
                            />
                        }
                        number="12"
                        title={'Doanh thu'}
                        value={formatMoney(inventory, {
                            groupSeparator: ',',
                            decimalSeparator: '.',
                            currentcy: 'đ',
                            currentcyPosition: 'BACK',
                            currentDecimal: '0',
                        })}
                    />
                    <DashboardCard
                        icon={
                            <ShoppingCartOutlined
                                style={{
                                    // color: 'green',
                                    // backgroundColor: 'rgba(0,255,0,0.25)',
                                    backgroundColor: 'rgba(255,0,0,0.25)',
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        icon1={
                            <RiseOutlined
                                style={{
                                    color: 'red',
                                    fontSize: 20,
                                    paddingRight: 4,
                                }}
                            />
                        }
                        title={'Đơn hàng'}
                        value={orders}
                        number="18"
                    />
                </Space>
                <Space direction="horizontal">
                    <DashboardCard
                        icon={
                            // <DollarCircleOutlined
                            <UngroupOutlined
                                style={{
                                    // color: 'blue',
                                    // backgroundColor: 'rgba(0,0,255,0.25)',
                                    backgroundColor: 'rgba(255,0,0,0.25)',
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        icon1={
                            <RiseOutlined
                                style={{
                                    color: 'red',
                                    fontSize: 20,
                                    paddingRight: 4,
                                }}
                            />
                        }
                        title={'Sản phẩm'}
                        value={revenue}
                        number="14"
                    />
                    <DashboardCard
                        icon={
                            <UserOutlined
                                style={{
                                    // color: 'purple',
                                    // backgroundColor: 'rgba(0,255,255,0.25)',
                                    backgroundColor: 'rgba(255,0,0,0.25)',
                                    borderRadius: 20,
                                    fontSize: 24,
                                    padding: 8,
                                }}
                            />
                        }
                        icon1={
                            <RiseOutlined
                                style={{
                                    color: 'red',
                                    fontSize: 20,
                                    paddingRight: 4,
                                }}
                            />
                        }
                        title={'Khách hàng'}
                        value={customers}
                        number="11"
                    />
                </Space>
            </Space>
            <Space>
                <RecentOrders />
                <DashboardChart />
            </Space>
            <RevenueOfEachProduct/>
        </Space>
    );
}

function DashboardCard({ title, value, icon, icon1, number }) {
    return (
        <Card style={{ width: 500 }}>
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Space direction="horizontal">
                    {icon}
                    <Statistic title={title} value={value} />
                </Space>
                <div
                    style={{
                        width: 80,
                        height: 80,
                        backgroundColor: '#bbf7d1',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'red',
                        fontSize: 19,
                        fontWeight: 600,
                    }}
                >
                    {icon1}
                    {number}%
                </div>
            </Space>
        </Card>
    );
}
function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data: dataOrder, execute: executeOrder } = useFetch({
        ...apiConfig.order.getList,
    });

    useEffect(() => {
        setLoading(true);
        executeOrder({
            onCompleted: (response) => {
                const num = response.data.totalElements;
                setDataSource(response.data.content.slice(-3));
                setLoading(false);
            },
        });
        // getOrders().then((res) => {
        //     setDataSource(res.products.splice(0, 3));
        //     setLoading(false);
        // });
    }, []);

    return (
        <Card style={{ minWidth: 500 }}>
            <Typography.Title level={4}>Đơn hàng gần đây</Typography.Title>
            <Table
                columns={[
                    {
                        title: 'Mã đơn hàng',
                        dataIndex: 'orderCode',
                        align: 'center',
                    },
                    {
                        title: 'Số điện thoại',
                        dataIndex: 'phone',
                        align: 'center',
                    },
                    {
                        title: 'Tổng tiền',
                        dataIndex: 'totalMoney',
                        align: 'center',
                        render: (value) => {
                            return (
                                <span>
                                    {formatMoney(value, {
                                        groupSeparator: ',',
                                        decimalSeparator: '.',
                                        currentcy: 'đ',
                                        currentcyPosition: 'BACK',
                                        currentDecimal: '0',
                                    })}
                                </span>
                            );
                        },
                    },
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                style={{ width: 400 }}
            ></Table>
        </Card>
    );
}

function DashboardChart() {
    const [reveneuData, setReveneuData] = useState({
        labels: [],
        datasets: [],
    });
    const [year, setYear] = useState('2023');

    const { data: dataRevenue, execute: executeRevenue } = useFetch({
        ...apiConfig.revenue.getRevenueMonth,
    });

    useEffect(() => {
        executeRevenue({
            params: { year: year },
            onCompleted: (response) => {
                if (response.data) {
                    const labels = response.data.map((cart) => {
                        return `Tháng ${cart.month}`;
                    });
                    const data = response.data.map((cart) => {
                        return cart.revenue;
                    });

                    const dataSource = {
                        labels,
                        datasets: [
                            {
                                label: 'Thống kê doanh thu từng tháng',
                                data: data,
                                backgroundColor: 'rgba(255, 0, 0, 1)',
                            },
                        ],
                    };

                    setReveneuData(dataSource);
                }
                else setReveneuData([]);
            },
        });
    }, [year]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Doanh thu đơn hàng',
            },
        },
    };
    const onChange = (date, dateString) => {
        setYear(date.$y);
        console.log(date.$y);
    };
    return (
        <Card style={{ minWidth: 500, height: 350, marginTop: 15 }}>
            <DatePicker onChange={onChange} picker="year" />
            <Bar options={options} data={reveneuData} />
        </Card>
    );
}

function RevenueOfEachProduct() {
    const [data, setData] = useState([]);

    const { data: dataRevenue, execute: executeRevenueProduct } = useFetch({
        ...apiConfig.revenue.getRevenueOfEachProduct,
    });

    useEffect(() => {
        executeRevenueProduct({
            onCompleted: (res) => {
                setData(res.data.content);
            },
            onError: () => {},
        });
    }, []);

    const itemHeader = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            align: 'center',
        },
        {
            title: 'Số lượng đã bán',
            dataIndex: 'amount',
            align: 'center',
        },
        {
            title: 'Doanh thu',
            dataIndex: 'totalRevenue',
            align: 'center',
            render: (value) => {
                return (
                    <span>
                        {formatMoney(value, {
                            groupSeparator: ',',
                            decimalSeparator: '.',
                            currentcy: 'đ',
                            currentcyPosition: 'BACK',
                            currentDecimal: '0',
                        })}
                    </span>
                );
            },
        },
    ];

    return (
        <Card style={{ minWidth: 500, minHeight: 350, marginTop: 15 }}>
            <Typography.Title style={{ fontSize:22, marginBottom:20 }}>Thống kê doanh thu từng sản phẩm</Typography.Title>
            <Table
                pagination={true}
                columns={itemHeader}
                dataSource={data}
                bordered
            ></Table>
        </Card>
    );
}
export default Dashboard;
