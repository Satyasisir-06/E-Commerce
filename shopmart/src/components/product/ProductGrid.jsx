import ProductCard from './ProductCard';
import { PageSpinner } from '../ui/Spinner';
import { Package } from 'lucide-react';

export default function ProductGrid({
    products,
    loading = false,
    columns = 4,
    emptyMessage = 'No products found'
}) {
    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    };

    if (loading) {
        return <ProductGridSkeleton count={8} columns={columns} />;
    }

    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Package className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {emptyMessage}
                </h3>
                <p className="text-muted max-w-sm">
                    Try adjusting your filters or search terms to find what you're looking for.
                </p>
            </div>
        );
    }

    return (
        <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

// Skeleton loader for grid
function ProductGridSkeleton({ count = 8, columns = 4 }) {
    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
            {[...Array(count)].map((_, i) => (
                <div key={i} className="card p-0 animate-pulse">
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-4 space-y-3">
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, j) => (
                                <div key={j} className="w-4 h-4 bg-gray-200 rounded" />
                            ))}
                        </div>
                        <div className="h-5 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export { ProductGridSkeleton };
