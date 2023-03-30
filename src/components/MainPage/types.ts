export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

export interface FiltersType {
    'Brand'?: string[];
    'Category'?: string[];
    'Stock'?: number[];
    'Price'?: number[];
}

// export interface CardSizes {
//     bigCards: boolean;
//     smallCards: boolean;
// }

export type CardSizes = 'big' | 'small'

export interface LinkOfFilters {
    linkFilters:FiltersType | null;
    linkSearch: string | null;
    linkSort: string | null;
    linkCardSize: string | null;
}

export type SortMethodType = 'high-rate' | 'low-rate' | 'high-price' | 'low-price'