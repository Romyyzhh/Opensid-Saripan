import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export default function Widget() {
    // Sample data - replace with real data from backend
    const widgets = [
        { id: 1, title: 'Widget Pengumuman', type: 'text', position: 'sidebar', is_active: true },
        { id: 2, title: 'Widget Statistik', type: 'stats', position: 'sidebar', is_active: true },
        { id: 3, title: 'Widget Agenda', type: 'calendar', position: 'footer', is_active: false },
    ];

    return (
        <AdminLayout title="Widget" currentRoute="/admin/widget">
            <Head title="Widget - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manajemen Widget</h1>
                        <p className="text-gray-600 mt-1">Kelola widget yang ditampilkan di website</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2 transition-colors">
                        <Plus className="w-5 h-5" />
                        Tambah Widget
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Judul</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipe</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Posisi</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {widgets.map((widget) => (
                                <tr key={widget.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{widget.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{widget.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{widget.position}</td>
                                    <td className="px-6 py-4">
                                        <button className="flex items-center gap-1">
                                            {widget.is_active ? (
                                                <>
                                                    <ToggleRight className="w-5 h-5 text-emerald-600" />
                                                    <span className="text-sm text-emerald-600 font-medium">Aktif</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ToggleLeft className="w-5 h-5 text-gray-400" />
                                                    <span className="text-sm text-gray-400 font-medium">Nonaktif</span>
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
