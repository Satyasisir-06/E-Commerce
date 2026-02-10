import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react';
import { registerUser, clearError } from '../store/slices/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('buyer');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = 'Name is required';
        else if (name.length < 2) errors.name = 'Name must be at least 2 characters';
        if (!email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email format';
        if (!password) errors.password = 'Password is required';
        else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
        if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
        if (!acceptTerms) errors.terms = 'You must accept the terms and conditions';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearError());

        if (!validateForm()) return;

        const result = await dispatch(registerUser({ email, password, name, role }));
        if (!result.error) {
            navigate('/');
        }
    };

    const passwordStrength = () => {
        if (!password) return { level: 0, text: '', color: '' };
        if (password.length < 6) return { level: 1, text: 'Weak', color: 'bg-red-500' };
        if (password.length < 10) return { level: 2, text: 'Medium', color: 'bg-yellow-500' };
        if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
            return { level: 3, text: 'Strong', color: 'bg-green-500' };
        }
        return { level: 2, text: 'Medium', color: 'bg-yellow-500' };
    };

    const strength = passwordStrength();

    return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-cta rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">S</span>
                    </div>
                    <span className="font-heading font-bold text-2xl text-foreground">ShopMart</span>
                </Link>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                            Create Account
                        </h1>
                        <p className="text-muted">
                            Join ShopMart and start shopping
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Role Selector */}
                    <div className="flex gap-3 mb-6">
                        {[
                            { value: 'buyer', label: 'Buyer', desc: 'Shop products' },
                            { value: 'seller', label: 'Seller', desc: 'Sell products' },
                        ].map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setRole(option.value)}
                                className={`flex-1 p-4 rounded-xl border-2 transition-all cursor-pointer ${role === option.value
                                        ? 'border-primary bg-primary-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`font-medium ${role === option.value ? 'text-primary' : 'text-foreground'}`}>
                                        {option.label}
                                    </span>
                                    {role === option.value && (
                                        <Check className="w-5 h-5 text-primary" />
                                    )}
                                </div>
                                <p className="text-xs text-muted text-left">{option.desc}</p>
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <Input
                                type="text"
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={formErrors.name}
                                className="pl-12"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <Input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={formErrors.email}
                                className="pl-12"
                            />
                        </div>

                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`input pl-12 pr-12 ${formErrors.password ? 'input-error' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {/* Password Strength */}
                            {password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3].map((level) => (
                                            <div
                                                key={level}
                                                className={`flex-1 h-1 rounded-full ${strength.level >= level ? strength.color : 'bg-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className={`text-xs ${strength.level === 1 ? 'text-red-500' :
                                            strength.level === 2 ? 'text-yellow-600' : 'text-green-600'
                                        }`}>
                                        {strength.text}
                                    </p>
                                </div>
                            )}
                            {formErrors.password && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                            )}
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={formErrors.confirmPassword}
                                className="pl-12"
                            />
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-muted">
                                I agree to the{' '}
                                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                            </span>
                        </label>
                        {formErrors.terms && (
                            <p className="text-red-500 text-sm">{formErrors.terms}</p>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            loading={loading}
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center text-muted mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
