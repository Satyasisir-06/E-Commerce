import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    ArrowRight,
    Zap,
    TrendingUp,
    Sparkles,
    ChevronRight,
    Star
} from 'lucide-react';
import { fetchProducts, fetchFeaturedProducts, fetchCategories } from '../store/slices/productSlice';
import ProductGrid from '../components/product/ProductGrid';
import { CategoryGrid } from '../components/product/CategoryCard';
import Button from '../components/ui/Button';

export default function HomePage() {
    const dispatch = useDispatch();
    const { products, featuredProducts, categories, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchFeaturedProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    // Get different product sections
    const displayProducts = products.slice(0, 8);
    const displayFeatured = featuredProducts.slice(0, 4);
    const dealsProducts = products
        .filter(p => p.discountPrice && p.discountPrice < p.price * 0.8)
        .slice(0, 4);
    const newArrivals = products.slice(-8).reverse();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-hero relative overflow-hidden">
                <div className="container-custom py-16 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6 animate-fade-in">
                            <div className="inline-flex items-center gap-2 bg-cta/10 text-cta px-4 py-2 rounded-full text-sm font-medium">
                                <Zap className="w-4 h-4" />
                                New Arrivals Every Day
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                                Shop Smart,
                                <span className="text-gradient"> Save Big</span>
                            </h1>
                            <p className="text-lg text-muted max-w-lg">
                                Discover millions of products from trusted sellers with fast delivery, secure payments, and amazing deals every day.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/products">
                                    <Button variant="primary" size="lg">
                                        Shop Now
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link to="/deals">
                                    <Button variant="outline" size="lg">
                                        View Deals
                                    </Button>
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-8 pt-4">
                                {[
                                    { value: '300+', label: 'Products' },
                                    { value: '50+', label: 'Brands' },
                                    { value: '24/7', label: 'Support' },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                        <p className="text-sm text-muted">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero Image Grid */}
                        <div className="hidden lg:grid grid-cols-2 gap-4 animate-slide-up">
                            <div className="space-y-4">
                                <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                                    <img
                                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                                        alt="Product"
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                </div>
                                <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                                    <img
                                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
                                        alt="Product"
                                        className="w-full h-32 object-cover rounded-xl"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                                    <img
                                        src="https://images.unsplash.com/photo-1491553895911-0055uj966881?w=400"
                                        alt="Product"
                                        className="w-full h-32 object-cover rounded-xl"
                                    />
                                </div>
                                <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                                    <img
                                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
                                        alt="Product"
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cta/5 rounded-full blur-3xl" />
            </section>

            {/* Categories Section */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="section-title">Shop by Category</h2>
                            <p className="section-subtitle">Find exactly what you're looking for</p>
                        </div>
                        <Link to="/categories" className="hidden sm:flex items-center gap-1 text-primary font-medium hover:underline">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    {loading && categories.length === 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-32"></div>
                            ))}
                        </div>
                    ) : (
                        <CategoryGrid categories={categories.slice(0, 10)} variant="default" />
                    )}
                </div>
            </section>

            {/* Deals Section */}
            <section className="section bg-gradient-to-r from-cta to-cta-600">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-6 h-6" />
                                <span className="text-sm font-medium uppercase tracking-wide opacity-90">Limited Time</span>
                            </div>
                            <h2 className="text-3xl font-heading font-bold">Deals of the Day</h2>
                        </div>
                        <Link to="/deals" className="hidden sm:flex items-center gap-1 text-white font-medium hover:underline">
                            View All Deals <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <ProductGrid products={dealsProducts} columns={4} loading={false} />
                </div>
            </section>

            {/* Featured Products */}
            <section className="section bg-gray-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-primary mb-2">
                                <Star className="w-5 h-5 fill-primary" />
                                <span className="text-sm font-medium uppercase tracking-wide">Handpicked</span>
                            </div>
                            <h2 className="section-title">Featured Products</h2>
                        </div>
                        <Link to="/products?featured=true" className="hidden sm:flex items-center gap-1 text-primary font-medium hover:underline">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <ProductGrid products={displayFeatured} columns={4} loading={loading && displayFeatured.length === 0} />
                </div>
            </section>

            {/* Trending Products */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-cta mb-2">
                                <TrendingUp className="w-5 h-5" />
                                <span className="text-sm font-medium uppercase tracking-wide">Popular Now</span>
                            </div>
                            <h2 className="section-title">Trending Products</h2>
                        </div>
                        <Link to="/products?sort=popular" className="hidden sm:flex items-center gap-1 text-primary font-medium hover:underline">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <ProductGrid products={displayProducts} columns={4} loading={loading && displayProducts.length === 0} />
                </div>
            </section>

            {/* New Arrivals */}
            <section className="section bg-gray-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <Sparkles className="w-5 h-5" />
                                <span className="text-sm font-medium uppercase tracking-wide">Just In</span>
                            </div>
                            <h2 className="section-title">New Arrivals</h2>
                        </div>
                        <Link to="/products?sort=newest" className="hidden sm:flex items-center gap-1 text-primary font-medium hover:underline">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <ProductGrid products={newArrivals} columns={4} loading={loading && newArrivals.length === 0} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-foreground">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                        Ready to Start Shopping?
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8">
                        Join millions of happy customers and discover amazing products at unbeatable prices.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register">
                            <Button variant="primary" size="lg">
                                Create Account
                            </Button>
                        </Link>
                        <Link to="/products">
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-foreground">
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
