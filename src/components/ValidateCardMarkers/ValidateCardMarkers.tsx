import { ValidateCardMarkersProps } from "./types";
import styles from './styles.module.scss'

export default function ValidateCardMarkers ({isValid, validateModal}: ValidateCardMarkersProps) {
    return(
        <div className={styles.cardInputErrorCont}>
            {isValid === true && validateModal.cardNum === false 
            ? (<span
                    className={styles.cardInputErrorSpan}
                    title="Your card number must be 16 digits long"
                > Card number error!</span>) 
            : (false)}
            {isValid === true && validateModal.cardValid === false 
            ? (<span
                    className={styles.cardInputErrorSpan}
                    title="Enter valid date, where the first two digits are the month and the second two are the year"
                >Card date error!</span>)
            : (false)}
            {isValid === true && validateModal.cardCvv === false
            ? (<span
                    className={styles.cardInputErrorSpan}
                    title="Enter valid CVV code, which must be 3 digits long"
                >Card CVV error!</span>)
                : (false)}
        </div>
    )
}