import { IProductData } from '../ProductPage/types';

export interface ICartProduct {
    index: number;
    productData: IProductData;
    changeProductData: (productId: number) => void;
}
