import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';

export default function Menu() {
    const menus = [
        { id: 1, name: 'Beranda', url: '/', order: 1, is_active: true },
        { id: 2, name: 'Tentang', url: '/tentang', order: 2, is_active: true },
        { id: 3, name: 'Berita', url: '/berita', order: 3, is_active: true },
        { id: 4, name: 'Galeri', url: '/galeri', order: 4, is_active: true },
    ];

    return (
        <AdminLayout title="Menu" currentRoute="/admin/menu">
            <Head title="Menu - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manajemen Menu</h1>
                        <p className="text-gray-600 mt-1">Kelola menu navigasi website</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Tambah Menu
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Urutan</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama Menu</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">URL</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {menus.map((menu) => (
                                <tr key={menu.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{menu.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{menu.url}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${menu.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {menu.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
