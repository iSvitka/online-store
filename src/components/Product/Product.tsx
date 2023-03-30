import ClassNames from 'classnames';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../lib/CartContext/CartContext';
import ProductImages from '../ProductImages/ProductImages';
import { InfoIcons } from '../InfoIcons/InfoIcons';
import Button from '../../generics/Button/Button';
import { IProductData } from '../ProductPage/types';

import styles from './style.module.scss';

function Product(props: IProductData) {
    const { addProductToCart, deleteProductFromCart, cartData, openModal } = useContext(CartContext);

    const {
        id,
        title,
        description,
        price,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
    } = { ...props };

    const [inCart, setInCart] = useState(
        Boolean(
            Array.from(Object.keys(cartData)).filter(
                (item) => Number(item) === id
            ).length
        )
    );

    const addProduct = () => {
        addProductToCart(id, price);
        setInCart(true);
    };
    const deleteProduct = () => {
        deleteProductFromCart(id);
        setInCart(false);
    };
    const buyProduct = () => {
        addProductToCart(id, price);
        setInCart(true);
        openModal();
    };

    return (
        <div className={styles.Product}>
            <div className={styles.productPath}>
                <Link className={styles.productPathLink} to="/online-store/">Store</Link> {` >> ${category} >> ${brand} >> ${title}`}
            </div>
            <div className={styles.presentation}>
                <ProductImages thumbnail={thumbnail} images={images} />
            </div>

            <div className={styles.info}>
                <div
                    className={ClassNames(
                        styles.infoContainer,
                        styles.infoName
                    )}
                >
                    <h3 className={styles.infoTitle}>{title}</h3>
                    <p className={styles.infoBrand}>{brand}</p>
                </div>

                <p className={styles.infoDescription}>{description}</p>
                <div className={styles.infoContainer}>
                    <InfoIcons
                        rating={rating}
                        stock={stock}
                        category={category}
                    />
                </div>

                <div className={ClassNames(styles.infoContainer, styles.price)}>
                    <p className={styles.infoPrice}>€{price}</p>
                    <Link to="/online-store/cart">
                        <Button callback={buyProduct}>by now</Button>
                    </Link>
                    <Button
                        callback={inCart ?  deleteProduct: addProduct}
                        isReverse
                    >
                        {inCart ? `drop from cart` : `add to cart`}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Product;
