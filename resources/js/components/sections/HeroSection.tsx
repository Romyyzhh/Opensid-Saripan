import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Instagram, Facebook, Twitter } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-white text-gray-900"
        >
            {/* Background Image/Video Placeholder */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10" />
                <img
                    src="/assets/hero.jpeg"
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-20 h-full flex flex-col justify-between px-6 md:px-12 py-8">
                {/* Top Section (Spacer for Navbar) */}
                <div className="h-20" />

                {/* Main Headline */}
                <div className="max-w-7xl w-full mx-auto">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none text-white mix-blend-difference"
                    >
                        Melayani dengan Hati <br />
                        <span className="text-emerald-400">Inovasi Tiada Henti</span>
                    </motion.h1>
                </div>

                {/* Bottom Section */}
                <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 pb-12">
                    {/* Social Links */}
                    <div className="hidden md:flex gap-6 text-white/70">
                        <a href="#" className="hover:text-white transition-colors">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <Twitter className="w-6 h-6" />
                        </a>
                    </div>

                    {/* Scroll Indicator / CTA */}
                    <div className="flex flex-col items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <ArrowRight className="w-6 h-6 rotate-90" />
                        </motion.button>
                        <span className="text-sm font-medium text-white/70 tracking-widest uppercase">
                            Scroll Down
                        </span>
                    </div>

                    {/* Featured Card */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full md:w-80 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl hover:bg-white/20 transition-all cursor-pointer group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                New Feature
                            </span>
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                            Layanan Mandiri
                        </h3>
                        <p className="text-sm text-white/70 mb-4">
                            Akses layanan administrasi desa dari rumah anda.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-white">
                            Coba Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
