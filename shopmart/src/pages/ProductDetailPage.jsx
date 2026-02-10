import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Heart,
    ShoppingCart,
    Star,
    Truck,
    Shield,
    RefreshCw,
    Minus,
    Plus,
    Share2,
    ChevronRight
} from 'lucide-react';
import { fetchProductById, clearCurrentProduct } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { PageSpinner } from '../components/ui/Spinner';

export default function ProductDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [activeTab, setActiveTab] = useState('description');

    const { currentProduct, products, loading } = useSelector((state) => state.products);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    const product = currentProduct;
    const isInWishlist = wishlistItems?.some((item) => item.id === product?.id);

    // Get related products from same category
    const relatedProducts = products
        .filter(p => p.id !== product?.id && p.category === product?.category)
        .slice(0, 4);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
        window.scrollTo(0, 0);

        return () => {
            dispatch(clearCurrentProduct());
        };
    }, [id, dispatch]);

    const handleAddToCart = () => {
        if (!product) return;
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.discountPrice || product.price,
            image: product.images?.[0] || product.image || '',
            quantity,
            variant: selectedVariant,
        }));
    };

    const handleWishlistToggle = () => {
        if (!product) return;
        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                discountPrice: product.discountPrice,
                image: product.images?.[0] || product.image || '',
            }));
        }
    };

    if (loading && !product) {
        return <PageSpinner />;
    }

    if (!product) {
        return (
            <div className="container-custom py-16 text-center">
                <h1 className="text-2xl font-heading font-bold mb-4">Product Not Found</h1>
                <Link to="/products" className="text-primary hover:underline">
                    Browse all products
                </Link>
            </div>
        );
    }

    const discountPercentage = product.price && product.discountPrice
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;

    const images = product.images?.length > 0
        ? product.images
        : product.image
            ? [product.image]
            : ['https://via.placeholder.com/600x600?text=Product'];

    const displayPrice = product.discountPrice || product.price || 999;
    const originalPrice = product.price || displayPrice;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-muted mb-6 flex items-center gap-2">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/products" className="hover:text-primary">Products</Link>
                    {product.category && (
                        <>
                            <ChevronRight className="w-4 h-4" />
                            <Link to={`/products?category=${product.category}`} className="hover:text-primary">
                                {product.category}
                            </Link>
                        </>
                    )}
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
                </nav>

                {/* Product Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Images */}
                        <div>
                            {/* Main Image */}
                            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                {discountPercentage > 0 && (
                                    <Badge variant="discount" className="absolute top-4 left-4">
                                        -{discountPercentage}%
                                    </Badge>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto hide-scrollbar">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer ${selectedImage === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div>
                            {/* Category */}
                            {product.category && (
                                <p className="text-sm text-muted uppercase tracking-wide mb-2">
                                    {product.category}
                                </p>
                            )}

                            {/* Name */}
                            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            {product.ratings?.average > 0 && (
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(product.ratings.average)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-foreground font-medium">
                                        {product.ratings.average.toFixed(1)}
                                    </span>
                                    <span className="text-muted">
                                        ({product.ratings.count || 0} reviews)
                                    </span>
                                </div>
                            )}

                            {/* Price */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl font-bold text-foreground">
                                    ₹{displayPrice.toLocaleString('en-IN')}
                                </span>
                                {discountPercentage > 0 && (
                                    <>
                                        <span className="text-xl text-muted line-through">
                                            ₹{originalPrice.toLocaleString('en-IN')}
                                        </span>
                                        <Badge variant="success">
                                            Save ₹{(originalPrice - displayPrice).toLocaleString('en-IN')}
                                        </Badge>
                                    </>
                                )}
                            </div>

                            {/* Description Short */}
                            <p className="text-muted mb-6 line-clamp-3">
                                {product.description || 'High-quality product with excellent features and premium build quality.'}
                            </p>

                            {/* Quantity */}
                            <div className="mb-6">
                                <p className="font-medium text-foreground mb-3">Quantity</p>
                                <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="px-6 py-3 font-medium text-foreground border-x border-gray-200">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="flex-1 min-w-[200px]"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </Button>
                                <Button
                                    variant={isInWishlist ? 'danger' : 'outline'}
                                    size="lg"
                                    onClick={handleWishlistToggle}
                                >
                                    <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                                </Button>
                                <Button variant="outline" size="lg">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="text-center">
                                    <Truck className="w-6 h-6 text-primary mx-auto mb-1" />
                                    <p className="text-xs text-muted">Free Shipping</p>
                                </div>
                                <div className="text-center">
                                    <Shield className="w-6 h-6 text-primary mx-auto mb-1" />
                                    <p className="text-xs text-muted">Secure Payment</p>
                                </div>
                                <div className="text-center">
                                    <RefreshCw className="w-6 h-6 text-primary mx-auto mb-1" />
                                    <p className="text-xs text-muted">Easy Returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-100 overflow-x-auto hide-scrollbar">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 font-medium capitalize whitespace-nowrap transition-colors cursor-pointer ${activeTab === tab
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-muted hover:text-foreground'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 md:p-8">
                        {activeTab === 'description' && (
                            <div className="prose max-w-none">
                                <p className="text-muted leading-relaxed">
                                    {product.description ||
                                        `Experience premium quality with the ${product.name}. Crafted with attention to detail and designed for modern users, this product offers exceptional value and performance. Perfect for everyday use, it combines style with functionality to meet your needs.`
                                    }
                                </p>
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-muted">Brand</span>
                                    <span className="font-medium text-foreground">{product.brand || 'ShopMart'}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-muted">Category</span>
                                    <span className="font-medium text-foreground">{product.category || 'General'}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-muted">SKU</span>
                                    <span className="font-medium text-foreground">{product.sku || `SM-${product.id}`}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-muted">Availability</span>
                                    <span className="font-medium text-green-600">In Stock</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="text-center py-8">
                                <p className="text-muted mb-4">No reviews yet. Be the first to review this product!</p>
                                <Button variant="outline">Write a Review</Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section>
                        <h2 className="section-title mb-6">Related Products</h2>
                        <ProductGrid products={relatedProducts} columns={4} />
                    </section>
                )}
            </div>
        </div>
    );
}
