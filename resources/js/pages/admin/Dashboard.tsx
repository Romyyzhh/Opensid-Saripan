import AdminLayout from '@/layouts/admin/AdminLayout';
import { motion } from 'framer-motion';
import {
    Users,
    FileText,
    Image,
    Eye,
    TrendingUp,
    Activity,
    Calendar,
    MessageSquare,
} from 'lucide-react';

export default function Dashboard() {
    const stats = [
        {
            label: 'Total Penduduk',
            value: '5,234',
            change: '+12%',
            icon: Users,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            label: 'Total Artikel',
            value: '147',
            change: '+5%',
            icon: FileText,
            color: 'from-emerald-500 to-teal-500',
        },
        {
            label: 'Galeri Foto',
            value: '384',
            change: '+23%',
            icon: Image,
            color: 'from-purple-500 to-pink-500',
        },
        {
            label: 'Pengunjung Hari Ini',
            value: '1,234',
            change: '+8%',
            icon: Eye,
            color: 'from-amber-500 to-orange-500',
        },
    ];

    const recentActivities = [
        {
            title: 'Artikel baru dipublikasikan',
            description: 'Pengumuman kegiatan gotong royong',
            time: '2 menit yang lalu',
            icon: FileText,
        },
        {
            title: 'Foto ditambahkan ke galeri',
            description: '5 foto kegiatan posyandu',
            time: '1 jam yang lalu',
            icon: Image,
        },
        {
            title: 'Komentar baru',
            description: 'Warga memberikan feedback',
            time: '3 jam yang lalu',
            icon: MessageSquare,
        },
    ];

    return (
        <AdminLayout title="Dashboard" currentRoute="/admin/dashboard">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Selamat datang di panel admin OpenSID Desa Saripan
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                                >
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                                    <TrendingUp className="w-4 h-4" />
                                    {stat.change}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600">
                                {stat.label}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            Aktivitas Terkini
                        </h2>
                        <Activity className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => {
                            const Icon = activity.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">
                                            {activity.title}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {activity.description}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            Aksi Cepat
                        </h2>
                        <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        <button className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                            Tambah Artikel
                        </button>
                        <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Upload Foto
                        </button>
                        <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Lihat Komentar
                        </button>
                        <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Pengaturan Desa
                        </button>
                    </div>
                </motion.div>
            </div>
        </AdminLayout>
    );
}
