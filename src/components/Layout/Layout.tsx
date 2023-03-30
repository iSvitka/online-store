import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import cn from 'classnames'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './style.module.scss';
import ModalWindow from '../ModalWindow/ModalWindow';
import { CartContext } from '../../lib/CartContext/CartContext';

export function Layout() {
    const {closeModal, modalState, clearProductFromCart} = useContext(CartContext)

    return (
        <div className={cn(styles.Layout, {[styles.overflowHidden]: !!modalState})}>
            <Header />

            <main className={styles.main}>
                <Outlet />
            </main>
            {!!modalState && <ModalWindow closeModal={closeModal} clearCart={clearProductFromCart}/>}

            <Footer />
        </div>
    );
}
