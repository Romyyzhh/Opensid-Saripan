import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, Image as ImageIcon, GripVertical } from 'lucide-react';

export default function Slider() {
    const sliders = [
        { id: 1, title: 'Selamat Datang di Desa Saripan', image: '/assets/hero.jpeg', order: 1, is_active: true },
        { id: 2, title: 'Pembangunan Infrastruktur', image: '/assets/hero.jpeg', order: 2, is_active: true },
    ];

    return (
        <AdminLayout title="Slider" currentRoute="/admin/slider">
            <Head title="Slider - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manajemen Slider</h1>
                        <p className="text-gray-600 mt-1">Kelola gambar slider di halaman utama</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Tambah Slider
                    </button>
                </div>

                <div className="space-y-4">
                    {sliders.map((slider) => (
                        <div key={slider.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4">
                            <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                            <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={slider.image} alt={slider.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{slider.title}</h3>
                                <p className="text-sm text-gray-500">Urutan: {slider.order}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${slider.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                {slider.is_active ? 'Aktif' : 'Nonaktif'}
                            </span>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
