import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    TrendingUp,
    ShoppingCart,
    Package,
    Users,
    DollarSign,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import { fetchProducts } from '../../store/slices/productSlice';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Calculate stats
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;

    const stats = [
        {
            name: 'Total Revenue',
            value: `₹${totalRevenue.toLocaleString('en-IN')}`,
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'bg-green-100 text-green-600',
        },
        {
            name: 'Total Orders',
            value: totalOrders,
            change: '+8.2%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            name: 'Products',
            value: totalProducts,
            change: '+5',
            trend: 'up',
            icon: Package,
            color: 'bg-purple-100 text-purple-600',
        },
        {
            name: 'Pending Orders',
            value: pendingOrders,
            change: '-3.1%',
            trend: 'down',
            icon: TrendingUp,
            color: 'bg-orange-100 text-orange-600',
        },
    ];

    const recentOrders = orders.slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                    Dashboard
                </h1>
                <p className="text-muted">Welcome back! Here's what's happening with your store.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
                    return (
                        <div
                            key={stat.name}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    <TrendIcon className="w-4 h-4" />
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                            <p className="text-sm text-muted">{stat.name}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
                <Link
                    to="/admin/products"
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-primary group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-100 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">Manage Products</p>
                            <p className="text-sm text-muted">Add, edit or remove products</p>
                        </div>
                    </div>
                </Link>

                <Link
                    to="/admin/orders"
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-primary group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">View Orders</p>
                            <p className="text-sm text-muted">Manage and fulfill orders</p>
                        </div>
                    </div>
                </Link>

                <Link
                    to="/admin/customers"
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-primary group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">Customers</p>
                            <p className="text-sm text-muted">View customer details</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Orders */}
            {recentOrders.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-heading font-bold text-foreground">
                                Recent Orders
                            </h2>
                            <Link to="/admin/orders" className="text-primary hover:text-primary-600 font-medium text-sm">
                                View All →
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-mono font-medium text-foreground">
                                                #{order.id.substring(0, 8).toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-foreground">{order.userName || 'Guest'}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-muted">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                                'bg-red-100 text-red-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-semibold text-foreground">
                                                ₹{order.total.toFixed(0).toLocaleString('en-IN')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
