import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import { User, FileText, MessageSquare, Settings } from 'lucide-react';

export default function UserDashboard() {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Dashboard User - OpenSID Desa Saripan" />
            <Navbar />

            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Welcome Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Selamat Datang, {auth.user.name}!
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Ini adalah dashboard personal Anda. Anda dapat mengelola profil dan melihat aktivitas Anda di sini.
                            </p>
                            <div className="mt-4 flex gap-3">
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                                    Warga Terverifikasi
                                </span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    {auth.user.email}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Layanan Mandiri Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Layanan Mandiri</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Ajukan surat keterangan dan dokumen administrasi lainnya secara online.
                        </p>
                        <button className="text-blue-600 font-medium text-sm hover:underline">
                            Akses Layanan →
                        </button>
                    </div>

                    {/* Riwayat Aktivitas Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <MessageSquare className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Riwayat Aktivitas</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Lihat status pengajuan surat dan komentar yang Anda berikan.
                        </p>
                        <button className="text-purple-600 font-medium text-sm hover:underline">
                            Lihat Riwayat →
                        </button>
                    </div>

                    {/* Pengaturan Profil Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                            <Settings className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Pengaturan Profil</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Update data diri, password, dan preferensi akun Anda.
                        </p>
                        <button className="text-orange-600 font-medium text-sm hover:underline">
                            Edit Profil →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
