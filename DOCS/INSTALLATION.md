# 🛠️ Panduan Instalasi & Penggunaan Docker

Panduan ini menjelaskan cara melakukan setup project dari nol hingga siap digunakan.

## 📋 Prasyarat
- **Docker Desktop** (Sudah terinstall dan Running).
- **Git** (Opsional, untuk cloning).

---

## 🏗️ 1. Menjalankan Docker
Sistem ini menggunakan Docker untuk membungkus Backend, Database, dan Web Server.

1. Buka terminal/PowerShell di folder root project.
2. Jalankan perintah:
   ```powershell
   docker-compose up -d --build
   ```
   *Perintah ini akan membuat container:*
   - `app`: Service Laravel.
   - `db`: Database MySQL.
   - `web`: Nginx Server.
   - `phpmyadmin`: Tool pengelola database.

---

## ⚙️ 2. Konfigurasi Backend (Laravel)
Setelah container berjalan, Anda harus melakukan setup di dalam container `app`.

1. **Install Dependensi PHP**:
   ```powershell
   docker-compose exec app composer install
   ```

2. **Generate Key Aplikasi**:
   ```powershell
   docker-compose exec app php artisan key:generate
   ```

3. **Migrasi Database & Seeding**:
   Perintah ini akan membuat tabel dan mengisi data awal (admin & flight data).
   ```powershell
   docker-compose exec app php artisan migrate:fresh --seed
   ```

4. **Koneksi Storage (PENTING)**:
   Agar gambar yang diupload admin tampil di halaman publik:
   ```powershell
   docker-compose exec app php artisan storage:link
   ```

---

## 💻 3. Menjalankan Frontend (Next.js)
Secara default, frontend bisa dijalankan di luar Docker (Local) agar lebih ringan saat pengembangan.

1. Masuk ke folder frontend:
   ```powershell
   cd frontend-next
   ```
2. Install Package:
   ```powershell
   npm install
   ```
3. Jalankan Server Dev:
   ```powershell
   npm run dev
   ```

---

## 🔗 4. Daftar URL Penting
| Service | URL |
| :--- | :--- |
| **Frontend Utama** | [http://localhost:3000](http://localhost:3000) |
| **Admin Login** | [http://localhost:3000/admin/login](http://localhost:3000/admin/login) |
| **API Backend** | [http://localhost:8000/api](http://localhost:8000/api) |
| **phpMyAdmin** | [http://localhost:8080](http://localhost:8080) |

---

## 🛠️ Perintah Berguna (Troubleshooting)
- **Cek Status Container**: `docker-compose ps`
- **Melihat Log Backend**: `docker-compose logs -f app`
- **Restart Docker**: `docker-compose restart`
- **Hapus Semua Data Docker**: `docker-compose down -v`
