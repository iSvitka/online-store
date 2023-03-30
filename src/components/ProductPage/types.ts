export type ProductImages = Array<string>;
export type ProductThumbnail = string;
type ProductId = number;

export interface IProductData {
    id: ProductId;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: ProductThumbnail;
    images: ProductImages;
    amount?: number;
}

export interface IProductPageProps {
    productId: ProductId;
}

export interface IProductImages {
    thumbnail: ProductThumbnail;
    images: ProductImages;
}
