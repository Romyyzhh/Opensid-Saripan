import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, Type, ToggleLeft, ToggleRight } from 'lucide-react';
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

interface RunningText {
    id: number;
    text: string;
    is_active: boolean;
    start_date: string;
    end_date: string;
}

export default function TeksBerjalan() {
    const [runningTexts, setRunningTexts] = useState<RunningText[]>([
        { id: 1, text: 'Selamat datang di website resmi Desa Saripan', is_active: true, start_date: '2026-01-01', end_date: '2026-12-31' },
        { id: 2, text: 'Pendaftaran UMKM dibuka hingga akhir bulan', is_active: true, start_date: '2026-01-15', end_date: '2026-01-31' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentText, setCurrentText] = useState<RunningText | null>(null);
    const [formData, setFormData] = useState({
        text: '',
        start_date: '',
        end_date: '',
    });

    const handleAdd = () => {
        setCurrentText(null);
        setFormData({ text: '', start_date: '', end_date: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (text: RunningText) => {
        setCurrentText(text);
        setFormData({
            text: text.text,
            start_date: text.start_date,
            end_date: text.end_date,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus teks ini?')) {
            setRunningTexts(runningTexts.filter((t) => t.id !== id));
        }
    };

    const handleToggleStatus = (id: number) => {
        setRunningTexts(
            runningTexts.map((t) =>
                t.id === id ? { ...t, is_active: !t.is_active } : t
            )
        );
    };

    const handleSave = () => {
        if (currentText) {
            setRunningTexts(
                runningTexts.map((t) =>
                    t.id === currentText.id
                        ? { ...t, ...formData }
                        : t
                )
            );
        } else {
            const newText: RunningText = {
                id: Math.max(...runningTexts.map((t) => t.id), 0) + 1,
                text: formData.text,
                start_date: formData.start_date,
                end_date: formData.end_date,
                is_active: true,
            };
            setRunningTexts([...runningTexts, newText]);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout title="Teks Berjalan" currentRoute="/admin/teks-berjalan">
            <Head title="Teks Berjalan - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Teks Berjalan</h1>
                        <p className="text-gray-600 mt-1">Kelola teks berjalan (running text) di website</p>
                    </div>
                    <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-5 h-5 mr-2" />
                        Tambah Teks
                    </Button>
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
                                <button onClick={() => handleToggleStatus(item.id)} className="flex items-center gap-1">
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
                                <button onClick={() => handleEdit(item)} className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-1">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium flex items-center gap-1">
                                    <Trash2 className="w-4 h-4" />
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentText ? 'Edit Teks' : 'Tambah Teks'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="text">Isi Teks</Label>
                            <Input
                                id="text"
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                placeholder="Isi teks pengumuman"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start_date">Tanggal Mulai</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end_date">Tanggal Selesai</Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                />
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
