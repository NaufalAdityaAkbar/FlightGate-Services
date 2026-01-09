'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { infoSectionApi } from '../../../lib/api/infoSections';
import AdminLayout from '../../../components/layout/AdminLayout';

interface InfoSection {
    id: number;
    title: string;
    content: string;
    image_path?: string;
    position: 'left' | 'right';
    order: number;
    is_active: boolean;
}

export default function InfoSectionsManager() {
    const [sections, setSections] = useState<InfoSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const data = await infoSectionApi.getAll();
            setSections(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent, id?: number) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            if (id) {
                await infoSectionApi.update(id, formData);
                setEditing(null);
            } else {
                await infoSectionApi.create(formData);
                setShowForm(false);
            }
            fetchSections();
            form.reset();
        } catch (err) {
            alert('Failed to save');
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this section?')) return;
        try {
            await infoSectionApi.delete(id);
            fetchSections();
        } catch (err) {
            alert('Failed to delete');
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
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Info Sections</h1>
                    <p className="text-slate-500 font-medium">Manage facility highlights on the homepage</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn btn-primary px-8 py-3 rounded-2xl shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Section
                    </button>
                )}
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="mb-12 animate-fade-in-up">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
                        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">New Info Section</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                    <input name="title" className="input-field rounded-xl" placeholder="e.g. VIP Lounge" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Layout Orientation</label>
                                    <select name="position" className="input-field rounded-xl" required>
                                        <option value="left">🖼️ Image Left | Text Right</option>
                                        <option value="right">🖼️ Image Right | Text Left</option>
                                    </select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Content</label>
                                    <textarea name="content" className="input-field rounded-xl h-32" placeholder="Description of the facility..." required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Upload Image</label>
                                    <input type="file" name="image" className="input-field rounded-xl p-2" accept="image/*" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Order</label>
                                    <input type="number" name="order" className="input-field rounded-xl" defaultValue={0} />
                                </div>
                            </div>
                            <div className="flex gap-4 justify-end mt-4">
                                <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors">Discard</button>
                                <button type="submit" className="btn btn-primary px-10 py-3 rounded-xl shadow-lg shadow-primary/20">Create Section</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* List of Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {sections.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-20 text-center lg:col-span-2">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-slate-900 font-bold">No Sections Created</h3>
                        <p className="text-slate-400 text-sm">Add information about airport facilities to display them on the landing page.</p>
                    </div>
                ) : (
                    sections.map((section, idx) => (
                        <div key={section.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                            {editing === section.id ? (
                                <form onSubmit={(e) => handleSubmit(e, section.id)} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Title</label>
                                            <input name="title" defaultValue={section.title} className="input-field rounded-xl" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Layout Orientation</label>
                                            <select name="position" defaultValue={section.position} className="input-field rounded-xl">
                                                <option value="left">🖼️ Image on Left</option>
                                                <option value="right">🖼️ Image on Right</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Content</label>
                                            <textarea name="content" defaultValue={section.content} className="input-field rounded-xl h-32" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Update Image</label>
                                            <input type="file" name="image" className="input-field rounded-xl" accept="image/*" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Order</label>
                                            <input type="number" name="order" defaultValue={section.order} className="input-field rounded-xl" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button type="submit" className="btn btn-primary px-6 py-2 rounded-xl text-xs uppercase font-black">Save Changes</button>
                                        <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 text-slate-400 font-bold text-xs uppercase">Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="space-y-1">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black tracking-widest uppercase">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                                Order {section.order}
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 tracking-tight">{section.title}</h3>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setEditing(section.id)} className="p-2 text-slate-300 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(section.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-slate-50 rounded-xl transition-all">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="relative flex-grow group mb-6">
                                        {section.image_path ? (
                                            <img
                                                src={`http://localhost:8000/storage/${section.image_path}`}
                                                alt={section.title}
                                                className="w-full h-48 object-cover rounded-[1.5rem] border border-slate-100 group-hover:shadow-md transition-shadow"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-200">
                                                No image uploaded
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-slate-600 shadow-sm">
                                            {section.position === 'left' ? 'IMG LEFT' : 'IMG RIGHT'}
                                        </div>
                                    </div>

                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
                                        {section.content}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}
