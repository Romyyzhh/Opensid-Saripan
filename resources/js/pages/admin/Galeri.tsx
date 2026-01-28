import AdminLayout from '@/layouts/admin/AdminLayout';
import { motion } from 'framer-motion';
import { Plus, Upload } from 'lucide-react';

export default function Galeri() {
    const photos = [
        { id: 1, title: 'Kegiatan Posyandu', category: 'Kesehatan' },
        { id: 2, title: 'Gotong Royong', category: 'Kegiatan' },
        { id: 3, title: 'Rapat RT/RW', category: 'Pemerintahan' },
        { id: 4, title: 'Festival Desa', category: 'Budaya' },
        { id: 5, title: 'Pembangunan Jalan', category: 'Infrastruktur' },
        { id: 6, title: 'Pelatihan UMKM', category: 'Ekonomi' },
    ];

    return (
        <AdminLayout title="Galeri" currentRoute="/admin/galeri">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Galeri
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Kelola foto dan dokumentasi kegiatan desa
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                >
                    <Upload className="w-5 h-5" />
                    Upload Foto
                </motion.button>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -4 }}
                        className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
                    >
                        {/* Image Placeholder */}
                        <div className="aspect-[4/3] bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                            <Plus className="w-12 h-12 text-white opacity-50" />
                        </div>

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                Lihat
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                                Hapus
                            </button>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="font-medium text-gray-900">
                                {photo.title}
                            </h3>
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                {photo.category}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </AdminLayout>
    );
}
