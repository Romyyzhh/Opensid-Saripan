import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, User, ArrowRight, Newspaper } from 'lucide-react';

const newsItems = [
    {
        title: 'Pembangunan Jalan Desa Tahap 2 Dimulai',
        excerpt:
            'Pemerintah Desa Saripan memulai pembangunan jalan desa tahap 2 yang menghubungkan area pertanian dengan pusat desa.',
        date: '25 Januari 2026',
        author: 'Admin Desa',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
        category: 'Pembangunan',
    },
    {
        title: 'Pelatihan UMKM Digital untuk Warga',
        excerpt:
            'Dinas Koperasi dan UMKM mengadakan pelatihan pemasaran digital gratis untuk pelaku usaha mikro di Desa Saripan.',
        date: '22 Januari 2026',
        author: 'Admin Desa',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
        category: 'Pelatihan',
    },
    {
        title: 'Posyandu Balita Bulan Februari',
        excerpt:
            'Kegiatan Posyandu balita akan dilaksanakan pada tanggal 5 Februari 2026 di Balai Desa. Harap hadir tepat waktu.',
        date: '20 Januari 2026',
        author: 'Admin Desa',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
        category: 'Kesehatan',
    },
];

export default function NewsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="news"
            ref={ref}
            className="py-24 bg-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                        <Newspaper className="w-4 h-4" />
                        Berita Terkini
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Informasi & Berita Desa
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ikuti perkembangan dan kegiatan terbaru di Desa Saripan
                    </p>
                </motion.div>

                {/* News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.map((news, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
                                        {news.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {news.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        {news.author}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                    {news.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {news.excerpt}
                                </p>

                                <button className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all">
                                    Baca Selengkapnya
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105">
                        Lihat Semua Berita
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
