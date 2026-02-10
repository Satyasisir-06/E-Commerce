// Middleware to sync cart and wishlist with localStorage and Firestore
import { saveCart } from '../slices/cartSlice';
import { saveWishlist } from '../slices/wishlistSlice';

const CART_STORAGE_KEY = 'shopmart_cart';
const WISHLIST_STORAGE_KEY = 'shopmart_wishlist';

export const cartWishlistSyncMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    // Get the current state after the action
    const state = store.getState();
    const { cart, wishlist, auth } = state;

    // Cart actions that should trigger sync
    const cartActions = [
        'cart/addToCart',
        'cart/removeFromCart',
        'cart/updateQuantity',
        'cart/clearCart',
        'cart/moveToWishlist',
    ];

    // Wishlist actions that should trigger sync
    const wishlistActions = [
        'wishlist/addToWishlist',
        'wishlist/removeFromWishlist',
        'wishlist/clearWishlist',
        'wishlist/moveToCart',
    ];

    // Sync cart
    if (cartActions.includes(action.type)) {
        const cartData = {
            items: cart.items,
            totalQuantity: cart.totalQuantity,
            totalAmount: cart.totalAmount,
        };

        if (auth.isAuthenticated && auth.user?.uid) {
            // Save to Firestore for logged-in users
            store.dispatch(saveCart({
                userId: auth.user.uid,
                cartData
            }));
        } else {
            // Save to localStorage for guest users
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
            } catch (error) {
                console.error('Error saving cart to localStorage:', error);
            }
        }
    }

    // Sync wishlist
    if (wishlistActions.includes(action.type)) {
        const wishlistData = wishlist.items;

        if (auth.isAuthenticated && auth.user?.uid) {
            // Save to Firestore for logged-in users
            store.dispatch(saveWishlist({
                userId: auth.user.uid,
                items: wishlistData
            }));
        } else {
            // Save to localStorage for guest users
            try {
                localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistData));
            } catch (error) {
                console.error('Error saving wishlist to localStorage:', error);
            }
        }
    }

    return result;
};

// Helper functions to load from localStorage
export const loadCartFromStorage = () => {
    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : { items: [], totalQuantity: 0, totalAmount: 0 };
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return { items: [], totalQuantity: 0, totalAmount: 0 };
    }
};

export const loadWishlistFromStorage = () => {
    try {
        const wishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        return [];
    }
};

export const clearCartStorage = () => {
    try {
        localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing cart from localStorage:', error);
    }
};

export const clearWishlistStorage = () => {
    try {
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing wishlist from localStorage:', error);
    }
};
