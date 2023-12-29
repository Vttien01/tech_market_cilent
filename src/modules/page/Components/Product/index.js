import { Button, List, Select, Spin, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { AddToCard } from '../API';
// import './Product.css';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import { useParams } from 'react-router-dom';
import CardProduct from './CardProduct';

function Products({ title }) {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [items, setItems] = useState([]);
    const [item1, setItem1] = useState([]);
    const [param1, setParam1] = useState();
    const tesst = 'tablet';
    const [sortProduct, setSortProduct] = useState('az');
    const {
        data: allproducts1,
        loading: allproductsLoading,
        execute: executgeallproducts,
    } = useFetch(apiConfig.product.autocomplete, {
        params: { categoryName: title },
        immediate: true,
        mappingData: ({ data }) => data,
    });
    // useEffect(() => {
    //     // Check if the title is not equal to "Tất cả sản phẩm" and if the component has mounted
    //     if (title !== 'Tất cả sản phẩm') {
    //         executgeallproducts({
    //             params: { categoryName: title },
    //         });
    //         setItems(allproducts1);
    //         setItem1([]);
    //         console.log(items);
    //     }
    //     else{
    //         executgeallproducts({
    //             params: { },
    //         });
    //         setItem1(allproducts1);
    //         setItems([]);
    //         console.log(item1);
    //     }
    // }, [title]);
    useEffect(() => {
        // allproductsLoading(true);
        if (allproducts1?.length > 0) {
            setItem1(allproducts1);
            // allproductsLoading(false);
            setItems([]);
            console.log(item1);
        } else setItem1([]);
    }, [allproducts1, title]);

    const getSortedProduct = () => {
        let sortedItem =[...item1];
        console.log(sortedItem);
        // const sortedItem = listall ? [...listall] : [];
        sortedItem &&
            sortedItem.sort((a, b) => {
                const aLowerCaseTitle = a.name.toLowerCase();
                const bLowerCaseTitle = b.name.toLowerCase();
                if (sortProduct === 'az') {
                    return aLowerCaseTitle > bLowerCaseTitle ? 1 : aLowerCaseTitle === bLowerCaseTitle ? 0 : -1;
                } else if (sortProduct === 'za') {
                    return aLowerCaseTitle < bLowerCaseTitle ? 1 : aLowerCaseTitle === bLowerCaseTitle ? 0 : -1;
                } else if (sortProduct === 'lowHigh') {
                    return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
                } else if (sortProduct === 'highLow') {
                    return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
                }
            });
        return sortedItem;
    };

    if (loading) {
        return <Spin spinning />;
    }
    return (
        <div className="Product" style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', marginRight:0, maxWidth:992 }}>
            <div style={{ marginBottom: 10 }}>
                <Typography.Text style={{ fontSize: '30px', fontWeight: 'bolder' }}> {title} </Typography.Text>
            </div>
            <div style={{ marginTop: 10 }}>
                <Typography.Text>Sắp xếp các mục theo: </Typography.Text>
                <Select
                    onChange={(value) => {
                        setSortProduct(value);
                    }}
                    defaultValue={'az'}
                    options={[
                        {
                            label: 'Alphabetically a-z',
                            value: 'az',
                        },
                        {
                            label: 'Alphabetically z-a',
                            value: 'za',
                        },
                        {
                            label: 'Giá từ thấp đến cao',
                            value: 'lowHigh',
                        },
                        {
                            label: 'Giá từ cao đên thấp',
                            value: 'highLow',
                        },
                    ]}
                ></Select>
            </div>
            <List
                pagination={{ position: 'bottom', pageSize: 6 }}
                renderItem={(product, index) => <CardProduct product={product} index={index} />}
                dataSource={getSortedProduct()} // Assume getSortedProduct() returns your product data
                grid={{ column: 3 }}
            />
        </div>
    );
}

function AddToCardButton({ item }) {
    const [loading, setLoading] = useState(false);
    const AddProducttoCard = () => {
        setLoading(true);
        AddToCard(item.id).then((res) => {
            message.success(`${item.title} has been added to cart`);
            setLoading(false);
        });
    };
    return (
        <Button
            type="link"
            onClick={() => {
                AddProducttoCard();
            }}
            loading={loading}
        >
            Add to Card
        </Button>
    );
}
export default Products;
