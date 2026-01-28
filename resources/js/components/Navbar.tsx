import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, MapPin, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';

// Helper function for routes
const route = (name: string) => {
    const routes: Record<string, string> = {
        login: '/login',
        register: '/register',
        dashboard: '/dashboard',
        'admin.dashboard': '/admin/dashboard',
        logout: '/logout',
    };
    return routes[name] || '/';
};

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const { auth } = usePage().props as any;

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 50);
    });

    const navLinks = [
        { name: 'Beranda', href: '#' },
        { name: 'Tentang', href: '#about' },
        { name: 'Layanan', href: '#features' },
        { name: 'Berita', href: '#news' },
        { name: 'Kontak', href: '#contact' },
    ];

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/90 backdrop-blur-md shadow-lg py-4'
                : 'bg-transparent py-6'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 leading-none">
                                Desa Saripan
                            </h1>
                            <p className="text-xs text-emerald-600 font-medium">
                                Kabupaten Jepara
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    if (link.href.startsWith('#')) {
                                        e.preventDefault();
                                        const element = document.querySelector(link.href);
                                        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                                className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full" />
                            </a>
                        ))}

                        {/* Auth Section */}
                        {auth?.user ? (
                            /* User Dropdown */
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-emerald-500 transition-all"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{auth.user.name}</span>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                                        <Link
                                            href={route('admin.dashboard')}
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            Dashboard Admin
                                        </Link>
                                        <div className="border-t border-gray-100 my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Login Button */
                            <Link
                                href={route('login')}
                                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
                            >
                                Masuk
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white border-t border-gray-100 shadow-lg"
                >
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    if (link.href.startsWith('#')) {
                                        e.preventDefault();
                                        const element = document.querySelector(link.href);
                                        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        setIsMobileMenuOpen(false);
                                    }
                                }}
                                className="block text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Mobile Auth Section */}
                        {auth?.user ? (
                            <div className="pt-4 border-t border-gray-200 space-y-2">
                                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{auth.user.name}</p>
                                        <p className="text-xs text-gray-500">{auth.user.email}</p>
                                    </div>
                                </div>
                                <Link
                                    href={route('admin.dashboard')}
                                    className="block w-full text-center px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl"
                                >
                                    Dashboard Admin
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-center px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href={route('login')}
                                className="block w-full text-center px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl shadow-lg"
                            >
                                Masuk
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
