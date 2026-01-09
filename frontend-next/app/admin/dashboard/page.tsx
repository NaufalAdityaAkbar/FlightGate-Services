'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { flightApi, Flight } from '../../../lib/api/flights';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function AdminDashboard() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Flight>>({});
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/admin/login');
            return;
        }
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const data = await flightApi.getAll();
            setFlights(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this flight?')) return;
        try {
            await flightApi.delete(id);
            fetchFlights();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await flightApi.update(isEditing, formData);
            } else {
                await flightApi.create(formData);
            }
            setShowForm(false);
            setIsEditing(null);
            setFormData({});
            fetchFlights();
        } catch (err) {
            alert('Failed to save');
        }
    };

    const startEdit = (flight: Flight) => {
        setFormData(flight);
        setIsEditing(flight.id);
        setShowForm(true);
    };

    const startNew = () => {
        setFormData({
            status: 'SESUAI JADWAL',
            scheduled_time: '12:00'
        });
        setIsEditing(null);
        setShowForm(true);
    }

    const stats = [
        { label: 'Total Flights', value: flights.length, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>, color: 'bg-primary/10 text-primary' },
        { label: 'Delayed', value: flights.filter(f => f.status === 'TERLAMBAT').length, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'bg-red-100 text-red-600' },
        { label: 'Boarding', value: flights.filter(f => f.status === 'BOARDING').length, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>, color: 'bg-emerald-100 text-emerald-600' },
    ];

    if (loading) return (
        <AdminLayout>
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        </AdminLayout>
    );

    return (
        <AdminLayout>
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Flight Schedules</h1>
                    <p className="text-slate-500 font-medium">Manage and update real-time flight information</p>
                </div>
                <button
                    onClick={startNew}
                    className="btn btn-primary px-8 py-3 rounded-2xl shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    New Flight
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{stat.label}</div>
                            <div className="text-2xl font-black text-slate-800 font-mono">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Overlay/Section */}
            {showForm && (
                <div className="mb-10 animate-fade-in-up">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
                        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">{isEditing ? 'Update Flight Info' : 'Schedule New Flight'}</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Airline</label>
                                    <input placeholder="Garuda Indonesia" className="input-field rounded-xl" value={formData.airline || ''} onChange={e => setFormData({ ...formData, airline: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Flight Code</label>
                                    <input placeholder="GA-123" className="input-field rounded-xl font-mono" value={formData.flight_code || ''} onChange={e => setFormData({ ...formData, flight_code: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Destination</label>
                                    <input placeholder="Singapore (SIN)" className="input-field rounded-xl" value={formData.destination || ''} onChange={e => setFormData({ ...formData, destination: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Gate</label>
                                    <input placeholder="Gate A1" className="input-field rounded-xl" value={formData.gate || ''} onChange={e => setFormData({ ...formData, gate: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Departure Time</label>
                                    <input type="time" className="input-field rounded-xl" value={formData.scheduled_time?.slice(0, 5) || ''} onChange={e => setFormData({ ...formData, scheduled_time: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Current Status</label>
                                    <select className="input-field rounded-xl" value={formData.status || 'SESUAI JADWAL'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                        <option value="SESUAI JADWAL">SESUAI JADWAL</option>
                                        <option value="TERLAMBAT">TERLAMBAT</option>
                                        <option value="BOARDING">BOARDING</option>
                                        <option value="GATE DITUTUP">GATE DITUTUP</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4 justify-end mt-10">
                                <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors">Discard</button>
                                <button type="submit" className="btn btn-primary px-10 py-3 rounded-xl shadow-lg shadow-primary/20">
                                    {isEditing ? 'Update Flight' : 'Create Flight'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Table Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-10">Scheduled</th>
                                <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Flight</th>
                                <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Destination</th>
                                <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Gate</th>
                                <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right pr-10">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {flights.map((flight) => (
                                <tr key={flight.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="p-6 pl-10">
                                        <div className="text-primary font-black font-mono text-lg">{flight.scheduled_time.slice(0, 5)}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="font-bold text-slate-800">{flight.airline}</div>
                                        <div className="text-xs text-slate-400 font-mono tracking-wider">{flight.flight_code}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="font-bold text-slate-700">{flight.destination}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                                            {flight.gate}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${flight.status === 'TERLAMBAT' ? 'bg-red-50 text-red-600 ring-1 ring-red-100' :
                                                flight.status === 'BOARDING' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100' :
                                                    'bg-blue-50 text-blue-600 ring-1 ring-blue-100'
                                            }`}>
                                            <span className={`w-1 h-1 rounded-full mr-1.5 ${flight.status === 'TERLAMBAT' ? 'bg-red-600' :
                                                    flight.status === 'BOARDING' ? 'bg-emerald-600' :
                                                        'bg-blue-600'
                                                }`}></span>
                                            {flight.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right pr-10 space-x-3">
                                        <button
                                            onClick={() => startEdit(flight)}
                                            className="p-2 text-slate-300 hover:text-primary hover:bg-white rounded-lg transition-all"
                                            title="Edit Flight"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(flight.id)}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                                            title="Delete Flight"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {flights.length === 0 && (
                        <div className="p-20 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            </div>
                            <h3 className="text-slate-900 font-bold">No Flights Found</h3>
                            <p className="text-slate-400 text-sm">Start by adding your first flight schedule.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
