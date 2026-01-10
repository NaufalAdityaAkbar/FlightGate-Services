<?php

namespace Database\Seeders;

use App\Models\DisplayContent;
use Illuminate\Database\Seeder;

class DisplayContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            'header' => [
                'title' => 'SKYBOARD TIDS',
                'content' => 'Soekarno-Hatta International Airport'
            ],
            'hero' => [
                'title' => 'Gerbang Digital Indonesia',
                'content' => 'Sistem Informasi Transit Multi-Gate TERPADU. Menyajikan data real-time untuk kenyamanan perjalanan Anda.'
            ],
            'about' => [
                'title' => 'Teknologi Skyboard',
                'content' => 'Sistem Multi-Gate TIDS kami menggunakan sinkronisasi data real-time antara pusat kendali admin dan display terminal, menjamin akurasi jadwal hingga hitungan detik.'
            ],
            'running_text' => [
                'title' => 'URGENT',
                'content' => 'PENGUMUMAN: Untuk alasan keamanan, harap jangan meninggalkan bagasi Anda tanpa pengawasan. Terminal 3 kini menyediakan layanan self check-in di Area B.'
            ]
        ];

        foreach ($contents as $key => $data) {
            DisplayContent::updateOrCreate(['section_key' => $key], $data);
        }
    }
}
