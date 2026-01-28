import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, Image as ImageIcon, GripVertical, ToggleLeft, ToggleRight } from 'lucide-react';
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

interface SliderItem {
    id: number;
    title: string;
    image: string;
    order: number;
    is_active: boolean;
}

export default function Slider() {
    const [sliders, setSliders] = useState<SliderItem[]>([
        { id: 1, title: 'Selamat Datang di Desa Saripan', image: '/assets/hero.jpeg', order: 1, is_active: true },
        { id: 2, title: 'Pembangunan Infrastruktur', image: '/assets/hero.jpeg', order: 2, is_active: true },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlider, setCurrentSlider] = useState<SliderItem | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        order: 0,
    });

    const handleAdd = () => {
        setCurrentSlider(null);
        setFormData({ title: '', image: '/assets/hero.jpeg', order: sliders.length + 1 });
        setIsModalOpen(true);
    };

    const handleEdit = (slider: SliderItem) => {
        setCurrentSlider(slider);
        setFormData({
            title: slider.title,
            image: slider.image,
            order: slider.order,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus slider ini?')) {
            setSliders(sliders.filter((s) => s.id !== id));
        }
    };

    const handleToggleStatus = (id: number) => {
        setSliders(
            sliders.map((s) =>
                s.id === id ? { ...s, is_active: !s.is_active } : s
            )
        );
    };

    const handleSave = () => {
        if (currentSlider) {
            setSliders(
                sliders.map((s) =>
                    s.id === currentSlider.id
                        ? { ...s, ...formData }
                        : s
                )
            );
        } else {
            const newSlider: SliderItem = {
                id: Math.max(...sliders.map((s) => s.id), 0) + 1,
                title: formData.title,
                image: formData.image || '/assets/hero.jpeg', // Default image for dummy
                order: formData.order || sliders.length + 1,
                is_active: true,
            };
            setSliders([...sliders, newSlider]);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout title="Slider" currentRoute="/admin/slider">
            <Head title="Slider - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manajemen Slider</h1>
                        <p className="text-gray-600 mt-1">Kelola gambar slider di halaman utama</p>
                    </div>
                    <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-5 h-5 mr-2" />
                        Tambah Slider
                    </Button>
                </div>

                <div className="space-y-4">
                    {sliders.sort((a, b) => a.order - b.order).map((slider) => (
                        <div key={slider.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4">
                            <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                            <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={slider.image} alt={slider.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{slider.title}</h3>
                                <p className="text-sm text-gray-500">Urutan: {slider.order}</p>
                            </div>
                            <button onClick={() => handleToggleStatus(slider.id)}>
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${slider.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {slider.is_active ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </button>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(slider)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(slider.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentSlider ? 'Edit Slider' : 'Tambah Slider'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Judul Slider</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Judul slider"
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
                        {/* Image upload would go here, for dummy we just keep the path */}
                        <div className="grid gap-2">
                            <Label>Gambar</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Klik untuk upload gambar (Dummy)</p>
                            </div>
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
