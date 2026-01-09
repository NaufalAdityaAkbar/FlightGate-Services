# Panduan Instalasi & Menjalankan Aplikasi Microservice

## Prasyarat
- **Docker Desktop** harus sudah terinstall dan berjalan (Running).

## 1. Menjalankan Docker (Backend & Frontend)
Buka terminal di folder root project (`penjadwalanmicroservice`), lalu jalankan perintah ini untuk membangun dan menyalakan semua container:

```powershell
docker-compose up -d --build
```
*Tunggu hingga proses selesai. Ini akan menyalakan Laravel, MySQL, Nginx, dan Next.js sekaligus.*

## 2. Setup Backend (Laravel)
Setelah Docker berjalan, Anda perlu menginstal dependensi PHP dan menyiapkan database. Jalankan perintah berikut satu per satu di terminal:

1. **Install Library PHP (Composer)**
   ```powershell
   docker-compose exec app composer install
   ```

2. **Generate Application Key**
   ```powershell
   docker-compose exec app php artisan key:generate
   ```

3. **Setup Storage (Agar gambar bisa diakses)**
   ```powershell
   docker-compose exec app php artisan storage:link
   ```

4. **Migrasi Database & Isi Data Dummy (Seeding)**
   ```powershell
   docker-compose exec app php artisan migrate:fresh --seed
   ```

## 3. Akses Aplikasi
- **Public Board (Frontend)**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
  - Email: `admin@skyboard.com`
  - Password: `password`
- **API Backend**: [http://localhost:8000/api/health](http://localhost:8000/api/health)
- **Database Management (phpMyAdmin)**: [http://localhost:8080](http://localhost:8080)

---

## Catatan Tambahan (Opsional)
Jika Anda ingin menjalankan Frontend secara manual (tanpa Docker) untuk pengembangan (agar lebih cepat):

1. **Matikan container frontend**:
   ```powershell
   docker-compose stop frontend
   ```
2. **Masuk ke folder frontend**:
   ```powershell
   cd frontend-next
   ```
3. **Install & Jalankan**:
   ```powershell
   npm install
   npm run dev
   ```
