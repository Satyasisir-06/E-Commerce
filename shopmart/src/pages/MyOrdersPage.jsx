import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    ChevronRight,
    ShoppingBag
} from 'lucide-react';
import { fetchUserOrders } from '../store/slices/orderSlice';
import { PageSpinner } from '../components/ui/Spinner';
import Button from '../components/ui/Button';

export default function MyOrdersPage() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { orders, loading } = useSelector((state) => state.orders);

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchUserOrders(user.uid));
        }
    }, [user?.uid, dispatch]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-5 h-5" />;
            case 'processing':
                return <Package className="w-5 h-5" />;
            case 'shipped':
                return <Truck className="w-5 h-5" />;
            case 'delivered':
                return <CheckCircle className="w-5 h-5" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5" />;
            default:
                return <Package className="w-5 h-5" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (loading && orders.length === 0) {
        return <PageSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                        My Orders
                    </h1>
                    <p className="text-muted">Track and manage your orders</p>
                </div>

                {/* Orders List */}
                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                            No Orders Yet
                        </h2>
                        <p className="text-muted mb-6">
                            You haven't placed any orders yet. Start shopping!
                        </p>
                        <Link to="/products">
                            <Button variant="primary">Browse Products</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {/* Order Header */}
                                <div className="bg-gray-50 p-6 border-b border-gray-100">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted">Order ID</p>
                                                <p className="font-mono font-semibold text-foreground">
                                                    #{order.id.substring(0, 12).toUpperCase()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6">
                                            <div>
                                                <p className="text-sm text-muted">Order Date</p>
                                                <p className="font-medium text-foreground">{formatDate(order.createdAt)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted">Total Amount</p>
                                                <p className="font-bold text-primary text-lg">
                                                    ₹{order.total.toFixed(0).toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted mb-1">Status</p>
                                                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-lg capitalize ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.items?.slice(0, 3).map((item, index) => (
                                            <div key={index} className="flex gap-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-20 h-20 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-foreground line-clamp-1">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-muted">Quantity: {item.quantity}</p>
                                                    {item.variant && (
                                                        <p className="text-sm text-muted">Variant: {item.variant}</p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-foreground">
                                                        ₹{item.totalPrice.toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {order.items?.length > 3 && (
                                            <p className="text-sm text-muted">
                                                +{order.items.length - 3} more item(s)
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                                        <Link to={`/order-confirmation/${order.id}`} className="flex-1 min-w-[200px]">
                                            <Button
                                                variant="primary"
                                                className="w-full flex items-center justify-center gap-2"
                                            >
                                                View Details
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        {order.status === 'delivered' && (
                                            <Button
                                                variant="outline"
                                                className="flex-1 min-w-[200px]"
                                            >
                                                Buy Again
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Order Timeline */}
                                {order.status !== 'cancelled' && (
                                    <div className="bg-gray-50 p-6 border-t border-gray-100">
                                        <div className="flex items-center gap-2 justify-between max-w-2xl mx-auto">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'pending' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered'
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-200 text-gray-400'
                                                    }`}>
                                                    <CheckCircle className="w-5 h-5" />
                                                </div>
                                                <p className="text-xs text-muted text-center">Placed</p>
                                            </div>
                                            <div className={`flex-1 h-1 ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered'
                                                    ? 'bg-green-200'
                                                    : 'bg-gray-200'
                                                }`}></div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered'
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-200 text-gray-400'
                                                    }`}>
                                                    <Package className="w-5 h-5" />
                                                </div>
                                                <p className="text-xs text-muted text-center">Processing</p>
                                            </div>
                                            <div className={`flex-1 h-1 ${order.status === 'shipped' || order.status === 'delivered'
                                                    ? 'bg-green-200'
                                                    : 'bg-gray-200'
                                                }`}></div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'shipped' || order.status === 'delivered'
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-200 text-gray-400'
                                                    }`}>
                                                    <Truck className="w-5 h-5" />
                                                </div>
                                                <p className="text-xs text-muted text-center">Shipped</p>
                                            </div>
                                            <div className={`flex-1 h-1 ${order.status === 'delivered'
                                                    ? 'bg-green-200'
                                                    : 'bg-gray-200'
                                                }`}></div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'delivered'
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-200 text-gray-400'
                                                    }`}>
                                                    <CheckCircle className="w-5 h-5" />
                                                </div>
                                                <p className="text-xs text-muted text-center">Delivered</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
