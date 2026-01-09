'use client';

interface InfoSection {
    id: number;
    title: string;
    content: string;
    image_path?: string;
    position: 'left' | 'right';
}

interface InfoSectionsProps {
    sections: InfoSection[];
}

export default function InfoSections({ sections }: InfoSectionsProps) {
    if (!sections || sections.length === 0) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in-up">
                <p className="text-slate-400 text-lg font-medium">No information sections available</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
            {sections.map((section, index) => {
                const isImageLeft = section.position === 'left';

                return (
                    <div
                        key={section.id || index}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.15}s` }}
                    >
                        <div className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>

                            {/* Image Side */}
                            <div className="w-full lg:w-1/2 group perspective-1000">
                                <div className="relative w-full h-[350px] lg:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 transform group-hover:scale-[1.01] border-8 border-white">
                                    {section.image_path ? (
                                        <img
                                            src={`http://localhost:8000/storage/${section.image_path}`}
                                            alt={section.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                                            <svg className="w-24 h-24 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent"></div>
                                </div>
                            </div>

                            {/* Text/Info Side */}
                            <div className="w-full lg:w-1/2 space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase border border-slate-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                    <span>Division {index + 1}</span>
                                </div>

                                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                                    {section.title}
                                </h3>

                                <div className="w-16 h-1.5 bg-primary rounded-full"></div>

                                <div className="text-lg text-slate-500 leading-relaxed font-medium">
                                    {section.content.split('\n').map((paragraph, i) => (
                                        paragraph.trim() && <p key={i} className="mb-4">{paragraph}</p>
                                    ))}
                                </div>

                                <div className="pt-4">
                                    <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                                        LEARN MORE
                                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}
