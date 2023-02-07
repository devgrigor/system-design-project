import { useEffect, useState } from 'react';
import { configs, postFetchObj } from '../../config';
import classes from './ProductList.module.scss';

export const ProductList = () => {
    const [products, setProducts]: any = useState([]);
    useEffect(() => {
        postFetchObj.body = JSON.stringify({ data: { prop: 'something' } });

        console.log(postFetchObj);

        fetch(configs.apiUrl + '/products/list', postFetchObj)
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((res) => {
                console.log(res);
                setProducts(res);
            });
    }, []);

    const purchase = (product: any) => {
        postFetchObj.body = JSON.stringify({ ...product });

        fetch(configs.apiUrl + '/products/purchase', postFetchObj)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res);
            });
    };

    return (
        <div className={classes.product_list}>
            {products.map((product: any, idx: any) => {
                return (
                    <p className={classes.single_product} key={idx}>
                        {product.name} {product.id}
                        <button onClick={() => purchase(product)}>
                            Purchase
                        </button>
                    </p>
                );
            })}
        </div>
    );
};
