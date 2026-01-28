import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, GripVertical, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MenuItem {
    id: number;
    name: string;
    url: string;
    order: number;
    is_active: boolean;
}

export default function Menu() {
    const [menus, setMenus] = useState<MenuItem[]>([
        { id: 1, name: 'Beranda', url: '/', order: 1, is_active: true },
        { id: 2, name: 'Tentang', url: '/tentang', order: 2, is_active: true },
        { id: 3, name: 'Berita', url: '/berita', order: 3, is_active: true },
        { id: 4, name: 'Galeri', url: '/galeri', order: 4, is_active: true },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMenu, setCurrentMenu] = useState<MenuItem | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        order: 0,
    });

    const handleAdd = () => {
        setCurrentMenu(null);
        setFormData({ name: '', url: '', order: menus.length + 1 });
        setIsModalOpen(true);
    };

    const handleEdit = (menu: MenuItem) => {
        setCurrentMenu(menu);
        setFormData({
            name: menu.name,
            url: menu.url,
            order: menu.order,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
            setMenus(menus.filter((m) => m.id !== id));
        }
    };

    const handleToggleStatus = (id: number) => {
        setMenus(
            menus.map((m) =>
                m.id === id ? { ...m, is_active: !m.is_active } : m
            )
        );
    };

    const handleSave = () => {
        if (currentMenu) {
            setMenus(
                menus.map((m) =>
                    m.id === currentMenu.id
                        ? { ...m, ...formData }
                        : m
                )
            );
        } else {
            const newMenu: MenuItem = {
                id: Math.max(...menus.map((m) => m.id), 0) + 1,
                name: formData.name,
                url: formData.url,
                order: formData.order || menus.length + 1,
                is_active: true,
            };
            setMenus([...menus, newMenu]);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout title="Menu" currentRoute="/admin/menu">
            <Head title="Menu - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manajemen Menu</h1>
                        <p className="text-gray-600 mt-1">Kelola menu navigasi website</p>
                    </div>
                    <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-5 h-5 mr-2" />
                        Tambah Menu
                    </Button>
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
                            {menus.sort((a, b) => a.order - b.order).map((menu) => (
                                <tr key={menu.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                                            <span className="text-sm text-gray-600 font-medium">{menu.order}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{menu.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{menu.url}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleToggleStatus(menu.id)} className="flex items-center gap-1">
                                            {menu.is_active ? (
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
                                            <button onClick={() => handleEdit(menu)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(menu.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentMenu ? 'Edit Menu' : 'Tambah Menu'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Menu</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Contoh: Profil Desa"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="url">URL Tujuan</Label>
                            <Input
                                id="url"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                placeholder="Contoh: /profil"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="order">Urutan</Label>
                            <Input
                                id="order"
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
                        <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
