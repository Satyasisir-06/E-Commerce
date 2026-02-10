import { Link } from 'react-router-dom';
import {
    Smartphone,
    Shirt,
    Home,
    Sparkles,
    Dumbbell,
    BookOpen,
    Gamepad2,
    Car,
    Apple,
    Heart,
    Cat,
    Briefcase,
    Gem,
    Baby,
    Watch
} from 'lucide-react';

// Map category IDs to Lucide icons
const categoryIcons = {
    electronics: Smartphone,
    'fashion-men': Shirt,
    'fashion-women': Shirt,
    'fashion-kids': Baby,
    home: Home,
    beauty: Sparkles,
    sports: Dumbbell,
    books: BookOpen,
    toys: Gamepad2,
    automotive: Car,
    grocery: Apple,
    health: Heart,
    pet: Cat,
    office: Briefcase,
    jewelry: Gem,
};

export default function CategoryCard({ category, variant = 'default' }) {
    const IconComponent = categoryIcons[category.id] || Sparkles;

    if (variant === 'compact') {
        return (
            <Link
                to={`/products?category=${category.id}`}
                className="flex flex-col items-center gap-2 p-4 group cursor-pointer"
            >
                <div className="w-14 h-14 bg-primary-50 group-hover:bg-primary-100 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105">
                    <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground text-center group-hover:text-primary transition-colors">
                    {category.name}
                </span>
            </Link>
        );
    }

    if (variant === 'horizontal') {
        return (
            <Link
                to={`/products?category=${category.id}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-primary hover:shadow-md transition-all group cursor-pointer"
            >
                <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-100 rounded-xl flex items-center justify-center transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                    </h3>
                    {category.subcategories && (
                        <p className="text-sm text-muted truncate">
                            {category.subcategories.slice(0, 3).join(', ')}
                        </p>
                    )}
                </div>
            </Link>
        );
    }

    // Default card variant
    return (
        <Link
            to={`/products?category=${category.id}`}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-gray-100 p-6 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer"
        >
            {/* Background Pattern */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />

            {/* Icon */}
            <div className="relative w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
                <IconComponent className="w-7 h-7 text-primary" />
            </div>

            {/* Content */}
            <div className="relative">
                <h3 className="font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                </h3>
                {category.subcategories && (
                    <p className="text-sm text-muted line-clamp-2">
                        {category.subcategories.slice(0, 3).join(', ')}
                        {category.subcategories.length > 3 && ' & more'}
                    </p>
                )}
            </div>

            {/* Arrow indicator */}
            <div className="absolute bottom-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}

// Category Grid
export function CategoryGrid({ categories, variant = 'default' }) {
    const gridClass = variant === 'compact'
        ? 'grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2'
        : variant === 'horizontal'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6';

    return (
        <div className={gridClass}>
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} variant={variant} />
            ))}
        </div>
    );
}
