import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../../generics/Cart/Cart';
import formatTotalCount from './helpers';
import styles from './styles.module.scss';
import { CartContext } from '../../lib/CartContext/CartContext';

export default function Header() {
    const { cartData } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState<string>(
        formatTotalCount(
            Object.values(cartData).reduce(
                (sum, item) => sum + item.price * item.amount,
                0
            )
        )
    );
    const [totalCount, setTotalCount] = useState<number>(
        Object.keys(cartData).length
    );
    useEffect(() => {
        setTotalPrice(
            Object.values(cartData).reduce(
                (sum, { amount, price }) => sum + amount * price,
                0
            )
        );
    }, [cartData]);
    useEffect(() => {
        setTotalCount(Object.keys(cartData).length);
    }, [cartData]);

    return (
        <header className={styles.Header}>
            <div className={styles.container}>
                <Link className={styles.link} to="/online-store/">
                    <button
                        type="button"
                        className={styles.headerLogo}
                    >
                        <span className={styles.headerLogoSpan1}>Online</span>
                        <span className={styles.headerLogoSpan2}>Store</span>
                    </button>
                </Link>

                <div className={styles.cartTotal}>
                    Total Count:{' '}
                    <span className={styles.cartTotalSpan}>€{totalPrice}</span>
                </div>
                <Link className={styles.link} to="/online-store/cart">
                    <Cart productsAmount={totalCount} />
                </Link>
            </div>
        </header>
    );
}
