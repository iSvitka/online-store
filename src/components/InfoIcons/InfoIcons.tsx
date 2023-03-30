import styles from './styles.module.scss';

import RateIcon from '../../assets/icons/Rating.svg';
import CategoryIcon from '../../assets/icons/Category.svg';
import StockIcon from '../../assets/icons/Stock.svg';

export function InfoIcons({
    rating,
    stock,
    category,
}: Record<string, string | number | undefined>) {
    return (
        <div className={styles.InfoIcons}>
            <div className={styles.item}>
                <img className={styles.icon} src={RateIcon} alt="" />
                <p className={styles.text}>{rating}</p>
            </div>
            <div className={styles.item}>
                <img className={styles.icon} src={StockIcon} alt="" />
                <p className={styles.text}>
                    <span className={styles.fwRegular}>Stock:</span> {stock}
                </p>
            </div>
            <div className={styles.item}>
                <img className={styles.icon} src={CategoryIcon} alt="" />
                <p className={styles.text}>{category}</p>
            </div>
        </div>
    );
}
