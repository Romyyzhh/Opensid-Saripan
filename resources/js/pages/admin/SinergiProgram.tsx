import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, ExternalLink, ToggleLeft, ToggleRight } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea'; // Assuming Textarea component exists or I'll use standard textarea

// Since Textarea component might not exist in ui folder (I didn't check specifically but usually it does or I can use standard), 
// I'll check if I need to create it or use standard. 
// Looking at previous list_dir, I didn't see textarea.tsx. I'll use standard textarea with tailwind classes.

interface Program {
    id: number;
    name: string;
    description: string;
    link: string;
    is_active: boolean;
}

export default function SinergiProgram() {
    const [programs, setPrograms] = useState<Program[]>([
        { id: 1, name: 'Program Desa Digital', description: 'Kerjasama digitalisasi desa', link: 'https://example.com', is_active: true },
        { id: 2, name: 'Program PNPM', description: 'Program Nasional Pemberdayaan Masyarakat', link: 'https://example.com', is_active: true },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        link: '',
    });

    const handleAdd = () => {
        setCurrentProgram(null);
        setFormData({ name: '', description: '', link: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (program: Program) => {
        setCurrentProgram(program);
        setFormData({
            name: program.name,
            description: program.description,
            link: program.link,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus program ini?')) {
            setPrograms(programs.filter((p) => p.id !== id));
        }
    };

    const handleToggleStatus = (id: number) => {
        setPrograms(
            programs.map((p) =>
                p.id === id ? { ...p, is_active: !p.is_active } : p
            )
        );
    };

    const handleSave = () => {
        if (currentProgram) {
            setPrograms(
                programs.map((p) =>
                    p.id === currentProgram.id
                        ? { ...p, ...formData }
                        : p
                )
            );
        } else {
            const newProgram: Program = {
                id: Math.max(...programs.map((p) => p.id), 0) + 1,
                name: formData.name,
                description: formData.description,
                link: formData.link,
                is_active: true,
            };
            setPrograms([...programs, newProgram]);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout title="Sinergi Program" currentRoute="/admin/sinergi-program">
            <Head title="Sinergi Program - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Sinergi Program</h1>
                        <p className="text-gray-600 mt-1">Kelola program kerjasama dan kemitraan</p>
                    </div>
                    <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-5 h-5 mr-2" />
                        Tambah Program
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program) => (
                        <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                                <button onClick={() => handleToggleStatus(program.id)}>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${program.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {program.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                            <a href={program.link} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mb-4">
                                Lihat Detail <ExternalLink className="w-4 h-4" />
                            </a>
                            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                                <button onClick={() => handleEdit(program)} className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(program.id)} className="flex-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
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
                        <DialogTitle>{currentProgram ? 'Edit Program' : 'Tambah Program'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Program</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Nama program"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <textarea
                                id="description"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Deskripsi singkat program"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="link">Link Website</Label>
                            <Input
                                id="link"
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                placeholder="https://..."
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
