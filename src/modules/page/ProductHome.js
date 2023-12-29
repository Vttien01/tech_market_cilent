import NavSiderCommon from '@modules/main/NavSiderCommon';
import React, { useState } from 'react';
import Products from './Components/Product';
import './Product.css';

const ProductHome = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [items, setItems] = useState([]);
    const queryParameters = new URLSearchParams(window.location.search);
    const category = queryParameters.get('category');

    const toggleCollapsed = () => setCollapsed((prev) => !prev);

    return (
        <div style={{ justifyContent: 'center', display:'flex' }}>
            <div>
                <NavSiderCommon collapsed={collapsed} onCollapse={toggleCollapsed} />
            </div>
            <div>{category ? <Products title={category} /> : <Products />}</div>
            {/* <div>
                <Routes>
                    <Route path="/" element={<Products/>}></Route>
                    <Route path="/:categoryId" element={<Products />}></Route>
                </Routes>
            </div> */}
        </div>
    );
};

export default ProductHome;
