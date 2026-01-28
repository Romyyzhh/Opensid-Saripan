import { Link } from '@inertiajs/react';
import {
    Globe,
    FileText,
    Layout,
    Menu as MenuIcon,
    Network,
    MessageSquare,
    Image,
    Palette,
    Share2,
    Image as SliderIcon,
    Type,
    Eye,
    Settings,
    ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface AdminSidebarProps {
    currentRoute?: string;
}

export default function AdminSidebar({ currentRoute }: AdminSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        {
            name: 'Admin Web',
            icon: Globe,
            href: '/admin/dashboard',
            hasDropdown: true,
        },
        { name: 'Artikel', icon: FileText, href: '/admin/artikel' },
        { name: 'Widget', icon: Layout, href: '/admin/widget' },
        { name: 'Menu', icon: MenuIcon, href: '/admin/menu' },
        {
            name: 'Sinergi Program',
            icon: Network,
            href: '/admin/sinergi-program',
        },
        { name: 'Komentar', icon: MessageSquare, href: '/admin/komentar' },
        { name: 'Galeri', icon: Image, href: '/admin/galeri' },
        { name: 'Tema', icon: Palette, href: '/admin/tema' },
        { name: 'Media Sosial', icon: Share2, href: '/admin/media-sosial' },
        { name: 'Slider', icon: SliderIcon, href: '/admin/slider' },
        {
            name: 'Teks Berjalan',
            icon: Type,
            href: '/admin/teks-berjalan',
        },
        { name: 'Pengunjung', icon: Eye, href: '/admin/pengunjung' },
        { name: 'Pengaturan', icon: Settings, href: '/admin/pengaturan' },
    ];

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 h-screen bg-[#2c3e50] text-gray-300 transition-all duration-300 z-40 flex flex-col',
                isCollapsed ? 'w-16' : 'w-64',
            )}
        >
            {/* Header/Logo */}
            <div className="h-16 flex items-center px-4 border-b border-gray-700/50">
                {!isCollapsed && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                            <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="font-semibold text-white text-sm">
                                OpenSID
                            </div>
                            <div className="text-xs text-gray-400">
                                Desa Saripan
                            </div>
                        </div>
                    </div>
                )}
                {isCollapsed && (
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto">
                        <Globe className="w-5 h-5 text-white" />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-2">
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentRoute === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative',
                                    isActive
                                        ? 'bg-emerald-600/20 text-emerald-400'
                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200',
                                )}
                            >
                                <Icon
                                    className={cn(
                                        'w-5 h-5 flex-shrink-0',
                                        isActive
                                            ? 'text-emerald-400'
                                            : 'text-gray-500 group-hover:text-gray-300',
                                    )}
                                />
                                {!isCollapsed && (
                                    <>
                                        <span className="flex-1 text-sm font-medium">
                                            {item.name}
                                        </span>
                                        {item.hasDropdown && (
                                            <ChevronRight className="w-4 h-4 opacity-50" />
                                        )}
                                    </>
                                )}

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-r-full" />
                                )}

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {item.name}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-12 flex items-center justify-center border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors"
            >
                <ChevronRight
                    className={cn(
                        'w-5 h-5 text-gray-400 transition-transform',
                        isCollapsed ? '' : 'rotate-180',
                    )}
                />
            </button>
        </aside>
    );
}
