import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Truck,
    Shield,
    HeadphonesIcon
} from 'lucide-react';

const footerLinks = {
    shop: [
        { name: 'All Products', href: '/products' },
        { name: 'New Arrivals', href: '/products?sort=newest' },
        { name: 'Deals & Offers', href: '/deals' },
        { name: 'Best Sellers', href: '/products?sort=popular' },
    ],
    account: [
        { name: 'My Account', href: '/profile' },
        { name: 'Orders', href: '/orders' },
        { name: 'Wishlist', href: '/wishlist' },
        { name: 'Track Order', href: '/track-order' },
    ],
    support: [
        { name: 'Help Center', href: '/help' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns & Exchanges', href: '/returns' },
        { name: 'Contact Us', href: '/contact' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ],
};

const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹499' },
    { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
    { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Dedicated support' },
    { icon: CreditCard, title: 'Easy Returns', desc: '30-day return policy' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-foreground text-white mt-auto">
            {/* Features Bar */}
            <div className="bg-primary-900">
                <div className="container-custom py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-6 h-6 text-cta" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{feature.title}</p>
                                    <p className="text-sm text-gray-300">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-cta rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="font-heading font-bold text-2xl text-white">ShopMart</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            Your one-stop destination for quality products. Shop from millions of items across categories with fast delivery and secure payments.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <a href="mailto:support@shopmart.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                                <Mail className="w-5 h-5" />
                                support@shopmart.com
                            </a>
                            <a href="tel:+911800123456" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                                <Phone className="w-5 h-5" />
                                1800-123-456 (Toll Free)
                            </a>
                            <div className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>123 Commerce Street, Tech Park, Bangalore - 560001</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: '#' },
                                { icon: Twitter, href: '#' },
                                { icon: Instagram, href: '#' },
                                { icon: Youtube, href: '#' },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 bg-white/10 hover:bg-cta rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4">Shop</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.shop.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.href} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4">Account</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.account.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.href} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.support.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.href} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.href} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {currentYear} ShopMart. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
                            <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
                            <img src="https://cdn-icons-png.flaticon.com/128/6124/6124998.png" alt="UPI" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
                            <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="PayPal" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
