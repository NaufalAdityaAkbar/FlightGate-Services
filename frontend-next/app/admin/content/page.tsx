'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { contentApi, ContentSection } from '../../../lib/api/content';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function ContentManager() {
    const [contents, setContents] = useState<Record<string, ContentSection>>({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const data = await contentApi.getAll();
            setContents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent, key: string) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/admin/login');
            return;
        }

        try {
            await contentApi.update(key, formData);
            alert('Settings Saved Successfully!');
            fetchContent();
        } catch (err) {
            alert('Failed to update');
            console.error(err);
        }
    };

    if (loading) return (
        <AdminLayout>
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        </AdminLayout>
    );

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Public Content</h1>
                    <p className="text-slate-500 font-medium">Configure landing page hero, about, and footer messages.</p>
                </div>
            </div>

            <div className="grid gap-10">
                {/* Hero Section */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-fade-in-up">
                    <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Hero Section</h2>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Top Banner</span>
                    </div>
                    <form onSubmit={(e) => handleUpdate(e, 'hero')} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Main Headline</label>
                                <input name="title" defaultValue={contents.hero?.title} className="input-field rounded-xl" placeholder="e.g. Welcome to Terminal 3" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Subheadline / Description</label>
                                <textarea name="content" defaultValue={contents.hero?.content} className="input-field rounded-xl h-24" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Background Image</label>
                                <div className="flex items-center gap-4">
                                    <input type="file" name="image" className="input-field rounded-xl p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all" accept="image/*" />
                                    {contents.hero?.image_path && (
                                        <div className="text-[10px] text-slate-400 font-medium italic truncate max-w-[200px]">Active: {contents.hero.image_path}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" className="btn btn-primary px-10 py-3 rounded-xl shadow-lg shadow-primary/20">Apply Hero Updates</button>
                        </div>
                    </form>
                </div>

                {/* About Section */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">About Section</h2>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Story & Vision</span>
                    </div>
                    <form onSubmit={(e) => handleUpdate(e, 'about')} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Section Title</label>
                                <input name="title" defaultValue={contents.about?.title} className="input-field rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Detailed Narrative</label>
                                <textarea name="content" defaultValue={contents.about?.content} className="input-field rounded-xl h-40" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Profile Image</label>
                                <div className="flex items-center gap-4">
                                    <input type="file" name="image" className="input-field rounded-xl p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 transition-all" accept="image/*" />
                                    {contents.about?.image_path && (
                                        <div className="text-[10px] text-slate-400 font-medium italic truncate max-w-[200px]">Active: {contents.about.image_path}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" className="btn btn-secondary px-10 py-3 rounded-xl border-secondary text-secondary hover:bg-secondary/5 shadow-lg shadow-secondary/10">Apply About Updates</button>
                        </div>
                    </form>
                </div>

                {/* Running Text Section */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Running Announcement</h2>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Footer Marquee</span>
                    </div>
                    <form onSubmit={(e) => handleUpdate(e, 'running_text')} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Badge Text</label>
                                <input name="title" defaultValue={contents.running_text?.title} className="input-field rounded-xl" placeholder="e.g. ANNOUNCEMENT" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Scrolling Message</label>
                                <input name="content" defaultValue={contents.running_text?.content} className="input-field rounded-xl" placeholder="Type your message here..." />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" className="btn btn-accent px-10 py-3 rounded-xl shadow-lg shadow-accent/20">Apply Marquee Updates</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
