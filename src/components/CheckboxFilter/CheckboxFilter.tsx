import { useEffect, useState } from 'react';
import InputFilter from '../../generics/InputFilter/InputFilter';
import styles from './styles.module.scss';
import { CheckboxFilterProps, FiltersArr, ICheckboxFilters } from './types';

export default function CheckboxFilter({defaultProducts, filteredProducts, prop, title, isReset, setResetFalse, changeFilters, currentFilters = []}:CheckboxFilterProps) {
    const [checkboxFilters, setCheckboxFilters] = useState<ICheckboxFilters>(currentFilters)
    const defaultProductsMap = new Map();
    const filteredProductsMap = new Map();
    let filters:FiltersArr = []
    useEffect(() => {
        if(checkboxFilters.sort().join('') !== currentFilters.sort().join()) {
            setCheckboxFilters(currentFilters); 
        }
    }, [currentFilters, checkboxFilters])
    defaultProducts.map(item => item[prop].toString().toUpperCase()).forEach(item => {
        if(defaultProductsMap.has(item)) {
            const newValue = defaultProductsMap.get(item)[0] + 1;
            defaultProductsMap.set(item, [newValue, newValue]);
        } else {
            defaultProductsMap.set(item, [1, 1])
        }
    })
    filteredProducts.map(item => item[prop].toString().toUpperCase()).forEach((item) => {
        if(filteredProductsMap.has(item)) {
            const newValue = filteredProductsMap.get(item)[0] + 1;
            filteredProductsMap.set(item, [newValue, newValue]);
        } else {
            filteredProductsMap.set(item, [1, 1])
        }
    })
    Array.from(defaultProductsMap.keys()).forEach(key => {
        const isChecked = currentFilters.length ? currentFilters.includes(key) : false;
        if(!filteredProductsMap.has(key)) {
            const newValue = defaultProductsMap.get(key)[1];
            filteredProductsMap.set(key, [0, newValue, isChecked])
        } else {
            const newValue = defaultProductsMap.get(key)[1];
            const oldValue = filteredProductsMap.get(key)[0]
            filteredProductsMap.set(key, [oldValue, newValue, isChecked])
        }
    })
    filters = Array.from(filteredProductsMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

    const onCheck = (filterName: string) => {
        let resFilters:ICheckboxFilters = [...checkboxFilters]
        if(checkboxFilters.length === checkboxFilters.filter(filter => filter !== filterName).length) {
            resFilters.push(filterName)
        } else {
            resFilters = resFilters.filter(filter => filter !== filterName)
        }
        setCheckboxFilters(resFilters);
        changeFilters(title, resFilters)
    }

    useEffect(() => {
        if(isReset) {
            setCheckboxFilters([])
        }
    }, [isReset])

    return (
    <div className={styles.Container}>
        <h3 className={styles.title}>{title}</h3>
        {filters.length ?
            <div className={styles.checkboxContainer}>
                {filters.map(filter => 
                    <InputFilter 
                        isReset={isReset} 
                        setResetFalse={setResetFalse} 
                        callback={onCheck} 
                        key={filter[0]} 
                        text={filter[0]} 
                        count={filter[1][0]} 
                        totalCount={filter[1][1]}
                        checked={filter[1][2]}
                    />
                )}
            </div>
            : 'Loading'}
    </div>
    )
}