export const getAllProduct = () => {
    return fetch('https://dummyjson.com/products').then((res) => res.json());
};

export const AddToCard = (id) => {
    return fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 1,
            products: [
                {
                    id: id,
                    quantity: 1,
                },
            ],
        }),
    }).then((res) => res.json());
};

export const getProductsByCategory = (categoryId) => {
    return fetch(`https://dummyjson.com/products/category/${categoryId}`).then((res) => res.json());
};

export const getCart = () => {
    return fetch('https://dummyjson.com/carts/1').then((res) => res.json());
};

export const getOrders = () => {
    return fetch('https://dummyjson.com/carts/1').then((res) => res.json());
};

export const getRevenue = () => {
    return fetch('https://dummyjson.com/carts').then((res) => res.json());
};

export const getInventory = () => {
    return fetch('https://dummyjson.com/products').then((res) => res.json());
};

export const getCustomers = () => {
    return fetch('https://dummyjson.com/users').then((res) => res.json());
};
export const getComments = () => {
    return fetch('https://dummyjson.com/comments').then((res) => res.json());
};
