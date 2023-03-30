import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../lib/CartContext/CartContext';
import { ProductCardProps } from './types';
import styles from './styles.module.scss';

export default function ProductCard({ product, cardSize }: ProductCardProps) {
    const { addProductToCart, deleteProductFromCart, cartData, openModal } =
        useContext(CartContext);
    const [inCart, setInCart] = useState(
        Boolean(
            Array.from(Object.keys(cartData)).filter(
                (item) => Number(item) === product.id
            ).length
        )
    );

    const addProduct = () => {
        addProductToCart(product.id, product.price);
        setInCart(true);
    };
    const deleteProduct = () => {
        deleteProductFromCart(product.id);
        setInCart(false);
    };
    const buyProduct = () => {
        addProductToCart(product.id, product.price);
        setInCart(true);
        openModal();
    };

    return (
        <div
            className={`${styles.CardCont}\n${
                (cardSize === 'small') ? styles.CardContSmall : styles.CardContBig
            }`}
        >
            <Link
                className={styles.cardImgCont}
                to={`/online-store/${product.id}`}
            >
                <img
                    className={styles.cardImg}
                    src={product.thumbnail}
                    alt={product.title}
                />
            </Link>
            <div className={styles.textCont}>
                <Link
                    className={styles.title}
                    to={`/online-store/${product.id}`}
                >
                    {product.title}
                </Link>
                <p className={styles.description}>{product.category}</p>
            </div>
            {(cardSize === 'big') && (
                <div className={styles.infoCont}>
                    <p className={styles.infoRate}>
                        Rating: <span>★{product.rating}</span>
                    </p>
                    <p className={styles.infoStock}>
                        Stock: <span>{product.stock}</span>
                    </p>
                </div>
            )}
            <div className={styles.buttonCont}>
                <button
                    className={`${styles.buttons}\n${styles.buttonAdd}\n${!!inCart && styles.buttonInCart}`}
                    onClick={inCart ? deleteProduct : addProduct}
                    type="button"
                >
                    {inCart ? `Drop from cart` : `Add €${product.price}`}
                </button>
                <Link
                    className={`${styles.buttons}\n${styles.buttonLink}`}
                    to="../online-store/cart"
                    onClick={buyProduct}
                >
                    Buy now
                </Link>
            </div>
        </div>
    );
}
