const variants = {
    primary: 'badge-primary',
    secondary: 'badge bg-secondary-100 text-secondary-700',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    discount: 'badge-discount',
    outline: 'badge border border-gray-300 text-foreground',
};

const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: '',
    lg: 'text-base px-4 py-1.5',
};

export default function Badge({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) {
    return (
        <span
            className={`${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}
