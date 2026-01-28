import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Bell, Search, User } from 'lucide-react';

interface AdminLayoutProps extends PropsWithChildren {
    title: string;
    currentRoute?: string;
}

export default function AdminLayout({
    children,
    title,
    currentRoute,
}: AdminLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50">
                {/* Sidebar */}
                <AdminSidebar currentRoute={currentRoute} />

                {/* Main Content */}
                <div className="pl-64 transition-all duration-300">
                    {/* Top Header */}
                    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-30">
                        <div className="h-full px-6 flex items-center justify-between">
                            {/* Search */}
                            <div className="flex-1 max-w-xl">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="flex items-center gap-4">
                                {/* Notifications */}
                                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                                </button>

                                {/* User Profile */}
                                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-900">
                                            Admin
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Administrator
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="pt-16 min-h-screen">
                        <div className="p-6">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
