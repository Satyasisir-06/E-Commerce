// Firestore Database Service
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    serverTimestamp,
    increment,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { db } from '../firebase';

// ==================== PRODUCTS ====================

/**
 * Get all products with pagination
 */
export const getProducts = async (limitCount = 20, lastDoc = null) => {
    try {
        let q = query(
            collection(db, 'products'),
            where('isActive', '==', true),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        if (lastDoc) {
            q = query(q, startAfter(lastDoc));
        }

        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return {
            success: true,
            products,
            lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
        };
    } catch (error) {
        console.error('Error getting products:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Get product by ID
 */
export const getProductById = async (productId) => {
    try {
        const productDoc = await getDoc(doc(db, 'products', productId));
        if (productDoc.exists()) {
            return {
                success: true,
                product: { id: productDoc.id, ...productDoc.data() }
            };
        }
        return { success: false, error: 'Product not found' };
    } catch (error) {
        console.error('Error getting product:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (categoryId, limitCount = 20) => {
    try {
        const q = query(
            collection(db, 'products'),
            where('category', '==', categoryId),
            where('isActive', '==', true),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, products };
    } catch (error) {
        console.error('Error getting products by category:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Search products
 */
export const searchProducts = async (searchTerm) => {
    try {
        const q = query(
            collection(db, 'products'),
            where('isActive', '==', true),
            orderBy('name')
        );

        const querySnapshot = await getDocs(q);
        const products = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const searchLower = searchTerm.toLowerCase();
            if (
                data.name.toLowerCase().includes(searchLower) ||
                data.description?.toLowerCase().includes(searchLower) ||
                data.brand?.toLowerCase().includes(searchLower)
            ) {
                products.push({ id: doc.id, ...data });
            }
        });

        return { success: true, products };
    } catch (error) {
        console.error('Error searching products:', error);
        return { success: false, error: error.message };
    }
};

// ==================== CATEGORIES ====================

/**
 * Get all categories
 */
export const getCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categories = [];
        querySnapshot.forEach((doc) => {
            categories.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, categories };
    } catch (error) {
        console.error('Error getting categories:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = async (slug) => {
    try {
        const q = query(
            collection(db, 'categories'),
            where('slug', '==', slug)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return {
                success: true,
                category: { id: doc.id, ...doc.data() }
            };
        }
        return { success: false, error: 'Category not found' };
    } catch (error) {
        console.error('Error getting category:', error);
        return { success: false, error: error.message };
    }
};

// ==================== CART ====================

/**
 * Get user's cart
 */
export const getCart = async (userId) => {
    try {
        const cartDoc = await getDoc(doc(db, 'carts', userId));
        if (cartDoc.exists()) {
            return {
                success: true,
                cart: cartDoc.data()
            };
        }
        return { success: true, cart: { items: [], total: 0 } };
    } catch (error) {
        console.error('Error getting cart:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Add item to cart
 */
export const addToCart = async (userId, productId, quantity = 1) => {
    try {
        const cartRef = doc(db, 'carts', userId);
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
            // Update existing cart
            const cart = cartDoc.data();
            const existingItem = cart.items.find(item => item.productId === productId);

            if (existingItem) {
                // Update quantity
                await updateDoc(cartRef, {
                    items: cart.items.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    ),
                    updatedAt: serverTimestamp()
                });
            } else {
                // Add new item
                await updateDoc(cartRef, {
                    items: arrayUnion({ productId, quantity }),
                    updatedAt: serverTimestamp()
                });
            }
        } else {
            // Create new cart
            await setDoc(cartRef, {
                items: [{ productId, quantity }],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
        }

        return { success: true, message: 'Item added to cart' };
    } catch (error) {
        console.error('Error adding to cart:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (userId, productId, quantity) => {
    try {
        const cartRef = doc(db, 'carts', userId);
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
            const cart = cartDoc.data();
            await updateDoc(cartRef, {
                items: cart.items.map(item =>
                    item.productId === productId ? { ...item, quantity } : item
                ),
                updatedAt: serverTimestamp()
            });
            return { success: true, message: 'Cart updated' };
        }

        return { success: false, error: 'Cart not found' };
    } catch (error) {
        console.error('Error updating cart:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (userId, productId) => {
    try {
        const cartRef = doc(db, 'carts', userId);
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
            const cart = cartDoc.data();
            await updateDoc(cartRef, {
                items: cart.items.filter(item => item.productId !== productId),
                updatedAt: serverTimestamp()
            });
            return { success: true, message: 'Item removed from cart' };
        }

        return { success: false, error: 'Cart not found' };
    } catch (error) {
        console.error('Error removing from cart:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Clear cart
 */
export const clearCart = async (userId) => {
    try {
        await setDoc(doc(db, 'carts', userId), {
            items: [],
            updatedAt: serverTimestamp()
        }, { merge: true });

        return { success: true, message: 'Cart cleared' };
    } catch (error) {
        console.error('Error clearing cart:', error);
        return { success: false, error: error.message };
    }
};

// ==================== WISHLIST ====================

/**
 * Get user's wishlist
 */
export const getWishlist = async (userId) => {
    try {
        const wishlistDoc = await getDoc(doc(db, 'wishlists', userId));
        if (wishlistDoc.exists()) {
            return {
                success: true,
                wishlist: wishlistDoc.data()
            };
        }
        return { success: true, wishlist: { items: [] } };
    } catch (error) {
        console.error('Error getting wishlist:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Add to wishlist
 */
export const addToWishlist = async (userId, productId) => {
    try {
        const wishlistRef = doc(db, 'wishlists', userId);
        await setDoc(wishlistRef, {
            items: arrayUnion(productId),
            updatedAt: serverTimestamp()
        }, { merge: true });

        return { success: true, message: 'Added to wishlist' };
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Remove from wishlist
 */
export const removeFromWishlist = async (userId, productId) => {
    try {
        const wishlistRef = doc(db, 'wishlists', userId);
        await updateDoc(wishlistRef, {
            items: arrayRemove(productId),
            updatedAt: serverTimestamp()
        });

        return { success: true, message: 'Removed from wishlist' };
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        return { success: false, error: error.message };
    }
};

// ==================== ORDERS ====================

/**
 * Create a new order
 */
export const createOrder = async (userId, orderData) => {
    try {
        const orderRef = await addDoc(collection(db, 'orders'), {
            userId,
            ...orderData,
            status: 'pending',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return {
            success: true,
            orderId: orderRef.id,
            message: 'Order created successfully'
        };
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Get user's orders
 */
export const getUserOrders = async (userId) => {
    try {
        const q = query(
            collection(db, 'orders'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, orders };
    } catch (error) {
        console.error('Error getting orders:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (orderId, status) => {
    try {
        await updateDoc(doc(db, 'orders', orderId), {
            status,
            updatedAt: serverTimestamp()
        });

        return { success: true, message: 'Order status updated' };
    } catch (error) {
        console.error('Error updating order status:', error);
        return { success: false, error: error.message };
    }
};

// ==================== USER PROFILE ====================

/**
 * Get user profile
 */
export const getUserProfile = async (userId) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            return {
                success: true,
                user: { id: userDoc.id, ...userDoc.data() }
            };
        }
        return { success: false, error: 'User not found' };
    } catch (error) {
        console.error('Error getting user profile:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, profileData) => {
    try {
        await updateDoc(doc(db, 'users', userId), {
            ...profileData,
            updatedAt: serverTimestamp()
        });

        return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: error.message };
    }
};
