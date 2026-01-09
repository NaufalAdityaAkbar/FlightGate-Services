import { ContentSection } from '../../lib/api/content';

export default function Hero({ content }: { content?: ContentSection }) {
    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Background Image from Admin */}
            {content?.image_path ? (
                <div className="absolute inset-0">
                    <img
                        src={`http://localhost:8000/storage/${content.image_path}`}
                        alt="Airport Hero"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay for text readability */}
                    <div className="absolute inset-0 hero-overlay"></div>
                </div>
            ) : (
                // Default gradient if no image
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600"></div>
            )}

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-4">
                <div className="max-w-5xl mx-auto text-center text-white fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/30">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                        <span>Welcome to Our Airport</span>
                    </div>

                    {/* Title - From Admin */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
                        {content?.title || 'Welcome to SkyBoard'}
                    </h1>

                    {/* Description - From Admin */}
                    <p className="text-lg md:text-2xl mb-10 text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                        {content?.content || 'Experience world-class service and seamless travel at your premier international gateway'}
                    </p>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="#schedule"
                            className="px-8 py-3 bg-white text-primary font-semibold rounded-md hover:bg-slate-100 transition-colors shadow-lg"
                        >
                            View Flight Schedule
                        </a>
                        <a
                            href="#about"
                            className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-md hover:bg-white/20 transition-colors border border-white/30"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
                <div className="flex flex-col items-center gap-2 text-white/80">
                    <span className="text-sm font-medium">Scroll Down</span>
                    <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
