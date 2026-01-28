import AdminLayout from '@/layouts/admin/AdminLayout';
import { Head } from '@inertiajs/react';
import { Check, X, MessageSquare, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Comment {
    id: number;
    user: string;
    artikel: string;
    content: string;
    is_approved: boolean;
    created_at: string;
}

export default function Komentar() {
    const [comments, setComments] = useState<Comment[]>([
        { id: 1, user: 'Ahmad Fauzi', artikel: 'Pembangunan Jalan Desa', content: 'Terima kasih atas informasinya...', is_approved: false, created_at: '2026-01-28 08:30' },
        { id: 2, user: 'Siti Nurhaliza', artikel: 'Pelatihan UMKM', content: 'Kapan pendaftarannya dibuka?', is_approved: true, created_at: '2026-01-27 14:20' },
    ]);

    const handleApprove = (id: number) => {
        setComments(
            comments.map((c) =>
                c.id === id ? { ...c, is_approved: true } : c
            )
        );
    };

    const handleReject = (id: number) => {
        // Option 1: Mark as rejected (if we had a status field with 'rejected')
        // Option 2: Delete the comment (simulating rejection/deletion)
        // Let's assume reject means delete for now, or just unapprove if it was approved?
        // Usually reject means delete or hide. Let's ask confirmation then delete.
        if (confirm('Apakah Anda yakin ingin menolak dan menghapus komentar ini?')) {
            setComments(comments.filter((c) => c.id !== id));
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
            setComments(comments.filter((c) => c.id !== id));
        }
    };

    return (
        <AdminLayout title="Komentar" currentRoute="/admin/komentar">
            <Head title="Komentar - Admin" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Moderasi Komentar</h1>
                    <p className="text-gray-600 mt-1">Kelola dan moderasi komentar dari pengunjung</p>
                </div>

                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{comment.user}</h3>
                                        <p className="text-sm text-gray-500">pada artikel: {comment.artikel}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${comment.is_approved ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {comment.is_approved ? 'Disetujui' : 'Menunggu'}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-3">{comment.content}</p>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                <span className="text-sm text-gray-500">{comment.created_at}</span>
                                <div className="flex items-center gap-2">
                                    {!comment.is_approved && (
                                        <button onClick={() => handleApprove(comment.id)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium flex items-center gap-1">
                                            <Check className="w-4 h-4" />
                                            Setujui
                                        </button>
                                    )}
                                    <button onClick={() => handleReject(comment.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium flex items-center gap-1">
                                        <X className="w-4 h-4" />
                                        Tolak
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200">
                            Tidak ada komentar untuk dimoderasi.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
