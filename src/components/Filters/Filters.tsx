import { useEffect, useState } from 'react';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import RangeFilter from '../RangeFilter/RangeFilter';
import styles from './styles.module.scss';
import { FilterNames, FilterTypes, FiltersProps, IFilters } from './types';


export default function Filters({defaultProducts, filteredProducts, getFilters, resetFilters, filters}:FiltersProps) {
    const [resetState, setResetState] = useState(false)
    const [copyState, setCopyState] = useState(false);
    const updateFilters = (filterName: FilterNames, filterValue: FilterTypes) => {
        const newUpdateFilters:IFilters = {};
        newUpdateFilters[filterName] = filterValue
        getFilters(newUpdateFilters)
    }
    const resetAllFilters = () => {
        resetFilters();
        setResetState(true)
    }
    const setResetFalse = () => {
        setResetState(false)
    }
    const copyQueryLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopyState(true)
    }
    useEffect(() => {
        if(copyState) {
            setTimeout(() => setCopyState(false), 2000)
        }
    }, [copyState])
    
    return (
        <aside className={styles.FiltersContainer}>
            <CheckboxFilter 
                defaultProducts={defaultProducts} 
                prop='category' 
                title='Category' 
                filteredProducts={filteredProducts}
                
                isReset={resetState}
                setResetFalse={setResetFalse}

                changeFilters={updateFilters} 
                currentFilters={filters?.Category}
            />
            <CheckboxFilter 
                defaultProducts={defaultProducts} 
                prop='brand' 
                title='Brand'
                filteredProducts={filteredProducts} 

                isReset={resetState}
                setResetFalse={setResetFalse}

                changeFilters={updateFilters} 
                currentFilters={filters?.Brand}
            />
            <RangeFilter 
                defaultProducts={defaultProducts} 
                filteredProducts={filteredProducts}
                type='price' 
                changeFilters={updateFilters} 
                currentFilters={filters?.Price}
            />
            <RangeFilter 
                defaultProducts={defaultProducts} 
                filteredProducts={filteredProducts}
                type='stock' 
                changeFilters={updateFilters} 
                currentFilters={filters?.Stock}
            />
            <div className={styles.buttonsCont} >
                <button className={styles.resetBut} type='button' onClick={resetAllFilters}>Reset filters</button>
                <button className={`${styles.copyBut}\n${!!copyState && styles.copyButCopied}`} type='button' onClick={copyState ? () => {} : copyQueryLink}>{copyState ? `Copied!` : `Copy link`}</button>
            </div>
        </aside>
    )
}