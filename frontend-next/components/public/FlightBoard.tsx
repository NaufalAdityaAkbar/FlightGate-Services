'use client';

import { useState, useMemo } from 'react';
import { Flight } from '../../lib/api/flights';

export default function FlightBoard({ flights }: { flights: Flight[] }) {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<'DEPARTURE' | 'ARRIVAL'>('DEPARTURE');
    const [terminalFilter, setTerminalFilter] = useState('ALL');
    const [selectedGate, setSelectedGate] = useState('ALL');
    const [showCompleted, setShowCompleted] = useState(false);

    // Derived Data: Terminals list from flights data
    const terminals = useMemo(() => {
        const uniqueTerminals = Array.from(new Set(flights.map(f => f.terminal))).sort();
        return ['ALL', ...uniqueTerminals];
    }, [flights]);

    // Highlighting Helper
    const highlightText = (text: string, query: string) => {
        if (!query.trim()) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={i} className="bg-primary/20 text-primary px-0.5 rounded-sm font-black ring-1 ring-primary/10">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    // Derived Data: Gate Pills with Counts
    const gateData = useMemo(() => {
        const counts: Record<string, number> = {};
        flights.filter(f => f.type === activeTab && (terminalFilter === 'ALL' || f.terminal === terminalFilter))
            .forEach(f => {
                counts[f.gate] = (counts[f.gate] || 0) + 1;
            });
        return counts;
    }, [flights, activeTab, terminalFilter]);

    const availableGates = ['ALL', ...Object.keys(gateData).sort()];

    // Core Filtering Logic
    const filteredFlights = useMemo(() => {
        let result = flights.filter(f => {
            const matchesType = f.type === activeTab;
            const matchesTerminal = terminalFilter === 'ALL' || f.terminal === terminalFilter;
            const matchesGate = selectedGate === 'ALL' || f.gate === selectedGate;
            const matchesSearch = f.airline.toLowerCase().includes(search.toLowerCase()) ||
                f.flight_code.toLowerCase().includes(search.toLowerCase()) ||
                f.destination.toLowerCase().includes(search.toLowerCase());

            // Status Logic: Filter out "Selesai/Landed/Departed" if showCompleted is false
            const isCompleted = ['LANDED', 'SUDAH BERANGKAT', 'SELESAI'].includes(f.status.toUpperCase());
            const matchesStatus = showCompleted ? true : !isCompleted;

            return matchesType && matchesTerminal && matchesGate && matchesSearch && matchesStatus;
        });

        // Sorting Logic
        return result.sort((a, b) => {
            const priorityStatus = ['TERLAMBAT', 'EMERGENCY', 'DARURAT'];
            const aPriority = priorityStatus.includes(a.status.toUpperCase()) ? 0 : 1;
            const bPriority = priorityStatus.includes(b.status.toUpperCase()) ? 0 : 1;

            if (aPriority !== bPriority) return aPriority - bPriority;

            // Then by time
            return a.scheduled_time.localeCompare(b.scheduled_time);
        });
    }, [flights, activeTab, terminalFilter, selectedGate, search, showCompleted]);

    const getStatusColor = (status: string) => {
        const s = status.toUpperCase();
        if (s === 'TERLAMBAT' || s === 'EMERGENCY') return 'bg-red-50 text-red-700 border border-red-200 shadow-[0_0_15px_rgba(239,68,68,0.1)]';
        if (s === 'GATE DITUTUP' || s === 'LAST CALL') return 'bg-amber-50 text-amber-700 border border-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.1)]';
        if (s === 'BOARDING') return 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.1)]';
        if (s === 'SESUAI JADWAL' || s === 'ON TIME') return 'bg-sky-50 text-sky-700 border border-sky-200';
        return 'bg-slate-50 text-slate-700 border border-slate-200';
    };

    return (
        <div className="w-full h-full flex flex-col justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 fade-in">
            {/* Main Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-6 group cursor-pointer hover:border-primary/30 transition-all">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                    <span className="font-bold text-xs uppercase tracking-[3px] text-slate-400 group-hover:text-primary transition-colors">
                        Soekarno-Hatta Live Information
                    </span>
                    <span className="ml-4 pl-4 border-l border-slate-200 text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live Syncing
                    </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter">
                    Flight <span className="text-primary italic">Updates</span>
                </h2>
                <p className="text-slate-500 text-sm font-black uppercase tracking-[0.4em] mb-4">
                    Multi-Gate Transit Information System (TIDS)
                </p>
                <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto mb-10">
                    Integrated real-time control for multi-gate environments and consolidated transit schedules.
                </p>

                {/* Poin Penting (Quick Highlights) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 flex items-center gap-4 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5 group">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div className="text-left">
                            <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">Live Sync</h4>
                            <p className="text-xs text-slate-400 font-bold uppercase">Updated every 5s</p>
                        </div>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 flex items-center gap-4 transition-all hover:bg-white hover:shadow-xl hover:shadow-blue/5 group">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <div className="text-left">
                            <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">Multi-Terminal</h4>
                            <p className="text-xs text-slate-400 font-bold uppercase">All Hubs (T1-T4)</p>
                        </div>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 flex items-center gap-4 transition-all hover:bg-white hover:shadow-xl hover:shadow-red/5 group">
                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <div className="text-left">
                            <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">Priority Info</h4>
                            <p className="text-xs text-slate-400 font-bold uppercase">Emergency Pinned</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Selection Controls */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-2 mb-6 flex flex-col md:flex-row gap-4 items-center ring-8 ring-slate-50">
                <div className="flex bg-slate-100 p-1.5 rounded-[1.5rem] w-full md:w-auto">
                    {(['DEPARTURE', 'ARRIVAL'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setSelectedGate('ALL');
                            }}
                            className={`flex-1 md:flex-none px-10 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab
                                ? 'bg-white text-primary shadow-lg shadow-primary/10'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}S
                        </button>
                    ))}
                </div>

                <div className="relative flex-grow w-full">
                    <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search airline, flight, or destination..."
                        className="w-full pl-14 pr-6 py-4.5 rounded-[1.5rem] bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 text-slate-900 font-medium placeholder-slate-300 outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 p-1.5 w-full md:w-auto overflow-x-auto no-scrollbar">
                    {terminals.map((t) => (
                        <button
                            key={t}
                            onClick={() => {
                                setTerminalFilter(t);
                                setSelectedGate('ALL');
                            }}
                            className={`whitespace-nowrap px-6 py-3.5 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all border-2 ${terminalFilter === t
                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                                }`}
                        >
                            {t === 'ALL' ? 'All Terminals' : t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick-Access Gate Pills & Toggle */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 px-2">
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2 whitespace-nowrap">Gate Filter:</span>
                    {availableGates.map((gate) => (
                        <button
                            key={gate}
                            onClick={() => setSelectedGate(gate)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-extrabold transition-all border-2 ${selectedGate === gate
                                ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 scale-105'
                                : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                                }`}
                        >
                            {gate}
                            {gate !== 'ALL' && (
                                <span className={`px-2 py-0.5 rounded-full text-[9px] ${selectedGate === gate ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    {gateData[gate]}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm whitespace-nowrap">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Show History</span>
                    <button
                        onClick={() => setShowCompleted(!showCompleted)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-2 ring-transparent ring-offset-2 ${showCompleted ? 'bg-primary' : 'bg-slate-200'}`}
                    >
                        <span className={`${showCompleted ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                    </button>
                </div>
            </div>

            {/* Flight Table Card */}
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-100 ring-[12px] ring-white/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] pl-12">Time</th>
                                <th className="p-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Flight Info</th>
                                <th className="p-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Origin / Dest</th>
                                <th className="p-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Gate & Terminal</th>
                                {activeTab === 'DEPARTURE' && (
                                    <th className="p-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Check-In</th>
                                )}
                                <th className="p-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right pr-12">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredFlights.map((flight) => (
                                <tr key={flight.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                    <td className="p-8 pl-12">
                                        <div className="text-3xl font-black text-primary font-mono tracking-tighter group-hover:scale-110 transition-transform origin-left">
                                            {flight.scheduled_time.slice(0, 5)}
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-lg font-black text-primary ring-4 ring-slate-50 group-hover:ring-primary/5 transition-all">
                                                {flight.airline.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-lg uppercase tracking-tight">
                                                    {highlightText(flight.airline, search)}
                                                </div>
                                                <div className="text-xs text-slate-400 font-bold font-mono tracking-widest">
                                                    {highlightText(flight.flight_code, search)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="font-extrabold text-slate-800 text-xl tracking-tight">
                                            {highlightText(flight.destination, search)}
                                        </div>
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{activeTab === 'DEPARTURE' ? 'Destination' : 'Origin'}</div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-5 py-2.5 rounded-xl font-mono font-black text-base shadow-lg transition-all ${selectedGate === flight.gate ? 'bg-primary text-white shadow-primary/20' : 'bg-slate-900 text-white shadow-slate-900/10'}`}>
                                                {flight.gate}
                                            </span>
                                            <span className="px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-black text-sm border border-primary/10">
                                                {flight.terminal}
                                            </span>
                                        </div>
                                    </td>
                                    {activeTab === 'DEPARTURE' && (
                                        <td className="p-8">
                                            <div className="text-slate-600 font-bold text-sm bg-slate-50 inline-block px-4 py-2 rounded-lg border border-slate-100">
                                                {flight.check_in_counter || '---'}
                                            </div>
                                        </td>
                                    )}
                                    <td className="p-8 text-right pr-12">
                                        <div className={`inline-flex flex-col items-end gap-1 px-6 py-3 rounded-2xl ${getStatusColor(flight.status)}`}>
                                            <span className="font-black text-xs uppercase tracking-widest">{flight.status}</span>
                                            {flight.remarks && (
                                                <span className="text-[10px] font-bold opacity-80 italic tracking-wide">{flight.remarks}</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredFlights.length === 0 && (
                                <tr>
                                    <td colSpan={activeTab === 'DEPARTURE' ? 6 : 5} className="p-24 text-center">
                                        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-200">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-2">No Flights Detected</h3>
                                        <p className="text-slate-400 font-medium">Clear your filters or search criteria to see more results.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
