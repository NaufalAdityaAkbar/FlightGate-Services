'use client';

import { useState, useEffect } from 'react';

interface Section {
    id: string;
    label: string;
}

const sections: Section[] = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'info', label: 'Facilities' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'contact', label: 'Contact' },
];

export default function ScrollIndicator() {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const observerOptions = {
            root: null, // use the viewport
            rootMargin: '-45% 0px -45% 0px', // trigger when section is in the middle of the screen
            threshold: 0
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
            {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group relative"
                    aria-label={`Go to ${section.label}`}
                >
                    <div
                        className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === section.id
                            ? 'bg-primary border-primary scale-150 shadow-lg'
                            : 'bg-white border-slate-400 hover:border-primary hover:scale-125'
                            }`}
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                        {section.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
