import styles from './styles.module.scss'
import { CreditCardProps } from './types'

export default function CreditCard ({cardNumChange, cardNumValue, cardValidChange, cardValidValue, cardCvvChange, cardCvvValue, validateModal, cardImage}: CreditCardProps) {
    return (<div className={styles.creditCardCont}>
        <div className={styles.cardNumberCont}>
            <img
                className={styles.cardImg}
                src={cardImage}
                alt="Card"
            />
            <input
                className={`${styles.cardInput}\n${
                    validateModal.cardNum
                        ? styles.cardInputValid
                        : styles.cardInputInvalid
                }`}
                type="text"
                name="cardNumber"
                placeholder="Card number"
                onChange={cardNumChange}
                value={cardNumValue}
                required
            />
        </div>
        <div className={styles.cardValidCont}>
            VALID:{' '}
            <input
                className={`${styles.cardInput}\n${
                    validateModal.cardValid
                        ? styles.cardInputValid
                        : styles.cardInputInvalid
                }`}
                type="text"
                name="cardValid"
                placeholder="Valid Thru"
                onChange={cardValidChange}
                value={cardValidValue}
                required
            />
        </div>
        <div className={styles.cardCvvCont}>
            CVV:{' '}
            <input
                className={`${styles.cardInput}\n${
                    validateModal.cardCvv
                        ? styles.cardInputValid
                        : styles.cardInputInvalid
                }`}
                type="text"
                name="cardCvv"
                placeholder="Code"
                onChange={cardCvvChange}
                value={cardCvvValue}
                required
            />
        </div>
    </div>)
}