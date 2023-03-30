import { Link } from 'react-router-dom';

import { useState, useContext } from 'react';
import { CartContext } from '../../lib/CartContext/CartContext';

import { InfoIcons } from '../InfoIcons/InfoIcons';

import { ICartProduct } from './types';

import styles from './style.module.scss';

import PlusIcon from '../../assets/icons/plus-icon.svg';
import MinusIcon from '../../assets/icons/minus-icon.svg';

export function CartProduct({
    productData,
    index,
    changeProductData,
}: ICartProduct) {
    const { changeProductAmount, deleteProductFromCart, cartData } =
        useContext(CartContext);

    const [product] = useState(productData);
    const [amount, setAmount] = useState(
        product.amount ? product.amount : 12314
    );
    const [cost, setCost] = useState(product.price * amount);

    const incProduct = () => {
        if (product.stock > amount) {
            const newAmount = amount + 1;
            setAmount(newAmount);
            setCost(product.price * newAmount);
            changeProductAmount(product.id, newAmount);
        }
    };
    const decProduct = () => {
        if (amount > 1) {
            const newAmount = amount - 1;
            setAmount(newAmount);
            setCost(product.price * newAmount);
            changeProductAmount(product.id, newAmount);
        } else {
            changeProductData(product.id);
            deleteProductFromCart(product.id);
            localStorage.setItem('cart-data', JSON.stringify(cartData));
        }
    };

    return (
        <div className={styles.CartProduct}>
            <div className={styles.order}>{index}</div>
            <div className={styles.info}>
                <Link
                    to={`/online-store/${product.id}`}
                    className={styles.picture}
                >
                    <img
                        className={styles.thumbnail}
                        src={product.thumbnail}
                        alt=""
                    />
                </Link>

                <Link
                    to={`/online-store/${product.id}`}
                    className={styles.content}
                >
                    <div className={styles.title}>
                        <h4 className={styles.name}>{product.title}</h4>
                        <span>{product.brand}</span>
                    </div>
                    <p className={styles.description}>{product.description}</p>
                    <InfoIcons
                        rating={product.rating}
                        stock={product.stock}
                        category={product.category}
                    />
                </Link>

                <div className={styles.price}>
                    <div className={styles.amount}>
                        <button
                            className={styles.btn}
                            type="button"
                            onClick={incProduct}
                        >
                            <img
                                className={styles.icon}
                                src={PlusIcon}
                                alt=""
                            />
                        </button>
                        <span className={styles.amountNum}>{amount}</span>
                        <button
                            className={styles.btn}
                            type="button"
                            onClick={decProduct}
                        >
                            <img
                                className={styles.icon}
                                src={MinusIcon}
                                alt=""
                            />
                        </button>
                    </div>

                    <p className={styles.cost}>
                        <span className={styles.costText}>Cost: </span>
                        <span className={styles.euro}>€</span>
                        {cost}
                    </p>
                </div>
            </div>
        </div>
    );
}
