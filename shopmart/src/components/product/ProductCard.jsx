import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { useToast } from '../../contexts/ToastContext';
import Badge from '../ui/Badge';

export default function ProductCard({ product }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const toast = useToast();

    const { items: wishlistItems } = useSelector((state) => state.wishlist);
    const isInWishlist = wishlistItems?.some((item) => item.id === product.id);

    const discountPercentage = product.price?.original && product.price?.discounted
        ? Math.round(((product.price.original - product.price.discounted) / product.price.original) * 100)
        : 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price?.discounted || product.price?.original || 999,
            image: product.images?.[0] || '',
            quantity: 1,
            variant: null,
        }));
        toast.success(`${product.name} added to cart!`);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
            toast.info('Removed from wishlist');
        } else {
            dispatch(addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || '',
            }));
            toast.success('Added to wishlist!');
        }
    };

    return (
        <Link
            to={`/ product / ${product.id} `}
            className="product-card group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="product-card-image">
                {/* Skeleton loader */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                )}

                <img
                    src={product.images?.[0] || 'https://via.placeholder.com/300x300?text=Product'}
                    alt={product.name}
                    className={`w - full h - full object - cover transition - transform duration - 300 group - hover: scale - 105 ${imageLoaded ? 'opacity-100' : 'opacity-0'} `}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <div className="absolute top-3 left-3">
                        <Badge variant="discount">-{discountPercentage}%</Badge>
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlistToggle}
                    className={`absolute top - 3 right - 3 w - 10 h - 10 rounded - full flex items - center justify - center transition - all cursor - pointer ${isInWishlist
                        ? 'bg-red-50 text-red-500'
                        : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                        } `}
                >
                    <Heart className={`w - 5 h - 5 ${isInWishlist ? 'fill-current' : ''} `} />
                </button>

                {/* Quick Actions - Appear on hover */}
                <div className={`absolute bottom - 0 left - 0 right - 0 p - 3 bg - gradient - to - t from - black / 60 to - transparent transition - all duration - 300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} `}>
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 flex items-center justify-center gap-2 bg-white text-foreground py-2.5 rounded-lg font-medium hover:bg-cta hover:text-white transition-colors cursor-pointer"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                        <Link
                            to={`/ product / ${product.id} `}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-lg flex items-center justify-center hover:bg-white hover:text-foreground transition-colors"
                        >
                            <Eye className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="product-card-body">
                {/* Category */}
                {product.category?.[0] && (
                    <p className="text-xs text-muted uppercase tracking-wide mb-1">
                        {product.category[0]}
                    </p>
                )}

                {/* Name */}
                <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                {product.ratings?.average > 0 && (
                    <div className="flex items-center gap-1.5 mb-2">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w - 3.5 h - 3.5 ${i < Math.floor(product.ratings.average)
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300'
                                        } `}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-muted">
                            ({product.ratings.count || 0})
                        </span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">
                        ₹{(product.price?.discounted || product.price?.original || 999).toLocaleString('en-IN')}
                    </span>
                    {product.price?.original && product.price?.discounted && product.price.original > product.price.discounted && (
                        <span className="text-sm text-muted line-through">
                            ₹{product.price.original.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>

                {/* Stock Status */}
                {product.status === 'out_of_stock' && (
                    <Badge variant="danger" size="sm" className="mt-2">
                        Out of Stock
                    </Badge>
                )}
            </div>
        </Link>
    );
}
