import { useEffect, useState } from "react";
import { GenericInputFilter } from "./types";
import styles from "./styles.module.scss"

export default function InputFilter({isReset = false, setResetFalse, callback, text, count, totalCount, checked}: GenericInputFilter) {

    const [checkState, setCheckState] = useState(checked);
    useEffect(() => {
        if(checkState !== checked) {
            setCheckState(checked)
        }
    }, [checked,checkState])
    useEffect(() => {
        if(isReset) {
            setCheckState(false)
            setResetFalse();
        }
    }, [isReset, setResetFalse])
    const onChange = () => {
        if(callback) {
            callback(text)
        }
        setCheckState(!checkState);
    }
    return(
        <div className={count ? styles.container : styles.containerOff}>
            <input className={styles.inputFilter} type="checkbox" id={text} onChange={onChange} checked={checkState}/>
            <label className={styles.inputLabel} htmlFor={text}>{text}</label>
            <span className={styles.countSpan}>{`(${count}/${totalCount})`}</span>
        </div>
    )
}