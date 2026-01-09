'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authApi } from '../../lib/api/auth';

const menuItems = [
    {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
    },
    {
        name: 'Hero & About',
        path: '/admin/content',
        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
    },
    {
        name: 'Info Sections',
        path: '/admin/info-sections',
        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
        name: 'Public Site',
        path: '/',
        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
        external: true
    },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await authApi.logout();
        } catch (e) { }
        localStorage.removeItem('token');
        router.push('/admin/login');
    };

    const isActive = (path: string) => {
        if (path === '/') return false;
        return pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans relative">
            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-50
                ${sidebarOpen ? 'w-72' : 'w-20'} 
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                flex flex-col
            `}>
                <div className="h-20 flex items-center px-6 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </div>
                        {sidebarOpen && (
                            <div className="animate-fade-in whitespace-nowrap">
                                <div className="font-black text-slate-800 tracking-tight text-lg">SkyBoard</div>
                                <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] -mt-1">Management</div>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto scrollbar-hide">
                    {menuItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                target={item.external ? '_blank' : undefined}
                                className={`flex items-center p-3.5 rounded-2xl transition-all group relative ${active
                                        ? 'bg-primary text-white shadow-xl shadow-primary/20'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-primary'} transition-colors shrink-0`}>
                                    {item.icon}
                                </span>
                                {sidebarOpen && (
                                    <span className="ml-3 font-bold text-sm tracking-tight">{item.name}</span>
                                )}
                                {active && sidebarOpen && (
                                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center p-3.5 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all group"
                    >
                        <span className="text-slate-400 group-hover:text-red-500 transition-colors shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        </span>
                        {sidebarOpen && <span className="ml-3 font-bold text-sm tracking-tight">Sign Out</span>}
                    </button>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="hidden lg:flex w-full items-center p-2 rounded-xl text-slate-300 hover:text-slate-500 transition-all justify-center"
                        title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
                    >
                        {sidebarOpen ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col min-w-0">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </button>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] hidden sm:block">
                            System / <span className="text-primary">{menuItems.find(i => isActive(i.path))?.name || 'Admin'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end hidden sm:flex text-right">
                            <span className="text-sm font-black text-slate-800 leading-none">Super Admin</span>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Online</span>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs shadow-inner">
                            AD
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-10 max-w-[1600px] w-full mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
