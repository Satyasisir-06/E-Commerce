import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid3X3,
    LayoutGrid,
    SlidersHorizontal,
    ChevronDown
} from 'lucide-react';
import { fetchProducts, setFilters } from '../store/slices/productSlice';
import { allProducts, categories } from '../data/productsData';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters, { MobileFilters } from '../components/product/ProductFilters';
import Button from '../components/ui/Button';

const sortOptions = [
    { value: 'popular', label: 'Popularity' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
];

export default function ProductListingPage() {
    const [searchParams] = useSearchParams();
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('popular');
    const [isSortOpen, setIsSortOpen] = useState(false);

    const dispatch = useDispatch();
    const { products, loading, filters } = useSelector((state) => state.products);

    // Get filter params from URL
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const minPrice = parseInt(searchParams.get('minPrice')) || 0;
    const maxPrice = parseInt(searchParams.get('maxPrice')) || 100000;
    const rating = parseInt(searchParams.get('rating')) || 0;

    // Filter products locally (since Firebase might not have data)
    const filteredProducts = useMemo(() => {
        let result = allProducts;

        // Search filter
        if (searchParam) {
            const searchLower = searchParam.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description?.toLowerCase().includes(searchLower) ||
                p.brand?.toLowerCase().includes(searchLower)
            );
        }

        // Category filter
        if (categoryParam) {
            result = result.filter(p =>
                p.category?.includes(categoryParam) ||
                p.category?.[0]?.toLowerCase() === categoryParam.toLowerCase()
            );
        }

        // Price filter
        if (minPrice > 0 || maxPrice < 100000) {
            result = result.filter(p => {
                const price = p.price?.discounted || p.price?.original || 0;
                return price >= minPrice && price <= maxPrice;
            });
        }

        // Rating filter
        if (rating > 0) {
            result = result.filter(p => (p.ratings?.average || 0) >= rating);
        }

        // Sort
        switch (sortBy) {
            case 'newest':
                result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'price-low':
                result = [...result].sort((a, b) =>
                    (a.price?.discounted || a.price?.original || 0) - (b.price?.discounted || b.price?.original || 0)
                );
                break;
            case 'price-high':
                result = [...result].sort((a, b) =>
                    (b.price?.discounted || b.price?.original || 0) - (a.price?.discounted || a.price?.original || 0)
                );
                break;
            case 'rating':
                result = [...result].sort((a, b) => (b.ratings?.average || 0) - (a.ratings?.average || 0));
                break;
            default:
                // popularity - keep default order
                break;
        }

        return result;
    }, [categoryParam, searchParam, minPrice, maxPrice, rating, sortBy]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleFilterChange = (newFilters) => {
        dispatch(setFilters(newFilters));
    };

    const getCategoryName = () => {
        if (searchParam) return `Search: "${searchParam}"`;
        if (categoryParam) {
            const cat = categories.find(c => c.id === categoryParam);
            return cat?.name || categoryParam;
        }
        return 'All Products';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-muted mb-6">
                    <a href="/" className="hover:text-primary">Home</a>
                    <span className="mx-2">/</span>
                    <span className="text-foreground">{getCategoryName()}</span>
                </nav>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                            {getCategoryName()}
                        </h1>
                        <p className="text-muted mt-1">
                            {filteredProducts.length} products found
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary transition-colors cursor-pointer"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            Filters
                        </button>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary transition-colors cursor-pointer min-w-[180px]"
                            >
                                <span className="text-sm text-muted">Sort:</span>
                                <span className="text-sm font-medium text-foreground flex-1 text-left">
                                    {sortOptions.find(o => o.value === sortBy)?.label}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isSortOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-fade-in">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setSortBy(option.value);
                                                setIsSortOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${sortBy === option.value ? 'text-primary font-medium bg-primary-50' : 'text-foreground'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* View Toggle */}
                        <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
                                    }`}
                            >
                                <Grid3X3 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
                                    }`}
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content - With Separate Scrolls */}
                <div className="flex gap-8 relative">
                    {/* Desktop Sidebar - Fixed with Independent Scroll */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-28">
                            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                <ProductFilters
                                    onFilterChange={handleFilterChange}
                                    activeFilters={filters}
                                />
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid - Independent Scroll */}
                    <div className="flex-1">
                        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto custom-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            <ProductGrid
                                products={filteredProducts}
                                loading={loading && filteredProducts.length === 0}
                                columns={viewMode === 'grid' ? 4 : 3}
                                emptyMessage={searchParam
                                    ? `No products found for "${searchParam}"`
                                    : 'No products found in this category'
                                }
                            />

                            {/* Load More */}
                            {filteredProducts.length > 0 && filteredProducts.length >= 20 && (
                                <div className="text-center mt-12 mb-4">
                                    <Button variant="outline" size="lg">
                                        Load More Products
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filters Drawer */}
            <MobileFilters
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                onFilterChange={handleFilterChange}
                activeFilters={filters}
            />
        </div>
    );
}
