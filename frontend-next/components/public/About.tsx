import { ContentSection } from '../../lib/api/content';

const timeline = [
    { year: '2015', title: 'Foundation', desc: 'Established' },
    { year: '2018', title: 'Expansion', desc: 'New Terminals' },
    { year: '2021', title: 'Innovation', desc: 'Smart Tech' },
    { year: '2024', title: 'Excellence', desc: 'Top Service' },
];

const features = [
    {
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>,
        title: 'Award Winning',
        desc: 'Best Airport 2023'
    },
    {
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
        title: 'World Class',
        desc: 'Global Standards'
    },
    {
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
        title: 'Safe & Secure',
        desc: 'Advanced Security'
    },
];

export default function About({ content }: { content?: ContentSection }) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 h-auto min-h-screen lg:h-full flex flex-col justify-center gap-12 overflow-hidden">
            {/* Upper Content: Text & Image */}
            <div className="grid lg:grid-cols-2 gap-10 items-center animate-fade-in-up">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="font-semibold text-xs tracking-wider uppercase">Airport Profile</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                        {content?.title || 'Gateway to the World'}
                    </h2>

                    <div className="w-12 h-1 bg-primary rounded-full"></div>

                    <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                        {content?.content || 'We are committed to providing world-class airport services with cutting-edge technology and exceptional customer care.'}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-white transition-all duration-300 group">
                            <div className="text-primary mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm mb-1">Our Mission</h4>
                            <p className="text-xs text-slate-500">Excellence in aviation</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-white transition-all duration-300 group">
                            <div className="text-primary mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm mb-1">Our Vision</h4>
                            <p className="text-xs text-slate-500">Regional Leader</p>
                        </div>
                    </div>
                </div>

                {/* Image Section - More Compact */}
                <div className="relative group perspective-1000 hidden lg:block">
                    <div className="relative h-[320px] w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 transform group-hover:rotate-y-2 group-hover:scale-[1.02]">
                        {content?.image_path ? (
                            <img
                                src={`http://localhost:8000/storage/${content.image_path}`}
                                alt="Airport"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                <svg className="w-20 h-20 text-slate-200" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                    </div>
                </div>
            </div>

            {/* Simple Grid for Timeline & Features */}
            <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Timeline */}
                <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Our Journey</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {timeline.map((item, index) => (
                            <div key={index} className="p-3 bg-white rounded-lg border border-slate-100 text-center hover:border-primary transition-colors duration-300">
                                <div className="text-primary font-bold text-lg leading-none mb-1">{item.year}</div>
                                <div className="text-[10px] text-slate-500 font-medium">{item.title}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Excellence</h3>
                    <div className="flex gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex-1 p-3 bg-white rounded-lg border border-slate-100 hover:shadow-sm transition-all duration-300">
                                <div className="text-primary mb-1 opacity-70 scale-90">{feature.icon}</div>
                                <h4 className="font-bold text-slate-800 text-xs mb-0.5">{feature.title}</h4>
                                <p className="text-[10px] text-slate-500 whitespace-nowrap">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
