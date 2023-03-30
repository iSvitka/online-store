interface IProductCartData {
    productId: number;
    amount: number;
}

export type TCartProductsData = Array<IProductCartData>;

export interface ICartProducts {
    totalPrice: number;
}

export interface ICartData {
    [key: number]: { amount: number; price: number };
}

export interface ICartContext {
    cartData: ICartData;
    modalState: boolean;
    addProductToCart: (productId: number, price: number) => void;
    deleteProductFromCart: (productId: number) => void;
    clearProductFromCart: () => void;
    changeProductAmount: (productId: number, amount: number) => void;
    closeModal: () => void;
    openModal: () => void;
}