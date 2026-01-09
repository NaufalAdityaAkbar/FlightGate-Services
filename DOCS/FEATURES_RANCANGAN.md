# ✨ Fitur & Rancangan Sistem

Daftar kapabilitas yang dimiliki oleh sistem SkyBoard.

## 🌟 Fitur Utama

### 📡 Sisi Publik (Guest)
- **Real-time Flight Board**: Jadwal keberangkatan dan kedatangan pesawat yang update otomatis.
- **Dynamic Hero Section**: Halaman sambutan yang informatif.
- **Airport Facilities (Info Sections)**: Penjelasan fasilitas bandara dengan layout gambar berselang-seling (Z-Pattern).
- **Interactive Scroll Dots**: Navigasi cepat antar section di sisi kanan layar.
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
