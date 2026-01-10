<?php

namespace Database\Seeders;

use App\Models\InfoSection;
use Illuminate\Database\Seeder;

class InfoSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            [
                'id' => 1,
                'title' => 'VIP Lounge',
                'content' => 'Nikmati kenyamanan ruang tunggu eksklusif dengan fasilitas premium termasuk WiFi gratis, layanan makanan dan minuman, serta area kerja yang nyaman untuk perjalanan bisnis Anda.',
                'position' => 'left',
                'order' => 1,
                'is_active' => true
            ],
            [
                'id' => 2,
                'title' => 'Duty Free Shopping',
                'content' => 'Berbagai pilihan produk internasional dengan harga duty-free. Temukan parfum, kosmetik, elektronik, fashion, dan souvenir khas Indonesia di toko-toko kami yang tersebar di seluruh terminal.',
                'position' => 'right',
                'order' => 2,
                'is_active' => true
            ],
            [
                'id' => 3,
                'title' => 'Restaurant & Cafe',
                'content' => 'Tersedia berbagai pilihan kuliner dari masakan lokal hingga internasional. Nikmati hidangan Anda sambil menunggu penerbangan di restoran dan kafe kami yang nyaman.',
                'position' => 'left',
                'order' => 3,
                'is_active' => true
            ],
            [
                'id' => 4,
                'title' => 'Prayer Room',
                'content' => 'Fasilitas musholla yang bersih dan nyaman tersedia di setiap terminal dengan tempat wudhu terpisah untuk pria dan wanita. Tersedia juga Alquran dan sajadah.',
                'position' => 'right',
                'order' => 4,
                'is_active' => true
            ],
            [
                'id' => 5,
                'title' => 'Free WiFi',
                'content' => 'Koneksi internet cepat dan gratis tersedia di seluruh area bandara. Terdapat juga charging station untuk mengisi daya perangkat elektronik Anda.',
                'position' => 'left',
                'order' => 5,
                'is_active' => true
            ],
            [
                'id' => 6,
                'title' => 'Medical Center',
                'content' => 'Pusat kesehatan bandara melayani 24 jam dengan dokter dan perawat profesional. Kami siap membantu kebutuhan medis Anda selama di bandara.',
                'position' => 'right',
                'order' => 6,
                'is_active' => true
            ]
        ];

        foreach ($sections as $section) {
            InfoSection::updateOrCreate(['id' => $section['id']], $section);
        }
    }
}
