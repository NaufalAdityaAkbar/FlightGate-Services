'use client';

import { useState, useEffect } from 'react';

const stats = [
    { label: 'Passengers Annually', value: 50000000, suffix: '+', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
    { label: 'Airlines Partners', value: 120, suffix: '+', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg> },
    { label: 'Destinations', value: 85, suffix: '', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a1 1 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { label: 'Customer Satisfaction', value: 98, suffix: '%', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> },
];

const contacts = [
    { label: 'Customer Service', value: '+62 21 550 5000', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
    { label: 'Email Support', value: 'info@skyboard.id', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { label: 'Emergency', value: '+62 21 550 5911', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
];

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function ContactStats() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in-up">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left: Contact Information */}
                <div className="space-y-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200 mb-4 font-semibold text-xs tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span>Direct Assistance</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Connect With Us
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
                            Professional support available 24/7 for all passenger inquiries and operational needs.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-1 gap-4">
                        {contacts.map((contact, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
                            >
                                <div className="text-primary bg-slate-50 p-3 rounded-xl scale-95 transition-transform group-hover:scale-100">
                                    {contact.icon}
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                                        {contact.label}
                                    </div>
                                    <div className="text-lg font-bold text-slate-800 tracking-tight">
                                        {contact.value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Statistics Container */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-2xl"></div>
                    <div className="relative grid grid-cols-2 gap-4 lg:gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/80 backdrop-blur-sm p-6 lg:p-10 rounded-[2.5rem] border border-white/50 shadow-sm hover:translate-y-[-4px] transition-transform duration-300"
                            >
                                <div className="text-primary/60 mb-4">{stat.icon}</div>
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-2 font-mono whitespace-nowrap overflow-hidden text-ellipsis">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 leading-tight">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
