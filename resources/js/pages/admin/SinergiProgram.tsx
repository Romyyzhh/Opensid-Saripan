import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

export default function SinergiProgram() {
    const programs = [
        { id: 1, name: 'Program Desa Digital', description: 'Kerjasama digitalisasi desa', link: 'https://example.com', is_active: true },
        { id: 2, name: 'Program PNPM', description: 'Program Nasional Pemberdayaan Masyarakat', link: 'https://example.com', is_active: true },
    ];

    return (
        <AdminLayout title="Sinergi Program" currentRoute="/admin/sinergi-program">
            <Head title="Sinergi Program - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Sinergi Program</h1>
                        <p className="text-gray-600 mt-1">Kelola program kerjasama dan kemitraan</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Tambah Program
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program) => (
                        <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${program.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {program.is_active ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                            <a href={program.link} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mb-4">
                                Lihat Detail <ExternalLink className="w-4 h-4" />
                            </a>
                            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                                <button className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="flex-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
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
