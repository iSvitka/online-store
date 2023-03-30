import { FilterNames } from "../../components/Filters/types";

export interface GenericRangeInputFilter{
    min: number;
    max: number;
    minValue: number;
    maxValue: number;
    title: 'Price' | 'Stock'
    changeFilters: (filterName: FilterNames, filterValue: [number, number]) => void;
    filters: number[] | undefined;
}