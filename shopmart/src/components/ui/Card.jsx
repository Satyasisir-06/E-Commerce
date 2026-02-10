export default function Card({
    children,
    className = '',
    hover = true,
    padding = true,
    onClick,
    ...props
}) {
    return (
        <div
            className={`card ${hover ? 'card-hover' : ''} ${padding ? 'p-6' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
}

Card.Header = function CardHeader({ children, className = '' }) {
    return (
        <div className={`mb-4 ${className}`}>
            {children}
        </div>
    );
};

Card.Title = function CardTitle({ children, className = '' }) {
    return (
        <h3 className={`font-heading font-semibold text-lg text-foreground ${className}`}>
            {children}
        </h3>
    );
};

Card.Description = function CardDescription({ children, className = '' }) {
    return (
        <p className={`text-muted text-sm mt-1 ${className}`}>
            {children}
        </p>
    );
};

Card.Content = function CardContent({ children, className = '' }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

Card.Footer = function CardFooter({ children, className = '' }) {
    return (
        <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>
            {children}
        </div>
    );
};
