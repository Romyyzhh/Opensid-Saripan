import { Head } from '@inertiajs/react';
import HeroSection from '@/components/sections/HeroSection';
import AboutDesa from '@/components/sections/AboutDesa';
import FeaturesSection from '@/components/sections/FeaturesSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';
import Navbar from '@/components/Navbar';

export default function HomePage() {
    return (
        <>
            <Head title="OpenSID Desa Saripan">
                <meta
                    name="description"
                    content="Sistem Informasi Desa Saripan - Portal resmi untuk informasi dan layanan desa"
                />
            </Head>

            <div className="min-h-screen bg-white">
                <Navbar />

                {/* Hero Section */}
                <HeroSection />

                {/* About Desa Section */}
                <AboutDesa />

                {/* Features Section */}
                <FeaturesSection />

                {/* News Section */}
                <NewsSection />

                {/* Contact Section */}
                <ContactSection />

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">
                                    OpenSID Desa Saripan
                                </h3>
                                <p className="text-gray-400">
                                    Sistem Informasi Desa yang modern dan
                                    terpadu untuk pelayanan masyarakat yang
                                    lebih baik.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Kontak</h4>
                                <div className="space-y-2 text-gray-400">
                                    <p>Kantor Desa Saripan</p>
                                    <p>Telp: (021) 12345678</p>
                                    <p>Email: info@desasaripan.id</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">
                                    Link Cepat
                                </h4>
                                <div className="space-y-2 text-gray-400">
                                    <a
                                        href="#"
                                        className="block hover:text-white transition-colors"
                                    >
                                        Tentang Desa
                                    </a>
                                    <a
                                        href="#"
                                        className="block hover:text-white transition-colors"
                                    >
                                        Layanan
                                    </a>
                                    <a
                                        href="#"
                                        className="block hover:text-white transition-colors"
                                    >
                                        Berita
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                            © 2026 OpenSID Desa Saripan. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
