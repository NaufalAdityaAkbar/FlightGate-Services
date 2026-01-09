'use client';

import { useState } from 'react';
import { Flight } from '../../lib/api/flights';

export default function FlightBoard({ flights }: { flights: Flight[] }) {
    const [search, setSearch] = useState('');

    const filteredFlights = flights.filter(f =>
        f.airline.toLowerCase().includes(search.toLowerCase()) ||
        f.flight_code.toLowerCase().includes(search.toLowerCase()) ||
        f.destination.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status.toUpperCase()) {
            case 'TERLAMBAT': return 'bg-red-50 text-red-700 border border-red-200';
            case 'GATE DITUTUP': return 'bg-amber-50 text-amber-700 border border-amber-200';
            case 'BOARDING': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
            case 'SESUAI JADWAL': return 'bg-sky-50 text-sky-700 border border-sky-200';
            default: return 'bg-slate-50 text-slate-700 border border-slate-200';
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-primary rounded-full border border-sky-200 mb-4">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span className="font-semibold text-sm">Live Departures</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    Flight Schedule
                </h2>
                <p className="text-slate-600 text-base">Real-time flight information</p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6 w-full">
                <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by airline, flight code, or destination..."
                        className="w-full pl-12 pr-6 py-3.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-base outline-none transition-all bg-white text-slate-900 placeholder-slate-400 shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Flight Table Container */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
                <table className="w-full text-left">
                    <thead className="bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold sticky top-0 z-10">
                        <tr>
                            <th className="p-4 md:p-5">Time</th>
                            <th className="p-4 md:p-5">Flight</th>
                            <th className="p-4 md:p-5">Destination</th>
                            <th className="p-4 md:p-5 hidden md:table-cell">Gate</th>
                            <th className="p-4 md:p-5 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredFlights.map((flight) => (
                            <tr key={flight.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 md:p-5">
                                    <div className="font-mono text-2xl font-bold text-primary">
                                        {flight.scheduled_time.slice(0, 5)}
                                    </div>
                                </td>
                                <td className="p-4 md:p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center text-base font-bold text-primary border border-sky-200">
                                            {flight.airline.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">{flight.airline}</div>
                                            <div className="text-sm text-slate-500 font-mono">{flight.flight_code}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 md:p-5">
                                    <div className="font-semibold text-slate-800 text-lg">{flight.destination}</div>
                                </td>
                                <td className="p-4 md:p-5 hidden md:table-cell">
                                    <div className="inline-block px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-200 font-mono font-bold text-indigo-700">
                                        {flight.gate}
                                    </div>
                                </td>
                                <td className="p-4 md:p-5 text-right">
                                    <span className={`inline-block px-4 py-2 rounded-lg font-semibold text-sm ${getStatusColor(flight.status)}`}>
                                        {flight.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filteredFlights.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-slate-400">
                                    <svg className="w-16 h-16 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    No flights found for "{search}".
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
