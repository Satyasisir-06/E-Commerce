// Product Card Skeleton Loader
export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Image Skeleton */}
            <div className="w-full h-64 bg-gray-200 animate-shimmer" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                {/* Brand */}
                <div className="h-4 w-20 bg-gray-200 rounded animate-shimmer" />

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-5 w-full bg-gray-200 rounded animate-shimmer" />
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-shimmer" />
                </div>

                {/* Rating */}
                <div className="h-4 w-32 bg-gray-200 rounded animate-shimmer" />

                {/* Price */}
                <div className="flex items-center gap-2">
                    <div className="h-7 w-24 bg-gray-200 rounded animate-shimmer" />
                    <div className="h-5 w-20 bg-gray-200 rounded animate-shimmer" />
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-2">
                    <div className="flex-1 h-11 bg-gray-200 rounded-xl animate-shimmer" />
                    <div className="w-11 h-11 bg-gray-200 rounded-xl animate-shimmer" />
                </div>
            </div>
        </div>
    );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 8 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
}

// Page Spinner
export function PageSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted font-medium">Loading...</p>
            </div>
        </div>
    );
}

// Small Spinner
export function Spinner({ size = 'md' }) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-3',
    };

    return (
        <div className={`${sizeClasses[size]} border-current border-t-transparent rounded-full animate-spin`} />
    );
}

// Order Item Skeleton
export function OrderItemSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-40 bg-gray-200 rounded animate-shimmer" />
                <div className="h-8 w-24 bg-gray-200 rounded-lg animate-shimmer" />
            </div>
            <div className="space-y-3">
                <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg animate-shimmer" />
                    <div className="flex-1 space-y-2">
                        <div className="h-5 w-3/4 bg-gray-200 rounded animate-shimmer" />
                        <div className="h-4 w-1/2 bg-gray-200 rounded animate-shimmer" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Cart Item Skeleton
export function CartItemSkeleton() {
    return (
        <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
            <div className="w-24 h-24 bg-gray-200 rounded-lg animate-shimmer" />
            <div className="flex-1 space-y-3">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-shimmer" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-shimmer" />
                <div className="h-6 w-24 bg-gray-200 rounded animate-shimmer" />
            </div>
        </div>
    );
}
