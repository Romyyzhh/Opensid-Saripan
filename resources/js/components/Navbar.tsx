import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

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

                        {/* Login Button */}
                        <Link
                            href="/login"
                            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
                        >
                            Masuk
                        </Link>
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
                        <Link
                            href="/login"
                            className="block w-full text-center px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl shadow-lg"
                        >
                            Masuk
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
