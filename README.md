# ✈️ Flight-Gate: Decoupled Flight Management System

Implementasi arsitektur **Semi-Microservices** dengan memisahkan Backend Service dan Frontend UI untuk mencapai skalabilitas dan performa maksimal.

### 🏗️ Architecture Overview
Sistem ini dibangun dengan pendekatan **Headless CMS**, di mana:
- **Core Engine (Backend):** Laravel menyediakan RESTful API untuk data jadwal penerbangan dan manajemen menu.
- **Client Side (Frontend):** Next.js (React) bertugas melakukan *fetching* data secara asinkron untuk pengalaman pengguna yang *seamless*.
- **Admin Isolation:** Jalur administratif dipisahkan secara struktural (Manual Route Input) untuk meningkatkan keamanan akses level root.

### 🛠️ Tech Stack
- **API Provider:** Laravel 11 + MySQL
- **Presentation Layer:** Next.js + Tailwind CSS + TypeScript
- **Auth:** Token-based Authentication

### 🛡️ Security Highlights
- **Hidden Admin Entry:** Tidak ada tautan publik untuk akses admin; login memerlukan pengetahuan rute internal (Security by Obscurity).
- **Endpoint Protection:** API hanya merespon *request* yang valid dari *origin* tertentu.
