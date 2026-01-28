import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Widget {
    id: number;
    title: string;
    type: string;
    position: string;
    is_active: boolean;
}

export default function Widget() {
    // Initial dummy data
    const [widgets, setWidgets] = useState<Widget[]>([
        { id: 1, title: 'Widget Pengumuman', type: 'text', position: 'sidebar', is_active: true },
        { id: 2, title: 'Widget Statistik', type: 'stats', position: 'sidebar', is_active: true },
        { id: 3, title: 'Widget Agenda', type: 'calendar', position: 'footer', is_active: false },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentWidget, setCurrentWidget] = useState<Widget | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        position: '',
    });

    const handleAdd = () => {
        setCurrentWidget(null);
        setFormData({ title: '', type: '', position: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (widget: Widget) => {
        setCurrentWidget(widget);
        setFormData({
            title: widget.title,
            type: widget.type,
            position: widget.position,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus widget ini?')) {
            setWidgets(widgets.filter((w) => w.id !== id));
        }
    };

    const handleToggleStatus = (id: number) => {
        setWidgets(
            widgets.map((w) =>
                w.id === id ? { ...w, is_active: !w.is_active } : w
            )
        );
    };

    const handleSave = () => {
        if (currentWidget) {
            // Update existing
            setWidgets(
                widgets.map((w) =>
                    w.id === currentWidget.id
                        ? { ...w, ...formData }
                        : w
                )
            );
        } else {
            // Add new
            const newWidget: Widget = {
                id: Math.max(...widgets.map((w) => w.id), 0) + 1,
                title: formData.title,
                type: formData.type || 'text',
                position: formData.position || 'sidebar',
                is_active: true,
            };
            setWidgets([...widgets, newWidget]);
        }
        setIsModalOpen(false);
    };

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
                    <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-5 h-5 mr-2" />
                        Tambah Widget
                    </Button>
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
                                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{widget.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{widget.position}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleToggleStatus(widget.id)} className="flex items-center gap-1">
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
                                            <button onClick={() => handleEdit(widget)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(widget.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {widgets.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Belum ada widget. Silakan tambah widget baru.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Dialog */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentWidget ? 'Edit Widget' : 'Tambah Widget'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Judul Widget</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Contoh: Pengumuman Penting"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type">Tipe Widget</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => setFormData({ ...formData, type: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tipe widget" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Teks / HTML</SelectItem>
                                    <SelectItem value="stats">Statistik</SelectItem>
                                    <SelectItem value="calendar">Kalender Agenda</SelectItem>
                                    <SelectItem value="gallery">Galeri Foto</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="position">Posisi</Label>
                            <Select
                                value={formData.position}
                                onValueChange={(value) => setFormData({ ...formData, position: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih posisi widget" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sidebar">Sidebar Kanan</SelectItem>
                                    <SelectItem value="footer">Footer</SelectItem>
                                    <SelectItem value="header">Header</SelectItem>
                                </SelectContent>
                            </Select>
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
