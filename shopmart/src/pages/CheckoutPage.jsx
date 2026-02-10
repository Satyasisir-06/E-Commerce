import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    CreditCard,
    Wallet,
    Truck,
    MapPin,
    ChevronRight,
    AlertCircle
} from 'lucide-react';
import { createOrder } from '../store/slices/orderSlice';
import { clearCart } from '../store/slices/cartSlice';
import Button from '../components/ui/Button';

export default function CheckoutPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
    const { loading } = useSelector((state) => state.orders);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        if (items.length === 0) {
            navigate('/cart');
        }
    }, [isAuthenticated, items.length, navigate]);

    // Form state
    const [shippingAddress, setShippingAddress] = useState({
        fullName: user?.displayName || '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
    });

    const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, card, upi
    const [errors, setErrors] = useState({});

    // Pricing
    const subtotal = totalAmount;
    const tax = subtotal * 0.18; // 18% GST
    const shipping = subtotal > 499 ? 0 : 50;
    const total = subtotal + tax + shipping;

    const validateForm = () => {
        const newErrors = {};

        if (!shippingAddress.fullName) newErrors.fullName = 'Name is required';
        if (!shippingAddress.phone || !/^\d{10}$/.test(shippingAddress.phone)) {
            newErrors.phone = 'Valid 10-digit phone number required';
        }
        if (!shippingAddress.addressLine1) newErrors.addressLine1 = 'Address is required';
        if (!shippingAddress.city) newErrors.city = 'City is required';
        if (!shippingAddress.state) newErrors.state = 'State is required';
        if (!shippingAddress.pincode || !/^\d{6}$/.test(shippingAddress.pincode)) {
            newErrors.pincode = 'Valid 6-digit pincode required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const orderData = {
            userId: user.uid,
            userEmail: user.email,
            userName: user.displayName,
            items: items.map(item => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                variant: item.variant,
                totalPrice: item.totalPrice,
            })),
            shippingAddress,
            paymentMethod,
            subtotal,
            tax,
            shipping,
            total,
            status: 'pending',
            paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        };

        try {
            const result = await dispatch(createOrder(orderData));
            if (!result.error) {
                // Clear cart
                dispatch(clearCart());
                // Navigate to order confirmation
                navigate(`/order-confirmation/${result.payload.id}`);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const paymentMethods = [
        {
            id: 'cod',
            name: 'Cash on Delivery',
            icon: Wallet,
            description: 'Pay when you receive',
        },
        {
            id: 'card',
            name: 'Credit/Debit Card',
            icon: CreditCard,
            description: 'Secure payment (Demo)',
            disabled: true,
        },
        {
            id: 'upi',
            name: 'UPI',
            icon: Wallet,
            description: 'Phone Pe, Google Pay (Demo)',
            disabled: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Checkout</h1>
                    <div className="flex items-center gap-2 text-sm text-muted">
                        <span>Cart</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-primary font-medium">Checkout</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex items-center justify-center">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-foreground">
                                        Shipping Address
                                    </h2>
                                    <p className="text-sm text-muted">Where should we deliver your order?</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={shippingAddress.fullName}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${errors.fullName ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                        placeholder="John Doe"
                                    />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={shippingAddress.phone}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                        placeholder="9876543210"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Pincode *
                                    </label>
                                    <input
                                        type="text"
                                        value={shippingAddress.pincode}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${errors.pincode ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                        placeholder="110001"
                                    />
                                    {errors.pincode && (
                                        <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Address Line 1 *
                                    </label>
                                    <input
                                        type="text"
                                        value={shippingAddress.addressLine1}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${errors.addressLine1 ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                        placeholder="House No., Building Name"
                                    />
                                    {errors.addressLine1 && (
                                        <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Address Line 2 (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={shippingAddress.addressLine2}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Road Name, Area, Colony"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        value={shippingAddress.city}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${errors.city ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                        placeholder="Mumbai"
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        value={shippingAddress.state}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${errors.state ? 'border-red-500' : ' border-gray-200'
                                            }`}
                                        placeholder="Maharashtra"
                                    />
                                    {errors.state && (
                                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex items-center justify-center">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-heading font-bold text-foreground">
                                        Payment Method
                                    </h2>
                                    <p className="text-sm text-muted">Select how you want to pay</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon;
                                    return (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => !method.disabled && setPaymentMethod(method.id)}
                                            disabled={method.disabled}
                                            className={`w-full p-4 border-2 rounded-xl text-left transition-all ${paymentMethod === method.id
                                                ? 'border-primary bg-primary-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                } ${method.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === method.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-foreground flex items-center gap-2">
                                                        {method.name}
                                                        {method.disabled && (
                                                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                                                                Coming Soon
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-muted">{method.description}</p>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id
                                                    ? 'border-primary'
                                                    : 'border-gray-300'
                                                    }`}>
                                                    {paymentMethod === method.id && (
                                                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                                Order Summary
                            </h3>

                            {/* Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.variant}`} className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-foreground text-sm line-clamp-1">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-muted">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-foreground">
                                            ₹{item.totalPrice.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 py-4 border-t border-gray-100">
                                <div className="flex justify-between text-muted">
                                    <span>Subtotal ({totalQuantity} items)</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-muted">
                                    <span>GST (18%)</span>
                                    <span>₹{tax.toFixed(0).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted">Shipping</span>
                                    {shipping === 0 ? (
                                        <span className="flex items-center gap-1">
                                            <span className="text-green-600 font-medium">FREE</span>
                                            <Truck className="w-4 h-4 text-green-600" />
                                        </span>
                                    ) : (
                                        <span className="text-muted">₹{shipping}</span>
                                    )}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center py-4 border-t border-gray-100">
                                <span className="text-lg font-bold text-foreground">Total</span>
                                <span className="text-2xl font-bold text-primary">
                                    ₹{total.toFixed(0).toLocaleString('en-IN')}
                                </span>
                            </div>

                            {/* Place Order Button */}
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full"
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </Button>

                            {/* Security Info */}
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-green-800">Safe & Secure</p>
                                        <p className="text-xs text-green-600 mt-1">
                                            Your payment information is encrypted and secure
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
