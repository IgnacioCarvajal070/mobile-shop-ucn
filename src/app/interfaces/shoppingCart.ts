export interface ShoppingCart {
    cartId: number;
    userId: number;
    cartItems: CartItem[];
}
export interface CartItem {
    productId: number;
    quantity: number;
}