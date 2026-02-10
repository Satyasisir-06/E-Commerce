// Initialize cart and wishlist from storage or Firestore
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, loadCartFromStorage as loadCart } from '../store/slices/cartSlice';
import { fetchWishlist } from '../store/slices/wishlistSlice';
import {
    loadCartFromStorage,
    loadWishlistFromStorage,
    clearCartStorage,
    clearWishlistStorage
} from '../store/middleware/cartWishlistSync';

/**
 * Hook to initialize and sync cart/wishlist on app load and auth changes
 */
export const useCartWishlistSync = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        const initializeData = async () => {
            if (isAuthenticated && user?.uid) {
                // User is logged in
                // 1. Fetch cart and wishlist from Firestore
                await dispatch(fetchCart(user.uid));
                await dispatch(fetchWishlist(user.uid));

                // 2. Check if there's guest cart data in localStorage
                const guestCart = loadCartFromStorage();
                const guestWishlist = loadWishlistFromStorage();

                // 3. Merge guest cart with user cart if any
                if (guestCart.items?.length > 0) {
                    // Import guest cart items to user cart
                    const { addToCart } = await import('../store/slices/cartSlice');
                    guestCart.items.forEach(item => {
                        dispatch(addToCart(item));
                    });

                    // Clear guest cart
                    clearCartStorage();
                }

                // 4. Merge guest wishlist with user wishlist if any
                if (guestWishlist?.length > 0) {
                    // Import guest wishlist items to user wishlist
                    const { addToWishlist } = await import('../store/slices/wishlistSlice');
                    guestWishlist.forEach(item => {
                        dispatch(addToWishlist(item));
                    });

                    // Clear guest wishlist
                    clearWishlistStorage();
                }
            } else {
                // User is not logged in (guest)
                // Load cart and wishlist from localStorage
                const guestCart = loadCartFromStorage();
                const guestWishlist = loadWishlistFromStorage();

                if (guestCart) {
                    dispatch(loadCart(guestCart));
                }

                if (guestWishlist?.length > 0) {
                    const { addToWishlist } = await import('../store/slices/wishlistSlice');
                    guestWishlist.forEach(item => {
                        dispatch(addToWishlist(item));
                    });
                }
            }
        };

        initializeData();
    }, [isAuthenticated, user?.uid, dispatch]);

    return null;
};
