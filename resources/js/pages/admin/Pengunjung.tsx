import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Eye, TrendingUp, Users, Globe, Calendar } from 'lucide-react';

export default function Pengunjung() {
    const stats = [
        { label: 'Hari Ini', value: '234', icon: Calendar, color: 'bg-blue-500' },
        { label: 'Minggu Ini', value: '1,456', icon: TrendingUp, color: 'bg-emerald-500' },
        { label: 'Bulan Ini', value: '8,932', icon: Users, color: 'bg-purple-500' },
        { label: 'Total', value: '45,678', icon: Globe, color: 'bg-orange-500' },
    ];

    const recentVisitors = [
        { ip: '192.168.1.1', page: '/beranda', time: '2026-01-28 09:05', browser: 'Chrome' },
        { ip: '192.168.1.2', page: '/berita', time: '2026-01-28 09:03', browser: 'Firefox' },
        { ip: '192.168.1.3', page: '/galeri', time: '2026-01-28 09:00', browser: 'Safari' },
    ];

    return (
        <AdminLayout title="Pengunjung" currentRoute="/admin/pengunjung">
            <Head title="Pengunjung - Admin" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Statistik Pengunjung</h1>
                    <p className="text-gray-600 mt-1">Pantau aktivitas pengunjung website</p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <Eye className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Visitors Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Pengunjung Terbaru</h3>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">IP Address</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Halaman</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Browser</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Waktu</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {recentVisitors.map((visitor, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{visitor.ip}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{visitor.page}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{visitor.browser}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{visitor.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
