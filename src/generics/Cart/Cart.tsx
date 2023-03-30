import cartIcon from '../../assets/icons/cart-icon.svg'
import { CartType } from './types'
import styles from './styles.module.scss'

export default function Cart({productsAmount = 0}:CartType) {
    const amount = productsAmount >= 100 ? '99+' : productsAmount;
    return (
        <button type='button' className={styles.cartButton} >
            <img className={styles.cartImg} src={cartIcon} alt="Cart" />
            {!! productsAmount && <span className={styles.cartAmountVisible}>{amount}</span>}
        </button>
    )
}