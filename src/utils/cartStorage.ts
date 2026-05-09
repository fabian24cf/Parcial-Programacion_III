import type { CartItem, IProduct} from "../types/product";

const CART_KEY = "FoodStore_cart";

export function getCart (): CartItem[] {
    try{
        const raw= localStorage.getItem(CART_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as CartItem[];
        return Array.isArray(parsed) ? parsed : [];
    }catch(error){
        console.error("Error parsing cart from localStorage:", error);
        return [];
    }
}

export function saveCart(cart: CartItem[]): void {
    try{
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }catch(error){
        console.error("Error saving cart to localStorage:", error);
    }
};

export function addToCart(product: IProduct): void {    
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        cart.push({
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            descripcion: product.descripcion,
            imagen: product.imagen,
            cantidad: 1
        });
    }
    saveCart(cart);
};


export function removeFromCart(productId: number): void {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
}

export function updateQuantity(productId: number, newQty: number): void {
    if (newQty <= 0) {
        removeFromCart(productId);
        return;
    }
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.cantidad = newQty;
        saveCart(cart);
    }
}

export function getCartCount(): number {
    return getCart().reduce((total, item) => total + item.cantidad, 0);
}

export function getCartTotal(): number {
    return getCart().reduce((total, item) => total + item.precio * item.cantidad, 0);
}

export function clearCart(): void {
    localStorage.removeItem(CART_KEY);
}   

