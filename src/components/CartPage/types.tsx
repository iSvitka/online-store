import { ICartData } from '../../lib/CartContext/types';

export interface ICartProducts {
    products: ICartData;
}

export type PageChangeType = 'inc' | 'dec'