import RangeInputFilter from "../../generics/RangeInputFilter/RangeInputFilter";
import { FilterNames } from "../Filters/types";
import styles from './styles.module.scss';
import { RangeFilterProps } from "./types";

export default function RangeFilter({defaultProducts, filteredProducts, type, changeFilters, currentFilters}:RangeFilterProps) {
    let rangeType:FilterNames;
    if(type === 'price') {
        rangeType = 'Price'
    } else {
        rangeType = 'Stock'
    }
    const min = Math.min(...(defaultProducts.map(product => product[type])));
    const max = Math.max(...(defaultProducts.map(product => product[type])));
    return(
        <div className={styles.rangeContainer}>
                <h3 className={styles.rangeHeading}>{rangeType}</h3>
                <RangeInputFilter 
                    min={min} 
                    max={max} 
                    minValue={Math.min(...(filteredProducts.map(product => product[type])))}
                    maxValue={Math.max(...(filteredProducts.map(product => product[type])))}
                    title={rangeType}
                    changeFilters={changeFilters}
                    filters={currentFilters}
                />
        </div>
    )
}