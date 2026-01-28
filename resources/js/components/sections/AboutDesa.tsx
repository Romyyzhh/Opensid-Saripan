import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Users,
    MapPin,
    Award,
    Building,
    TrendingUp,
    Target,
    Heart,
} from 'lucide-react';

export default function AboutDesa() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stats = [
        { label: 'Jumlah Penduduk', value: '5,234', icon: Users },
        { label: 'Luas Wilayah', value: '12.5 km²', icon: MapPin },
        { label: 'Fasilitas Umum', value: '24+', icon: Building },
        { label: 'Penghargaan', value: '15+', icon: Award },
    ];

    return (
        <section
            id="about"
            ref={ref}
            className="py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                        <TrendingUp className="w-4 h-4" />
                        Tentang Kami
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Membangun Desa Saripan Menuju{' '}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Era Digital
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Desa Saripan berkomitmen untuk menghadirkan pelayanan
                        publik yang transparan, akuntabel, dan mudah diakses
                        oleh seluruh lapisan masyarakat melalui inovasi
                        teknologi.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="relative h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl overflow-hidden shadow-xl group">
                                    <img
                                        src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop"
                                        alt="Desa Saripan Landscape"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden shadow-xl group">
                                    <img
                                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
                                        alt="Pertanian Desa"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden shadow-xl group">
                                    <img
                                        src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=800&auto=format&fit=crop"
                                        alt="Kegiatan Warga"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                                <div className="relative h-64 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl overflow-hidden shadow-xl group">
                                    <img
                                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
                                        alt="Pemandangan Alam"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-200/40 to-blue-200/40 rounded-full blur-3xl" />
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Vision & Mission */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-xl text-gray-900 mb-3">
                                            Visi
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            Mewujudkan Desa Saripan yang maju,
                                            mandiri, sejahtera, dan berdaya
                                            saing dengan memanfaatkan teknologi
                                            informasi.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Heart className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-xl text-gray-900 mb-3">
                                            Misi
                                        </h4>
                                        <ul className="space-y-2 text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <span className="text-emerald-600 mt-1">
                                                    •
                                                </span>
                                                <span>
                                                    Meningkatkan kualitas
                                                    pelayanan publik melalui
                                                    digitalisasi
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-emerald-600 mt-1">
                                                    •
                                                </span>
                                                <span>
                                                    Mewujudkan transparansi dan
                                                    akuntabilitas pemerintahan
                                                    desa
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-emerald-600 mt-1">
                                                    •
                                                </span>
                                                <span>
                                                    Memberdayakan masyarakat
                                                    melalui akses informasi yang
                                                    mudah
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={
                                        isInView ? { opacity: 1, y: 0 } : {}
                                    }
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.4 + index * 0.1,
                                    }}
                                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all group"
                                >
                                    <stat.icon className="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                                    <div className="text-3xl font-bold text-gray-900 mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
