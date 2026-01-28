import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import {
    ShieldCheck,
    Smartphone,
    Globe,
    Zap,
    Users,
    BarChart3,
} from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: 'Layanan Aman',
        description:
            'Data Anda dilindungi dengan sistem keamanan enkripsi terkini.',
        color: 'text-blue-500',
        bg: 'bg-blue-50',
    },
    {
        icon: Smartphone,
        title: 'Akses Mobile',
        description:
            'Akses layanan desa kapan saja dan di mana saja melalui smartphone.',
        color: 'text-green-500',
        bg: 'bg-green-50',
    },
    {
        icon: Globe,
        title: 'Transparansi',
        description:
            'Informasi publik desa dapat diakses secara terbuka oleh masyarakat.',
        color: 'text-purple-500',
        bg: 'bg-purple-50',
    },
    {
        icon: Zap,
        title: 'Proses Cepat',
        description:
            'Pengurusan surat dan administrasi lebih cepat tanpa antri lama.',
        color: 'text-amber-500',
        bg: 'bg-amber-50',
    },
    {
        icon: Users,
        title: 'Partisipasi',
        description:
            'Wadah aspirasi masyarakat untuk pembangunan desa yang lebih baik.',
        color: 'text-rose-500',
        bg: 'bg-rose-50',
    },
    {
        icon: BarChart3,
        title: 'Data Akurat',
        description:
            'Data kependudukan dan potensi desa yang terupdate secara realtime.',
        color: 'text-cyan-500',
        bg: 'bg-cyan-50',
    },
];

const partners = [
    'Kementerian Dalam Negeri',
    'Kementerian Desa PDTT',
    'Dinas Kominfo',
    'Pemerintah Kabupaten',
    'OpenSID Community',
    'Desa Digital',
];

export default function FeaturesSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (marqueeRef.current) {
            const content = marqueeRef.current.querySelector('.marquee-content');
            if (content) {
                // Clone content for seamless loop
                const clone = content.cloneNode(true);
                marqueeRef.current.appendChild(clone);

                gsap.to(marqueeRef.current.children, {
                    xPercent: -100,
                    repeat: -1,
                    duration: 20,
                    ease: 'linear',
                });
            }
        }
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Keunggulan Layanan Digital
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Transformasi digital untuk memberikan pelayanan prima
                        kepada seluruh warga Desa Saripan.
                    </motion.p>
                </div>

                <motion.div
                    ref={containerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                boxShadow:
                                    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-all"
                        >
                            <div
                                className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6`}
                            >
                                <feature.icon
                                    className={`w-7 h-7 ${feature.color}`}
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* GSAP Marquee Section */}
            <div className="mt-24 py-10 bg-white border-y border-gray-100">
                <div className="text-center mb-8">
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Didukung Oleh
                    </span>
                </div>
                <div className="relative w-full overflow-hidden">
                    <div
                        ref={marqueeRef}
                        className="flex whitespace-nowrap"
                        style={{ width: 'max-content' }}
                    >
                        <div className="marquee-content flex gap-16 px-8">
                            {partners.map((partner, index) => (
                                <div
                                    key={index}
                                    className="text-xl md:text-2xl font-bold text-gray-300 hover:text-emerald-500 transition-colors cursor-default"
                                >
                                    {partner}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
