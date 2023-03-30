import { FilterNames, FilterTypes } from "../Filters/types";
import { Product } from "../MainPage/types";

export interface CheckboxFilterProps {
    defaultProducts: Product[];
    filteredProducts: Product[];
    prop: keyof Product;
    title: FilterNames;

    isReset: boolean;
    setResetFalse: () => void;
    changeFilters: (filterName: FilterNames, filterValue:FilterTypes) => void;
    currentFilters: ICheckboxFilters | undefined
}

export type ICheckboxFilters = string[]
export type FiltersArr = [string, [number, number, boolean]][]