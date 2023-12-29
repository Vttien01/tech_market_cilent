import { ClearOutlined } from '@ant-design/icons';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import { IconSearch } from '@tabler/icons-react';
import { Avatar, Button, Select, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { defineMessages } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import './SearchBox.scss';
import useFetchDataHook from './useFetchDataHook';
const { Option } = Select;

const message = defineMessages({
    objectName: 'profile',
});

const SearchBox = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');
    const [getData, getTotal, isLoading, isLoadSuccess, isLoadError, clearSearch, handleSearch, handleLoadMore] =
        useFetchDataHook(keyword);

    useEffect(() => {
        document.title = 'Home';
    }, []);

    function handleInputChange(e) {
        setKeyword(e.target.value);
    }

    function handleClearSearch() {
        setKeyword('');
        clearSearch();
    }

    let timeout;
    const SearchInput = (props) => {
        //     timeout = setTimeout(fake, 300);
        const { data: dataProduct, execute: excuteDataProduct } = useFetch({
            ...apiConfig.product.autocomplete,
        });
        const [data, setData] = useState([]);
        const [value, setValue] = useState();
        const handleSearch = (newValue) => {
            excuteDataProduct({
                params: { name: newValue },
                onCompleted: (response) => {
                    const data = response.data.map((item) => ({
                        value: item.id,
                        text: item,
                    }));
                    console.log(data);
                    setData(data);
                },
                // onError: mixinFuncs.handleGetDetailError,
            });
        };

        const handleChange = (newValue) => {
            navigate(`/productdetail/${newValue}`);
        };
        return (
            <Select
                showSearch
                value={value}
                placeholder={props.placeholder}
                style={props.style}
                // defaultActiveFirstOption={false}
                suffixIcon={<IconSearch/>}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
                // options={(data || []).map((d) => ({
                //     value: d.value,
                //     label: d.text,
                // }))}
                optionLabelProp="label"
                dropdownRender={(menu) => (
                    <div>
                        {menu}
                        {/* Các phần tử tùy chỉnh khác có thể được thêm vào đây */}
                    </div>
                )}
            >
                {(data || []).map((d) => (
                    <Option key={d.value} value={d.value} label={d.text}>
                        {/* <RenderOption item={d.text} /> */}
                        <Space direction="horizontal" style={{ marginTop: 10, backgroundColor: '282a36' }}>
                            <Avatar src={d.text.image} size={48} />
                            {/* <Statistic title={d.text.name} value={d.text.totalInStock} /> */}
                            <Space direction="vertical">
                                <Typography.Title level={4}>{d.text.name}</Typography.Title>
                                <Typography.Text>Số lượng:{d.text.totalInStock}</Typography.Text>
                            </Space>
                        </Space>
                    </Option>
                ))}
            </Select>
        );
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:10 }}>
            <SearchInput
                placeholder="Tìm kiếm"
                style={{
                    width: 600,
                    height: 40,
                }}
            />
            <Button className="ml-2" style={{ marginLeft: 8 }} icon={<ClearOutlined />} onClick={handleClearSearch}>
                Clear
            </Button>
        </div>
    );
};

function DashboardCard({ title, value, icon, icon1, number }) {
    return (
        {/* <Spin size="large" tip="Loading" spinning={isLoading()} delay="200">
                        <div
                            className="mt-4 px-4 py-8 shadow-lg rounded overflow-y-auto scroll bg-white"
                            style={{ width: 600, height: 'calc(100vh - 170px)' }}
                        >
                            <p className="font-bold mb-6">Result found: {getTotal()}</p>
                            {render()}
                            {getData().length < getTotal() && (
                                <div className="w-100 mt-4 flex justify-center">
                                    <Button type="primary" onClick={handleLoadMore}>
                                        Load More
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Spin> */}
    );
}
export default SearchBox;
