import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, Type, ToggleLeft, ToggleRight } from 'lucide-react';

export default function TeksBerjalan() {
    const runningTexts = [
        { id: 1, text: 'Selamat datang di website resmi Desa Saripan', is_active: true, start_date: '2026-01-01', end_date: '2026-12-31' },
        { id: 2, text: 'Pendaftaran UMKM dibuka hingga akhir bulan', is_active: true, start_date: '2026-01-15', end_date: '2026-01-31' },
    ];

    return (
        <AdminLayout title="Teks Berjalan" currentRoute="/admin/teks-berjalan">
            <Head title="Teks Berjalan - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Teks Berjalan</h1>
                        <p className="text-gray-600 mt-1">Kelola teks berjalan (running text) di website</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Tambah Teks
                    </button>
                </div>

                <div className="space-y-4">
                    {runningTexts.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Type className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-900 font-medium mb-2">{item.text}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>Mulai: {item.start_date}</span>
                                            <span>•</span>
                                            <span>Selesai: {item.end_date}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center gap-1">
                                    {item.is_active ? (
                                        <>
                                            <ToggleRight className="w-6 h-6 text-emerald-600" />
                                            <span className="text-sm text-emerald-600 font-medium">Aktif</span>
                                        </>
                                    ) : (
                                        <>
                                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                                            <span className="text-sm text-gray-400 font-medium">Nonaktif</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-1">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium flex items-center gap-1">
                                    <Trash2 className="w-4 h-4" />
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
