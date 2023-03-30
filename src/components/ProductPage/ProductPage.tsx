import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Product from '../Product/Product';
import { IProductData } from './types';

import styles from './style.module.scss';

function ProductPage() {
    const { productId } = useParams();

    const navigate = useNavigate();

    if (Number(productId) > 100 || Number.isNaN(Number(productId))) {
        navigate('/online-store/notfound/404');
    }
    const [product, setProduct] = useState<IProductData>();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [productId]);

    return (
        <div className={styles.ProductPage}>
            {product && (
                <Product
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                    rating={product.rating}
                    stock={product.stock}
                    brand={product.brand}
                    category={product.category}
                    thumbnail={product.thumbnail}
                    images={product.images}
                />
            )}
        </div>
    );
}

export default ProductPage;
