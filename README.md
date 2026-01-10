# SkyBoard - Airport Information Management System ✈️

SkyBoard adalah sistem manajemen informasi bandara modern yang dibangun dengan arsitektur semi-microservice. Sistem ini mengintegrasikan **Laravel** sebagai robust API backend dan **Next.js** sebagai high-performance frontend dashboard.

---

## 📂 Dokumentasi Lengkap
Untuk memudahkan navigasi, dokumentasi dibagi menjadi beberapa bagian utama:

1.  **[Panduan Instalasi](./DOCS/INSTALLATION.md)**: Langkah-langkah menjalankan Docker, Composer, dan Migrasi Database.
2.  **[Alur Sistem & Arsitektur](./DOCS/FLOW_SYSTEM.md)**: Penjelasan flow data dari Backend ke Frontend.
3.  **[Fitur & Rancangan](./DOCS/FEATURES_RANCANGAN.md)**: Daftar fitur admin, publik, dan skema data.
4.  **[Rekomendasi Ekstensi](./DOCS/EXTENSIONS.md)**: Tools pendukung pengembangan di VS Code.

---

## 🚀 Quick Start (Production/Docker Mode)
Jika Anda sudah memiliki Docker, jalankan sistem dalam satu perintah:
```powershell
docker-compose up -d --build
docker-compose exec app php artisan migrate:fresh --seed
docker-compose exec app php artisan storage:link
```
Akses di: `http://localhost:3000`

---

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15, Tailwind CSS, TypeScript |
| **Backend** | Laravel 12 (PHP 8.2), Sanctum |
| **Database** | MySQL 8.0 |
| **Infrastructure** | Docker, Nginx, phpMyAdmin |

---

## 👥 Akun Developer (Seeded)
*   **Email**: `admin@skyboard.id`
*   **Password**: `password`

---

