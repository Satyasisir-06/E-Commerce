import { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

const Input = forwardRef(({
    label,
    error,
    helperText,
    className = '',
    type = 'text',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-foreground mb-1.5">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                className={`input ${error ? 'input-error' : ''} ${className}`}
                {...props}
            />
            {(error || helperText) && (
                <div className={`flex items-center gap-1.5 mt-1.5 text-sm ${error ? 'text-red-600' : 'text-muted'}`}>
                    {error && <AlertCircle className="w-4 h-4" />}
                    <span>{error || helperText}</span>
                </div>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
