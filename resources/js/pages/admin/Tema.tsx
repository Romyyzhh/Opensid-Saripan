import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Palette, Upload, Save } from 'lucide-react';

export default function Tema() {
    return (
        <AdminLayout title="Tema" currentRoute="/admin/tema">
            <Head title="Tema - Admin" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pengaturan Tema</h1>
                    <p className="text-gray-600 mt-1">Kustomisasi tampilan website</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Logo & Favicon */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Upload className="w-5 h-5 text-emerald-600" />
                            Logo & Favicon
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Logo Website</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">Klik untuk upload logo</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">Klik untuk upload favicon</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Color Scheme */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Palette className="w-5 h-5 text-emerald-600" />
                            Skema Warna
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Warna Utama</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" defaultValue="#10b981" className="w-16 h-10 rounded border border-gray-300" />
                                    <input type="text" defaultValue="#10b981" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Warna Sekunder</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" defaultValue="#14b8a6" className="w-16 h-10 rounded border border-gray-300" />
                                    <input type="text" defaultValue="#14b8a6" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Warna Aksen</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" defaultValue="#3b82f6" className="w-16 h-10 rounded border border-gray-300" />
                                    <input type="text" defaultValue="#3b82f6" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium flex items-center gap-2">
                        <Save className="w-5 h-5" />
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
