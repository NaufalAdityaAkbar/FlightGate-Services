<?php

namespace Database\Seeders;

use App\Models\DisplayContent;
use App\Models\Flight;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        User::updateOrCreate(
            ['email' => 'admin@skyboard.id'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password')
            ]
        );

        // Initial Content
        DisplayContent::updateOrCreate(
            ['section_key' => 'header'],
            [
                'title' => 'DIGITAL SKY BOARD',
                'content' => 'Bandar Udara International Soekarno-Hatta (CGK)',
                // 'image_path' => null // Placeholder
            ]
        );

        DisplayContent::updateOrCreate(
            ['section_key' => 'hero'],
            [
                'title' => 'Selamat Datang di Soekarno-Hatta',
                'content' => 'Gerbang Utama Indonesia Menuju Dunia. Nikmati pengalaman perjalanan yang aman dan nyaman bersama kami.',
                // 'image_path' => null 
            ]
        );

        DisplayContent::updateOrCreate(
            ['section_key' => 'about'],
            [
                'title' => 'Tentang Kami',
                'content' => 'Bandara Internasional Soekarno-Hatta (CGK) adalah bandar udara utama yang melayani wilayah Jabodetabek dan sekitarnya. Kami berkomitmen memberikan pelayanan terbaik dengan standar keamanan internasional.'
            ]
        );

        DisplayContent::updateOrCreate(
            ['section_key' => 'running_text'],
            [
                'title' => 'Info',
                'content' => 'INFORMASI TERKINI: Harap periksa kembali gerbang keberangkatan Anda. Anda harus segera check-in. Patuhi protokol kesehatan yang berlaku. selamat menikmati penerbangan anda.'
            ]
        );

        // Info Sections - Complete Set
        \App\Models\InfoSection::updateOrCreate(
            ['id' => 1],
            [
                'title' => 'VIP Lounge',
                'content' => 'Nikmati kenyamanan ruang tunggu eksklusif dengan fasilitas premium termasuk WiFi gratis, layanan makanan dan minuman, serta area kerja yang nyaman untuk perjalanan bisnis Anda.',
                'position' => 'left',
                'order' => 1,
                'is_active' => true
            ]
        );

        \App\Models\InfoSection::updateOrCreate(
            ['id' => 2],
            [
                'title' => 'Duty Free Shopping',
                'content' => 'Berbagai pilihan produk internasional dengan harga duty-free. Temukan parfum, kosmetik, elektronik, fashion, dan souvenir khas Indonesia di toko-toko kami yang tersebar di seluruh terminal.',
                'position' => 'right',
                'order' => 2,
                'is_active' => true
            ]
        );

        \App\Models\InfoSection::updateOrCreate(
            ['id' => 3],
            [
                'title' => 'Restaurant & Cafe',
                'content' => 'Tersedia berbagai pilihan kuliner dari masakan lokal hingga internasional. Nikmati hidangan Anda sambil menunggu penerbangan di restoran dan kafe kami yang nyaman.',
                'position' => 'left',
                'order' => 3,
                'is_active' => true
            ]
        );

        \App\Models\InfoSection::updateOrCreate(
            ['id' => 4],
            [
                'title' => 'Prayer Room',
                'content' => 'Fasilitas musholla yang bersih dan nyaman tersedia di setiap terminal dengan tempat wudhu terpisah untuk pria dan wanita. Tersedia juga Alquran dan sajadah.',
                'position' => 'right',
                'order' => 4,
                'is_active' => true
            ]
        );

        \App\Models\InfoSection::updateOrCreate(
            ['id' => 5],
            [
                'title' => 'Free WiFi',
                'content' => 'Koneksi internet cepat dan gratis tersedia di seluruh area bandara. Terdapat juga charging station untuk mengisi daya perangkat elektronik Anda.',
                'position' => 'left',
                'order' => 5,
                'is_active' => true
            ]
        );

        \App\Models\InfoSection::updateOrCreate(
            ['id' => 6],
            [
                'title' => 'Medical Center',
                'content' => 'Pusat kesehatan bandara melayani 24 jam dengan dokter dan perawat profesional. Kami siap membantu kebutuhan medis Anda selama di bandara.',
                'position' => 'right',
                'order' => 6,
                'is_active' => true
            ]
        );

        // Flights Data
        $flights = [
            [
                'scheduled_time' => '05:30',
                'airline' => 'Garuda Indonesia',
                'flight_code' => 'GA 720',
                'destination' => 'London (LHR)',
                'gate' => 'A12',
                'status' => 'TERLAMBAT'
            ],
            [
                'scheduled_time' => '08:00',
                'airline' => 'Singapore Airlines',
                'flight_code' => 'SQ 965',
                'destination' => 'Singapore (SIN)',
                'gate' => 'B7',
                'status' => 'GATE DITUTUP'
            ],
            [
                'scheduled_time' => '09:00',
                'airline' => 'Cathay Pacific',
                'flight_code' => 'CX 785',
                'destination' => 'Hong Kong (HKG)',
                'gate' => 'B3',
                'status' => 'BOARDING'
            ],
            [
                'scheduled_time' => '09:15',
                'airline' => 'Emirates',
                'flight_code' => 'EK 357',
                'destination' => 'Dubai (DXB)',
                'gate' => 'A9',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'scheduled_time' => '09:45',
                'airline' => 'Qatar Airways',
                'flight_code' => 'QR 957',
                'destination' => 'Doha (DOH)',
                'gate' => 'C3',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'scheduled_time' => '10:10',
                'airline' => 'All Nippon Airways',
                'flight_code' => 'NH 836',
                'destination' => 'Tokyo (NRT)',
                'gate' => 'D4',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'scheduled_time' => '11:20',
                'airline' => 'Turkish Airlines',
                'flight_code' => 'TK 57',
                'destination' => 'Istanbul (IST)',
                'gate' => 'A5',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'scheduled_time' => '12:45',
                'airline' => 'Malaysia Airlines',
                'flight_code' => 'MH 710',
                'destination' => 'Kuala Lumpur (KUL)',
                'gate' => 'B1',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'scheduled_time' => '13:00',
                'airline' => 'KLM Royal Dutch',
                'flight_code' => 'KL 810',
                'destination' => 'Amsterdam (AMS)',
                'gate' => 'C7',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'scheduled_time' => '14:30',
                'airline' => 'Thai Airways',
                'flight_code' => 'TG 434',
                'destination' => 'Bangkok (BKK)',
                'gate' => 'D2',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'scheduled_time' => '15:15',
                'airline' => 'Etihad Airways',
                'flight_code' => 'EY 472',
                'destination' => 'Abu Dhabi (AUH)',
                'gate' => 'A1',
                'status' => 'SESUAI JADWAL'
            ],
            [
                'scheduled_time' => '16:00',
                'airline' => 'Qantas',
                'flight_code' => 'QF 42',
                'destination' => 'Sydney (SYD)',
                'gate' => 'B9',
                'status' => 'SESUAI JADWAL'
            ]
        ];

        // Clear existing flights to prevent duplicates if seeded multiple times without fresh
        Flight::truncate();

        foreach ($flights as $flight) {
            Flight::create($flight);
        }
    }
}
