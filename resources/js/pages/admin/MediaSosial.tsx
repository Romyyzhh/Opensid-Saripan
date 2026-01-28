import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function MediaSosial() {
    const socialMedia = [
        { id: 1, platform: 'Facebook', url: 'https://facebook.com/desasaripan', icon: Facebook, is_active: true },
        { id: 2, platform: 'Instagram', url: 'https://instagram.com/desasaripan', icon: Instagram, is_active: true },
        { id: 3, platform: 'Twitter', url: 'https://twitter.com/desasaripan', icon: Twitter, is_active: false },
    ];

    return (
        <AdminLayout title="Media Sosial" currentRoute="/admin/media-sosial">
            <Head title="Media Sosial - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Media Sosial</h1>
                        <p className="text-gray-600 mt-1">Kelola akun media sosial desa</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Tambah Media Sosial
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {socialMedia.map((social) => {
                        const Icon = social.icon;
                        return (
                            <div key={social.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{social.platform}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${social.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {social.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 truncate">{social.url}</p>
                                <div className="flex items-center gap-2">
                                    <button className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium">
                                        <Edit className="w-4 h-4 inline mr-1" />
                                        Edit
                                    </button>
                                    <button className="flex-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium">
                                        <Trash2 className="w-4 h-4 inline mr-1" />
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}
