import { FilterNames, FilterTypes } from "../Filters/types";
import { Product } from "../MainPage/types";

export interface RangeFilterProps {
    defaultProducts: Product[];
    filteredProducts: Product[];
    type: 'price' | 'stock';
    changeFilters: (filterName: FilterNames, filterValue:FilterTypes) => void;
    currentFilters: number[] | undefined
}
