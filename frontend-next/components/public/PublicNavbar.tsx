'use client';

import { useState, useEffect } from 'react';

export default function PublicNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-4 shadow-sm'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <button onClick={() => scrollToSection('hero')} className="text-xl font-bold text-slate-900 hover:text-primary transition-colors">
                        Sky<span className="text-primary">Board</span>
                    </button>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                    <button onClick={() => scrollToSection('hero')} className="px-4 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors">
                        Home
                    </button>
                    <button onClick={() => scrollToSection('about')} className="px-4 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors">
                        About
                    </button>
                    <button onClick={() => scrollToSection('info')} className="px-4 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors">
                        Facilities
                    </button>
                    <button onClick={() => scrollToSection('schedule')} className="px-4 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors">
                        Schedule
                    </button>
                    <button onClick={() => scrollToSection('contact')} className="px-4 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors">
                        Contact
                    </button>
                </div>
            </div>
        </nav>
    );
}
