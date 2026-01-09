import { ContentSection } from '../../lib/api/content';

export default function PublicFooter({ content }: { content?: ContentSection }) {
    return (
        <>
            <footer className="bg-primary text-white pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">SkyBoard Airport</h3>
                            <p className="text-blue-200 text-sm">
                                Providing real-time flight information and world-class airport services for your journey.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-blue-200 text-sm">
                                <li><a href="#" className="hover:text-white">Home</a></li>
                                <li><a href="#about" className="hover:text-white">About Us</a></li>
                                <li><a href="#schedule" className="hover:text-white">Flight Schedule</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Contact</h3>
                            <ul className="space-y-2 text-blue-200 text-sm">
                                <li>📞 +62 21 550 5000</li>
                                <li>📧 contact@skyboard.com</li>
                                <li>📍 Tangerang, Banten, Indonesia</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-300 text-sm">
                        &copy; {new Date().getFullYear()} SkyBoard Airport Management System. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Fixed Running Text Bar - Ultra Compact & High Contrast */}
            <div className="fixed bottom-0 left-0 w-full z-[60] bg-slate-950 border-t border-accent/30 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
                <div className="py-1.5 overflow-hidden whitespace-nowrap relative flex items-center">
                    {/* Sticky Badge Label */}
                    <div className="absolute left-0 top-0 bottom-0 z-30 flex items-center px-4 bg-slate-950 shadow-[15px_0_20px_rgba(2,6,23,1)]">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-accent rounded-sm">
                            <div className="w-1 h-1 rounded-full bg-slate-950 animate-ping"></div>
                            <span className="text-[9px] font-black text-slate-950 tracking-tighter uppercase">{content?.title || 'NEWS'}</span>
                        </div>
                    </div>

                    <div className="animate-marquee inline-block text-white font-bold text-[11px] uppercase tracking-[0.1em] opacity-90">
                        <span className="mx-6">{content?.content || 'Selamat datang di layanan informasi penerbangan kami. Mohon persiapkan dokumen perjalanan Anda.'}</span>
                        <span className="text-accent mx-10 opacity-50">•</span>
                        <span className="mx-6 font-medium normal-case italic opacity-70">{content?.content || 'Welcome to our flight information service. Please prepare your travel documents.'}</span>
                        <span className="text-accent mx-10 opacity-50">•</span>
                    </div>
                </div>
            </div>
        </>
    );
}
