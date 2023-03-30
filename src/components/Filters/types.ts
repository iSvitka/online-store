import { FiltersType, Product } from "../MainPage/types";

export interface FiltersProps {
    defaultProducts: Product[];
    filteredProducts: Product[];
    getFilters: (newFilters: IFilters) => void;
    resetFilters: () => void;
    filters: FiltersType | undefined;
}

export type FilterNames = 'Brand' | 'Category' | 'Stock' | 'Price';
export type FilterTypes = string[] | [number, number];

export interface IFilters {
    [key: string]: FilterTypes;
}