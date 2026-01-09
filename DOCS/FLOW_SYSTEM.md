# 🔄 Alur Sistem & Arsitektur

SkyBoard menggunakan arsitektur **Decoupled Frontend-Backend** melalui RESTful API.

## 🏗️ Arsitektur High-Level
Sistem dibagi menjadi dua bagian utama:
1.  **Backend (Laravel)**: Bertanggung jawab atas logika bisnis, persistensi data, autentikasi (Sanctum), dan penyimpanan file (Storage).
2.  **Frontend (Next.js)**: Bertanggung jawab atas rendering UI, manajemen state, dan interaksi user melalui Client-Side Rendering (CSR).

---

## 🛤️ Alur Data (Flow)

### 1. Alur Autentikasi Admin
- User menginput email & password di halaman `/admin/login`.
- Frontend mengirim request ke `POST /api/login`.
- Backend memvalidasi kredensial. Jika valid, Backend mengembalikan **Sanctum Token**.
- Frontend menyimpan Token di `localStorage`.

### 2. Alur Pengelolaan Konten (Admin)
- Admin mengisi form (misal: Update Hero Banner).
- Frontend mengirim **FormData** (termasuk file gambar) ke `POST /api/content/{key}` disertai Token di Headers.
- Backend memproses gambar, menyimpannya di `/storage/app/public/content_images`, dan mengupdate database.
- Database mengembalikan data terbaru ke Frontend untuk ditampilkan.

### 3. Alur Tampilan Publik
- Saat user membuka halaman utama, Next.js mengirim request asinkron ke:
  - `GET /api/content`: Mengambil teks & aset banner.
  - `GET /api/flights`: Mengambil jadwal penerbangan real-time.
  - `GET /api/info-sections`: Mengambil fasilitas bandara.
- Data di-render menggunakan React Hooks (`useEffect`).

---

## 🎨 Logika Tampilan (UI Logic)
- **Automatic Refresh**: Jadwal penerbangan (Flight Board) diperbarui secara otomatis setiap 30 detik tanpa reload halaman.
- **Intersection Observer**: Titik navigasi di sebelah kanan layar otomatis mengikuti section yang sedang aktif saat user melakukan scroll.
- **Glassmorphism**: UI menggunakan efek transparansi dan blur (backdrop filter) untuk memberikan kesan modern dan premium.
