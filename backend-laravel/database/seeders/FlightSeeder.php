<?php

namespace Database\Seeders;

use App\Models\Flight;
use Illuminate\Database\Seeder;

class FlightSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $flights = [
            // --- TERMINAL 1 (5 Flights) ---
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '15:30',
                'airline' => 'MedEvac Indonesia',
                'flight_code' => 'MED-01',
                'destination' => 'Singapore (SIN) - Emergency',
                'gate' => 'GATE 0',
                'terminal' => 'T1',
                'status' => 'EMERGENCY',
                'remarks' => 'PRIORITY CLEARANCE'
            ],
            [
                'type' => 'ARRIVAL',
                'scheduled_time' => '05:00',
                'airline' => 'Citilink',
                'flight_code' => 'QG 900',
                'destination' => 'Medan (KNO)',
                'gate' => 'E4',
                'terminal' => 'T1',
                'status' => 'LANDED'
            ],
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '07:30',
                'airline' => 'Lion Air',
                'flight_code' => 'JT 123',
                'destination' => 'Surabaya (SUB)',
                'gate' => 'A1',
                'terminal' => 'T1',
                'check_in_counter' => 'A1-A5',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'type' => 'ARRIVAL',
                'scheduled_time' => '08:15',
                'airline' => 'Batik Air',
                'flight_code' => 'ID 456',
                'destination' => 'Yogyakarta (YIA)',
                'gate' => 'A2',
                'terminal' => 'T1',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '10:45',
                'airline' => 'Sriwijaya Air',
                'flight_code' => 'SJ 789',
                'destination' => 'Pontianak (PNK)',
                'gate' => 'A3',
                'terminal' => 'T1',
                'check_in_counter' => 'B1-B4',
                'status' => 'TERLAMBAT',
                'remarks' => 'Technical Check'
            ],

            // --- TERMINAL 2 (5 Flights) ---
            [
                'type' => 'ARRIVAL',
                'scheduled_time' => '08:45',
                'airline' => 'Lion Air',
                'flight_code' => 'JT 234',
                'destination' => 'Denpasar (DPS)',
                'gate' => 'C15',
                'terminal' => 'T2',
                'status' => 'SESUAI JADWAL',
                'remarks' => 'Descending'
            ],
            [
                'type' => 'ARRIVAL',
                'scheduled_time' => '09:30',
                'airline' => 'Batik Air',
                'flight_code' => 'ID 678',
                'destination' => 'Surabaya (SUB)',
                'gate' => 'D2',
                'terminal' => 'T2',
                'status' => 'SESUAI JADWAL',
                'remarks' => 'Approaching'
            ],
            [
                'type' => 'ARRIVAL',
                'scheduled_time' => '10:05',
                'airline' => 'AirAsia',
                'flight_code' => 'AK 456',
                'destination' => 'Kuala Lumpur (KUL)',
                'gate' => 'C15',
                'terminal' => 'T2',
                'status' => 'TERLAMBAT',
                'remarks' => 'Weather Issue'
            ],
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '11:00',
                'airline' => 'Scoot',
                'flight_code' => 'TR 278',
                'destination' => 'Singapore (SIN)',
                'gate' => 'E1',
                'terminal' => 'T2',
                'check_in_counter' => 'E1-E10',
                'status' => 'BOARDING'
            ],
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '13:20',
                'airline' => 'Jetstar Asia',
                'flight_code' => '3K 201',
                'destination' => 'Singapore (SIN)',
                'gate' => 'E2',
                'terminal' => 'T2',
                'check_in_counter' => 'E11-E15',
                'status' => 'SESUAI JADWAL'
            ],

            // --- TERMINAL 3 (5 Flights) ---
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '05:30',
                'airline' => 'Garuda Indonesia',
                'flight_code' => 'GA 720',
                'destination' => 'London (LHR)',
                'gate' => 'A12',
                'terminal' => 'T3',
                'check_in_counter' => 'C1-C10',
                'status' => 'TERLAMBAT',
                'remarks' => 'Delayed 45m'
            ],
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '08:00',
                'airline' => 'Singapore Airlines',
                'flight_code' => 'SQ 965',
                'destination' => 'Singapore (SIN)',
                'gate' => 'B7',
                'terminal' => 'T3',
                'check_in_counter' => 'D11-D20',
                'status' => 'GATE DITUTUP',
                'remarks' => 'Gate Closed'
            ],
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '09:00',
                'airline' => 'Cathay Pacific',
                'flight_code' => 'CX 785',
                'destination' => 'Hong Kong (HKG)',
                'gate' => 'B3',
                'terminal' => 'T3',
                'check_in_counter' => 'A5-A15',
                'status' => 'BOARDING',
                'remarks' => 'Last Call'
            ],
            [
                'type' => 'ARRIVAL',
                'scheduled_time' => '06:00',
                'airline' => 'Japan Airlines',
                'flight_code' => 'JL 729',
                'destination' => 'Tokyo (HND)',
                'gate' => 'C2',
                'terminal' => 'T3',
                'status' => 'LANDED',
                'remarks' => 'Arrival Completed'
            ],
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '23:15',
                'airline' => 'Qatar Airways',
                'flight_code' => 'QR 959',
                'destination' => 'Doha (DOH)',
                'gate' => 'A6',
                'terminal' => 'T3',
                'check_in_counter' => 'F1-F12',
                'status' => 'SESUAI JADWAL'
            ],

            // --- TERMINAL 4 (5 Flights) ---
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '06:45',
                'airline' => 'Qantas',
                'flight_code' => 'QF 42',
                'destination' => 'Sydney (SYD)',
                'gate' => 'G1',
                'terminal' => 'T4',
                'check_in_counter' => 'J1-J5',
                'status' => 'SUDAH BERANGKAT'
            ],
            [
                'type' => 'ARRIVAL',
                'scheduled_time' => '09:50',
                'airline' => 'Korean Air',
                'flight_code' => 'KE 627',
                'destination' => 'Seoul (ICN)',
                'gate' => 'G5',
                'terminal' => 'T4',
                'status' => 'SESUAI JADWAL',
                'remarks' => 'On Time'
            ],
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '12:10',
                'airline' => 'KLM Royal Dutch',
                'flight_code' => 'KL 810',
                'destination' => 'Amsterdam (AMS)',
                'gate' => 'H2',
                'terminal' => 'T4',
                'check_in_counter' => 'K1-K10',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'type' => 'ARRIVAL',
                'scheduled_time' => '14:30',
                'airline' => 'Lufthansa',
                'flight_code' => 'LH 778',
                'destination' => 'Frankfurt (FRA)',
                'gate' => 'H4',
                'terminal' => 'T4',
                'status' => 'TERLAMBAT',
                'remarks' => 'Delayed 20m'
            ],
            [
                'type' => 'DEPARTURE',
                'scheduled_time' => '16:00',
                'airline' => 'Etihad Airways',
                'flight_code' => 'EY 475',
                'destination' => 'Abu Dhabi (AUH)',
                'gate' => 'G3',
                'terminal' => 'T4',
                'check_in_counter' => 'L1-L8',
                'status' => 'SESUAI JADWAL'
            ]
        ];

        Flight::truncate();
        foreach ($flights as $flight) {
            Flight::create($flight);
        }
    }
}
