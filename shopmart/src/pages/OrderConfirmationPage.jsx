import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    CheckCircle,
    Package,
    Truck,
    MapPin,
    Calendar,
    Download,
    Home,
    ShoppingBag
} from 'lucide-react';
import { fetchUserOrders } from '../store/slices/orderSlice';
import Button from '../components/ui/Button';
import { PageSpinner } from '../components/ui/Spinner';

export default function OrderConfirmationPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { orders, loading } = useSelector((state) => state.orders);

    const order = orders.find(o => o.id === orderId);

    useEffect(() => {
        if (user?.uid && !order) {
            dispatch(fetchUserOrders(user.uid));
        }
    }, [user?.uid, order, dispatch]);

    const handlePrint = () => {
        window.print();
    };

    if (loading && !order) {
        return <PageSpinner />;
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                        Order NotFound
                    </h2>
                    <p className="text-muted mb-6">We couldn't find this order</p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        Go to Home
                    </Button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom max-w-4xl">
                {/* Success Message */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-muted mb-4">
                        Thank you for your order. We'll send you an email confirmation shortly.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                        <span className="text-sm text-muted">Order ID:</span>
                        <span className="font-mono font-semibold text-foreground">
                            #{orderId.substring(0, 12).toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h2 className="text-xl font-heading font-bold text-foreground mb-6">
                        Order Details
                    </h2>

                    {/* Timeline */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Order Placed</p>
                                    <p className="text-sm text-muted">{formatDate(order.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-4"></div>
                            <div className="flex items-center gap-3 opacity-50">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Package className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Processing</p>
                                    <p className="text-sm text-muted">Pending</p>
                                </div>
                            </div>
                            <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-4"></div>
                            <div className="flex items-center gap-3 opacity-50">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Truck className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Shipped</p>
                                    <p className="text-sm text-muted">Pending</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-foreground mb-4">Items Ordered</h3>
                        <div className="space-y-4">
                            {order.items?.map((item, index) => (
                                <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">{item.name}</p>
                                        <p className="text-sm text-muted">Quantity: {item.quantity}</p>
                                        {item.variant && (
                                            <p className="text-sm text-muted">Variant: {item.variant}</p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-foreground">
                                            ₹{item.totalPrice.toLocaleString('en-IN')}
                                        </p>
                                        <p className="text-sm text-muted">
                                            ₹{item.price.toLocaleString('en-IN')} each
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-2 pb-4 border-b border-gray-100">
                        <div className="flex justify-between text-muted">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-muted">
                            <span>GST (18%)</span>
                            <span>₹{order.tax.toFixed(0).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-muted">
                            <span>Shipping</span>
                            <span>
                                {order.shipping === 0 ? (
                                    <span className="text-green-600 font-medium">FREE</span>
                                ) : (
                                    `₹${order.shipping}`
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <span className="text-lg font-bold text-foreground">Total</span>
                        <span className="text-2xl font-bold text-primary">
                            ₹{order.total.toFixed(0).toLocaleString('en-IN')}
                        </span>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Shipping Address</h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium text-foreground">{order.shippingAddress?.fullName}</p>
                        <p className="text-muted mt-1">{order.shippingAddress?.addressLine1}</p>
                        {order.shippingAddress?.addressLine2 && (
                            <p className="text-muted">{order.shippingAddress.addressLine2}</p>
                        )}
                        <p className="text-muted">
                            {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                        </p>
                        <p className="text-muted mt-2">Phone: {order.shippingAddress?.phone}</p>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Payment Information</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-muted mb-1">Payment Method</p>
                            <p className="font-semibold text-foreground capitalize">
                                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-muted mb-1">Payment Status</p>
                            <p className={`font-semibold capitalize ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                                }`}>
                                {order.paymentStatus}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Button variant="outline" onClick={handlePrint} className="flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        Download Invoice
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/')} className="flex items-center justify-center gap-2">
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Button>
                    <Button variant="primary" onClick={() => navigate('/products')} className="flex items-center justify-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
}
