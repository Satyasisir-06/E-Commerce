import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { removeFromWishlist, clearWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import Button from '../components/ui/Button';

export default function WishlistPage() {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.wishlist);

    const handleRemove = (id) => {
        dispatch(removeFromWishlist(id));
    };

    const handleMoveToCart = (item) => {
        dispatch(addToCart({
            id: item.id,
            name: item.name,
            price: item.price?.discounted || item.price?.original || 999,
            image: item.image,
            quantity: 1,
            variant: null,
        }));
        dispatch(removeFromWishlist(item.id));
    };

    if (!items || items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container-custom py-16">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-12 h-12 text-gray-400" />
                        </div>
                        <h1 className="text-2xl font-heading font-bold text-foreground mb-3">
                            Your wishlist is empty
                        </h1>
                        <p className="text-muted mb-8">
                            Save items you love by clicking the heart icon on any product.
                        </p>
                        <Link to="/products">
                            <Button variant="primary" size="lg">
                                Explore Products
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
                            My Wishlist
                        </h1>
                        <p className="text-muted mt-1">
                            {items.length} {items.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>
                    <button
                        onClick={() => dispatch(clearWishlist())}
                        className="text-red-500 hover:text-red-600 text-sm font-medium cursor-pointer"
                    >
                        Clear All
                    </button>
                </div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
                        >
                            {/* Image */}
                            <Link to={`/product/${item.id}`} className="block relative aspect-square">
                                <img
                                    src={item.image || 'https://via.placeholder.com/300x300?text=Product'}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleRemove(item.id);
                                    }}
                                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-red-50 text-red-500 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </Link>

                            {/* Info */}
                            <div className="p-4">
                                <Link
                                    to={`/product/${item.id}`}
                                    className="font-medium text-foreground hover:text-primary line-clamp-2 mb-2"
                                >
                                    {item.name}
                                </Link>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg font-bold text-foreground">
                                        ₹{(item.price?.discounted || item.price?.original || 999).toLocaleString('en-IN')}
                                    </span>
                                    {item.price?.original && item.price?.discounted && item.price.original > item.price.discounted && (
                                        <span className="text-sm text-muted line-through">
                                            ₹{item.price.original.toLocaleString('en-IN')}
                                        </span>
                                    )}
                                </div>

                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={() => handleMoveToCart(item)}
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Move to Cart
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
