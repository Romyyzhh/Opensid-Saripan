import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Alamat',
            content: 'Jl. Raya Desa Saripan, Kec. Bangsri, Kab. Jepara, Jawa Tengah 59453',
        },
        {
            icon: Phone,
            title: 'Telepon',
            content: '(0291) 123-4567',
        },
        {
            icon: Mail,
            title: 'Email',
            content: 'info@desasaripan.id',
        },
        {
            icon: Clock,
            title: 'Jam Pelayanan',
            content: 'Senin - Jumat: 08.00 - 15.00 WIB',
        },
    ];

    return (
        <section
            id="contact"
            ref={ref}
            className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                        <Mail className="w-4 h-4" />
                        Hubungi Kami
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Kontak Desa Saripan
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Kami siap melayani dan menjawab pertanyaan Anda
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Informasi Kontak
                            </h3>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <info.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">
                                                {info.title}
                                            </h4>
                                            <p className="text-gray-600">
                                                {info.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 rounded-2xl h-64 overflow-hidden shadow-lg">
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <MapPin className="w-12 h-12" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Kirim Pesan
                        </h3>
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Masukkan nama Anda"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="nama@email.com"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Subjek
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Perihal pesan Anda"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Pesan
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Tulis pesan Anda di sini..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Kirim Pesan
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
