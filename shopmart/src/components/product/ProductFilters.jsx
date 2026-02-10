import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, X, Star, SlidersHorizontal } from 'lucide-react';
import { categories } from '../../data/productsData';
import Button from '../ui/Button';

const priceRanges = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1,000', min: 500, max: 1000 },
    { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: 'Over ₹10,000', min: 10000, max: 100000 },
];

const ratings = [4, 3, 2, 1];

export default function ProductFilters({ onFilterChange, activeFilters = {} }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [openSections, setOpenSections] = useState({
        categories: true,
        price: true,
        rating: false,
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleCategoryChange = (categoryId) => {
        const currentCategory = searchParams.get('category');
        if (currentCategory === categoryId) {
            searchParams.delete('category');
        } else {
            searchParams.set('category', categoryId);
        }
        setSearchParams(searchParams);
        onFilterChange?.({ ...activeFilters, category: categoryId === currentCategory ? '' : categoryId });
    };

    const handlePriceChange = (range) => {
        searchParams.set('minPrice', range.min);
        searchParams.set('maxPrice', range.max);
        setSearchParams(searchParams);
        onFilterChange?.({ ...activeFilters, priceRange: [range.min, range.max] });
    };

    const handleRatingChange = (rating) => {
        searchParams.set('rating', rating);
        setSearchParams(searchParams);
        onFilterChange?.({ ...activeFilters, rating });
    };

    const clearAllFilters = () => {
        setSearchParams({});
        onFilterChange?.({});
    };

    const activeCategory = searchParams.get('category');
    const activeRating = parseInt(searchParams.get('rating')) || 0;
    const activeMinPrice = parseInt(searchParams.get('minPrice')) || 0;
    const activeMaxPrice = parseInt(searchParams.get('maxPrice')) || 0;

    const hasActiveFilters = activeCategory || activeRating || activeMinPrice || activeMaxPrice;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">Filters</h3>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-red-500 hover:text-red-600 font-medium cursor-pointer"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-gray-100">
                    {activeCategory && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary rounded-full text-sm">
                            {categories.find(c => c.id === activeCategory)?.name || activeCategory}
                            <button onClick={() => handleCategoryChange(activeCategory)} className="cursor-pointer">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    )}
                    {activeRating > 0 && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">
                            {activeRating}+ Stars
                            <button onClick={() => { searchParams.delete('rating'); setSearchParams(searchParams); }} className="cursor-pointer">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    )}
                    {(activeMinPrice > 0 || activeMaxPrice > 0) && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                            ₹{activeMinPrice} - ₹{activeMaxPrice}
                            <button onClick={() => { searchParams.delete('minPrice'); searchParams.delete('maxPrice'); setSearchParams(searchParams); }} className="cursor-pointer">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    )}
                </div>
            )}

            {/* Categories */}
            <FilterSection
                title="Categories"
                isOpen={openSections.categories}
                onToggle={() => toggleSection('categories')}
            >
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label
                            key={category.id}
                            className="flex items-center gap-3 py-1.5 cursor-pointer group"
                        >
                            <input
                                type="radio"
                                name="category"
                                checked={activeCategory === category.id}
                                onChange={() => handleCategoryChange(category.id)}
                                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary cursor-pointer"
                            />
                            <span className={`text-sm group-hover:text-primary transition-colors ${activeCategory === category.id ? 'text-primary font-medium' : 'text-foreground'}`}>
                                {category.name}
                            </span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection
                title="Price Range"
                isOpen={openSections.price}
                onToggle={() => toggleSection('price')}
            >
                <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-3 py-1.5 cursor-pointer group"
                        >
                            <input
                                type="radio"
                                name="price"
                                checked={activeMinPrice === range.min && activeMaxPrice === range.max}
                                onChange={() => handlePriceChange(range)}
                                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary cursor-pointer"
                            />
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                                {range.label}
                            </span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Rating */}
            <FilterSection
                title="Rating"
                isOpen={openSections.rating}
                onToggle={() => toggleSection('rating')}
            >
                <div className="space-y-2">
                    {ratings.map((rating) => (
                        <label
                            key={rating}
                            className="flex items-center gap-3 py-1.5 cursor-pointer group"
                        >
                            <input
                                type="radio"
                                name="rating"
                                checked={activeRating === rating}
                                onChange={() => handleRatingChange(rating)}
                                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary cursor-pointer"
                            />
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                                <span className="text-sm text-muted ml-1">& Up</span>
                            </div>
                        </label>
                    ))}
                </div>
            </FilterSection>
        </div>
    );
}

function FilterSection({ title, isOpen, onToggle, children }) {
    return (
        <div className="border-b border-gray-100 last:border-0 py-4">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left cursor-pointer"
            >
                <span className="font-medium text-foreground">{title}</span>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-muted" />
                )}
            </button>
            {isOpen && <div className="mt-3">{children}</div>}
        </div>
    );
}

// Mobile Filters (Slide-in drawer)
export function MobileFilters({ isOpen, onClose, ...props }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white animate-slide-in overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                    <h2 className="font-heading font-semibold text-lg">Filters</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    <ProductFilters {...props} />
                </div>
                <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                    <Button variant="primary" className="w-full" onClick={onClose}>
                        Apply Filters
                    </Button>
                </div>
            </div>
        </div>
    );
}
