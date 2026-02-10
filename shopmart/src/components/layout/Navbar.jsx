import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Search,
    ShoppingCart,
    Heart,
    User,
    Menu,
    X,
    ChevronDown,
    LogOut,
    Package,
    Settings
} from 'lucide-react';
import { logoutUser } from '../../store/slices/authSlice';
import { categories } from '../../data/productsData';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const userMenuRef = useRef(null);
    const categoryRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { totalQuantity } = useSelector((state) => state.cart);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setIsUserMenuOpen(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-cta rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="font-heading font-bold text-xl text-foreground hidden sm:block">
                            ShopMart
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
                            Home
                        </Link>

                        {/* Categories Dropdown */}
                        <div ref={categoryRef} className="relative">
                            <button
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition-colors font-medium cursor-pointer"
                            >
                                Categories
                                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isCategoryOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in z-50">
                                    {categories.slice(0, 10).map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/products?category=${category.id}`}
                                            onClick={() => setIsCategoryOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            <span className="text-gray-700">{category.name}</span>
                                        </Link>
                                    ))}
                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <Link
                                            to="/categories"
                                            onClick={() => setIsCategoryOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2.5 text-blue-500 font-medium hover:bg-blue-50 transition-colors cursor-pointer"
                                        >
                                            View All Categories
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link to="/products" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
                            Products
                        </Link>

                        <Link to="/deals" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                            Deals 🔥
                        </Link>

                        <Link to="/about" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
                            About
                        </Link>

                        <Link to="/contact" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
                            Contact
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-primary transition-colors cursor-pointer"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    {/* Right Icons */}
                    <div className="flex items-center gap-2">
                        {/* Wishlist */}
                        <Link
                            to="/wishlist"
                            className="relative p-2.5 text-foreground hover:text-primary hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
                        >
                            <Heart className="w-6 h-6" />
                            {wishlistItems?.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cta text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-2.5 text-foreground hover:text-primary hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cta text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {totalQuantity > 99 ? '99+' : totalQuantity}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div ref={userMenuRef} className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
                                >
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 bg-primary-100 text-primary rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5" />
                                        </div>
                                    )}
                                    <ChevronDown className={`w-4 h-4 text-muted transition-transform hidden sm:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="font-semibold text-foreground truncate">{user?.displayName || 'User'}</p>
                                            <p className="text-sm text-muted truncate">{user?.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            <User className="w-5 h-5 text-muted" />
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/my-orders"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            <Package className="w-5 h-5 text-muted" />
                                            My Orders
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                            >
                                                <Settings className="w-5 h-5" />
                                                Admin Panel
                                            </Link>
                                        )}
                                        <div className="border-t border-gray-100 mt-2 pt-2">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="btn-primary btn-sm">
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2.5 text-foreground hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="md:hidden mt-3">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-primary transition-colors cursor-pointer"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 animate-slide-down">
                        <div className="space-y-2">
                            {categories.slice(0, 8).map((category) => (
                                <Link
                                    key={category.id}
                                    to={`/products?category=${category.id}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-4 py-2.5 text-foreground hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    {category.name}
                                </Link>
                            ))}
                            <Link
                                to="/products"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2.5 text-primary font-medium hover:bg-primary-50 rounded-lg transition-colors cursor-pointer"
                            >
                                All Products
                            </Link>
                            <Link
                                to="/deals"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2.5 text-cta font-semibold hover:bg-cta-50 rounded-lg transition-colors cursor-pointer"
                            >
                                Deals 🔥
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
