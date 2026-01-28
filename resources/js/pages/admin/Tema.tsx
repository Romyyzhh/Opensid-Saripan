import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Palette, Upload, Save } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Tema() {
    const [themeSettings, setThemeSettings] = useState({
        primaryColor: '#10b981',
        secondaryColor: '#14b8a6',
        accentColor: '#3b82f6',
        logo: null as File | null,
        favicon: null as File | null,
    });

    const handleChange = (key: string, value: string) => {
        setThemeSettings({ ...themeSettings, [key]: value });
    };

    const handleSave = () => {
        // Simulate saving
        alert('Pengaturan tema berhasil disimpan!');
        console.log('Saved settings:', themeSettings);
    };

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
                                <Label className="block text-sm font-medium text-gray-700 mb-2">Logo Website</Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">Klik untuk upload logo</p>
                                </div>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-2">Favicon</Label>
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
                                <Label className="block text-sm font-medium text-gray-700 mb-2">Warna Utama</Label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={themeSettings.primaryColor}
                                        onChange={(e) => handleChange('primaryColor', e.target.value)}
                                        className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={themeSettings.primaryColor}
                                        onChange={(e) => handleChange('primaryColor', e.target.value)}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-2">Warna Sekunder</Label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={themeSettings.secondaryColor}
                                        onChange={(e) => handleChange('secondaryColor', e.target.value)}
                                        className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={themeSettings.secondaryColor}
                                        onChange={(e) => handleChange('secondaryColor', e.target.value)}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-2">Warna Aksen</Label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={themeSettings.accentColor}
                                        onChange={(e) => handleChange('accentColor', e.target.value)}
                                        className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={themeSettings.accentColor}
                                        onChange={(e) => handleChange('accentColor', e.target.value)}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                        <Save className="w-5 h-5 mr-2" />
                        Simpan Perubahan
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
}
