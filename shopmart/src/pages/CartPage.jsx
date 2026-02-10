import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Trash2,
    Plus,
    Minus,
    Heart,
    ShoppingBag,
    ArrowLeft,
    Tag,
    Truck,
    Shield,
    ArrowRight
} from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import Button from '../components/ui/Button';
import { useToast } from '../contexts/ToastContext';
import { useState } from 'react';

export default function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    const handleRemove = (id, variant) => {
        dispatch(removeFromCart({ id, variant }));
        toast.success('Item removed from cart');
    };

    const handleUpdateQuantity = (id, variant, newQuantity) => {
        if (newQuantity < 1) {
            dispatch(removeFromCart({ id, variant }));
            toast.success('Item removed from cart');
        } else {
            dispatch(updateQuantity({ id, variant, quantity: newQuantity }));
        }
    };

    const handleMoveToWishlist = (item) => {
        dispatch(addToWishlist(item));
        dispatch(removeFromCart({ id: item.id, variant: item.variant })); // Assuming item has id and variant
        toast.info('Moved to wishlist');
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            dispatch(clearCart());
            toast.success('Cart cleared');
        }
    };

    const handleApplyCoupon = () => {
        if (couponCode.toLowerCase() === 'save10') {
            setCouponApplied(true);
            toast.success('Coupon "SAVE10" applied!');
        } else {
            toast.error('Invalid coupon code.');
        }
    };

    const discount = couponApplied ? totalAmount * 0.1 : 0;
    const shipping = totalAmount > 499 ? 0 : 49;
    const finalTotal = totalAmount - discount + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container-custom py-16">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-12 h-12 text-gray-400" />
                        </div>
                        <h1 className="text-2xl font-heading font-bold text-foreground mb-3">
                            Your cart is empty
                        </h1>
                        <p className="text-muted mb-8">
                            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
                        </p>
                        <Link to="/products">
                            <Button variant="primary" size="lg">
                                Start Shopping
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                            Shopping Cart
                        </h1>
                        <p className="text-muted mt-1">
                            {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="text-red-500 hover:text-red-600 text-sm font-medium cursor-pointer"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.variant}`}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6"
                            >
                                <div className="flex gap-4 md:gap-6">
                                    {/* Image */}
                                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                                        <img
                                            src={item.image || 'https://via.placeholder.com/120x120?text=Product'}
                                            alt={item.name}
                                            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                                        />
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="font-medium text-foreground hover:text-primary line-clamp-2 mb-1"
                                        >
                                            {item.name}
                                        </Link>

                                        {item.variant && (
                                            <p className="text-sm text-muted mb-2">
                                                Variant: {item.variant.size || item.variant.color || 'Standard'}
                                            </p>
                                        )}

                                        <p className="text-lg font-bold text-foreground mb-4">
                                            ₹{item.price.toLocaleString('en-IN')}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between">
                                            {/* Quantity */}
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.variant, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-50 transition-colors cursor-pointer"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-4 py-2 font-medium text-foreground border-x border-gray-200">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.variant, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-50 transition-colors cursor-pointer"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => handleRemoveItem(item.id, item.variant)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="hidden md:block text-right">
                                        <p className="text-sm text-muted mb-1">Total</p>
                                        <p className="text-lg font-bold text-foreground">
                                            ₹{item.totalPrice.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                            <h2 className="font-heading font-semibold text-lg text-foreground mb-6">
                                Order Summary
                            </h2>

                            {/* Coupon */}
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Coupon code"
                                            className="input pl-10"
                                            disabled={couponApplied}
                                        />
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={handleApplyCoupon}
                                        disabled={couponApplied || !couponCode}
                                    >
                                        Apply
                                    </Button>
                                </div>
                                {couponApplied && (
                                    <p className="text-green-600 text-sm mt-2">
                                        Coupon applied! You saved ₹{discount.toLocaleString('en-IN')}
                                    </p>
                                )}
                                <p className="text-xs text-muted mt-2">Try: SAVE10</p>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-muted">
                                    <span>Subtotal</span>
                                    <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-muted">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3">
                                    <div className="flex justify-between text-lg font-bold text-foreground">
                                        <span>Total</span>
                                        <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Free Shipping Progress */}
                            {totalAmount < 499 && (
                                <div className="mb-6 p-4 bg-primary-50 rounded-xl">
                                    <div className="flex items-center gap-2 text-primary text-sm mb-2">
                                        <Truck className="w-4 h-4" />
                                        Add ₹{(499 - totalAmount).toLocaleString('en-IN')} more for free shipping!
                                    </div>
                                    <div className="w-full bg-primary-200 rounded-full h-2">
                                        <div
                                            className="bg-primary rounded-full h-2 transition-all"
                                            style={{ width: `${Math.min((totalAmount / 499) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Checkout Button */}
                            <Link to="/checkout">
                                <Button variant="primary" size="lg" className="w-full mb-4">
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>

                            <Link to="/products">
                                <Button variant="ghost" className="w-full">
                                    Continue Shopping
                                </Button>
                            </Link>

                            {/* Trust Badges */}
                            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-1 text-xs text-muted">
                                    <Shield className="w-4 h-4 text-green-600" />
                                    Secure Checkout
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted">
                                    <Truck className="w-4 h-4 text-primary" />
                                    Fast Delivery
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
