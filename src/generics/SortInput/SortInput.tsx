// import { useState } from 'react';
import styles from './styles.module.scss';
import { SortInputProps } from './types';

function SortInput({ callback, defaultValue }: SortInputProps) {
    return (
        <div className={styles.SelectWrapper}>
            <select
                className={styles.select}
                name="sorting"
                defaultValue={defaultValue}
                onChange={callback}
            >
                <option className={styles.option} value="high-price" selected={defaultValue === 'high-price'}>
                    Ascending price
                </option>
                <option className={styles.option} value="low-price" selected={defaultValue === 'low-price'}>
                    Price descending
                </option>
                <option className={styles.option} value="high-rate" selected={defaultValue === 'high-rate'}>
                    Highest rating
                </option>
                <option className={styles.option} value="low-rate" selected={defaultValue === 'low-rate'}>
                    Lowest rating
                </option>
            </select>
        </div>
    );
}

export default SortInput;
