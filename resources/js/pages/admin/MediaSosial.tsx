import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, Facebook, Instagram, Twitter, Youtube, Globe, ToggleLeft, ToggleRight } from 'lucide-react';
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

interface SocialMedia {
    id: number;
    platform: string;
    url: string;
    icon: any;
    is_active: boolean;
}

export default function MediaSosial() {
    const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([
        { id: 1, platform: 'Facebook', url: 'https://facebook.com/desasaripan', icon: Facebook, is_active: true },
        { id: 2, platform: 'Instagram', url: 'https://instagram.com/desasaripan', icon: Instagram, is_active: true },
        { id: 3, platform: 'Twitter', url: 'https://twitter.com/desasaripan', icon: Twitter, is_active: false },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSocial, setCurrentSocial] = useState<SocialMedia | null>(null);
    const [formData, setFormData] = useState({
        platform: '',
        url: '',
    });

    const getIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'facebook': return Facebook;
            case 'instagram': return Instagram;
            case 'twitter': return Twitter;
            case 'youtube': return Youtube;
            default: return Globe;
        }
    };

    const handleAdd = () => {
        setCurrentSocial(null);
        setFormData({ platform: '', url: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (social: SocialMedia) => {
        setCurrentSocial(social);
        setFormData({
            platform: social.platform,
            url: social.url,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus media sosial ini?')) {
            setSocialMedia(socialMedia.filter((s) => s.id !== id));
        }
    };

    const handleToggleStatus = (id: number) => {
        setSocialMedia(
            socialMedia.map((s) =>
                s.id === id ? { ...s, is_active: !s.is_active } : s
            )
        );
    };

    const handleSave = () => {
        if (currentSocial) {
            setSocialMedia(
                socialMedia.map((s) =>
                    s.id === currentSocial.id
                        ? { ...s, ...formData, icon: getIcon(formData.platform) }
                        : s
                )
            );
        } else {
            const newSocial: SocialMedia = {
                id: Math.max(...socialMedia.map((s) => s.id), 0) + 1,
                platform: formData.platform,
                url: formData.url,
                icon: getIcon(formData.platform),
                is_active: true,
            };
            setSocialMedia([...socialMedia, newSocial]);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout title="Media Sosial" currentRoute="/admin/media-sosial">
            <Head title="Media Sosial - Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Media Sosial</h1>
                        <p className="text-gray-600 mt-1">Kelola akun media sosial desa</p>
                    </div>
                    <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-5 h-5 mr-2" />
                        Tambah Media Sosial
                    </Button>
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
                                        <button onClick={() => handleToggleStatus(social.id)}>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${social.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {social.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 truncate">{social.url}</p>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleEdit(social)} className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(social.id)} className="flex-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                                        <Trash2 className="w-4 h-4" />
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentSocial ? 'Edit Media Sosial' : 'Tambah Media Sosial'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="platform">Platform</Label>
                            <Select
                                value={formData.platform}
                                onValueChange={(value) => setFormData({ ...formData, platform: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Facebook">Facebook</SelectItem>
                                    <SelectItem value="Instagram">Instagram</SelectItem>
                                    <SelectItem value="Twitter">Twitter</SelectItem>
                                    <SelectItem value="Youtube">Youtube</SelectItem>
                                    <SelectItem value="Website">Website Lain</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="url">URL Profil</Label>
                            <Input
                                id="url"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
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
