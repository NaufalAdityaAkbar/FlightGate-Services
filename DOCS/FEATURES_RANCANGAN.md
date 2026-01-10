# ✨ Fitur & Rancangan Sistem

Daftar kapabilitas yang dimiliki oleh sistem SkyBoard.

## 🌟 Fitur Utama

### 📡 Sisi Publik (Guest)
- **Multi-Gate Transit Information System (TIDS)**: Arsitektur sistem yang skalabel untuk mengelola informasi dari Gate A hingga Gate Z secara simultan.
- **Dynamic Gate Allocation**: Kemampuan Admin untuk mengalokasikan gerbang secara dinamis dan real-time melalui dashboard.
- **Consolidated Schedule Dashboard**: Tampilan layar utama yang merangkum seluruh jadwal kedatangan dan keberangkatan dalam satu tampilan terpadu.
- **Cross-Platform Scheduling**: Sinkronisasi jadwal antara backend Laravel dan visualisasi Next.js secara instan.
- **Real-time Status Updates**: Perubahan status (Late, Boarding, etc) yang langsung tercermin di layar publik.
- **Filtering & Navigation**: Kemampuan publik untuk memfilter berdasarkan Terminal atau Tipe Penerbangan.
- **Running Text Announcement**: Pengumuman penting yang berjalan di bagian bawah layar.
- **Full Responsive**: Tampilan optimal di HP, Tablet, maupun PC.

### 🔐 Sisi Admin (Management)
- **Secure Login**: Proteksi rute admin menggunakan Laravel Sanctum.
- **Dashboard Overview**: Ringkasan data (Total Maskapai, Status Server).
- **Content Manager**:
  - Update teks Header & Hero.
  - Upload & Ganti gambar latar belakang secara real-time.
- **Info Sections Manager**:
  - Menambah, mengedit, atau menghapus fasilitas bandara.
  - Mengatur posisi gambar (Kiri/Kanan) secara manual.
- **Flight Schedule CRUD**: Kelola jam penerbangan, kode pesawat, tujuan, dan status (Delayed, Landed, dsb).

---

## 🏗️ Rancangan Database (Schema)

| Tabel | Deskripsi |
| :--- | :--- |
| **`users`** | Menyimpan akun admin (email, password hashed). |
| **`flights`** | Data penerbangan (airline, flight_number, destination, status, time). |
| **`display_contents`** | Pengaturan teks & gambar global (Hero, About, Running Text). |
| **`info_sections`** | Konten fasilitas bandara (title, content, image_path, position). |
| **`personal_access_tokens`** | Token autentikasi Sanctum. |

---

## 🖼️ Rancangan Aset (Storage)
Aset gambar disimpan di folder:
- **Hero/About**: `storage/app/public/content_images/`
- **Fasilitas**: `storage/app/public/info_sections/`
Semua file diakses publik melalui symbolic link di `public/storage`.
