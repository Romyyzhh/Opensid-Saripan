# Implementation Flow — Admin Menu (Kategori & Role)

Tujuan: Menambahkan CRUD `Kategori` dan manajemen `User Grup` (role) pada Admin Web sesuai ERD dan pemetaan yang ada.

Prerequisites:
- Database migrasi sudah dijalankan (`create_admin_web_schema`) — tabel `kategori` dan `user_grup` ada.
- Routes admin terdaftar di `routes/web.php` (prefix `admin`).
- Halaman React admin skeleton ada di `resources/js/pages/admin/`.

Alur implementasi (urutan langkah):

1. Database & Seed
- Pastikan tabel `kategori` dan `user_grup` ada (lihat `database/migrations/2026_01_28_043339_create_admin_web_schema.php`).
- Buat seeder contoh untuk `user_grup` (Administrator, Redaksi) dan `kategori` (opsional): `database/seeders/UserGrupSeeder.php`, `KategoriSeeder.php`.
- Jalankan: `php artisan db:seed --class=UserGrupSeeder` (atau `php artisan db:seed`).

2. Backend — Controller & Request
- Buat controller resource untuk kategori:
  - `app/Http/Controllers/Admin/KategoriController.php` (metode index, create, store, show, edit, update, destroy).
  - Gunakan form request untuk validasi: `app/Http/Requests/Admin/KategoriRequest.php`.
- Buat controller resource untuk user_grup (role):
  - `app/Http/Controllers/Admin/UserGrupController.php` (CRUD sederhana untuk role management).
- Implement authorization checks (middleware) jika perlu, mis. hanya role `Administrator` dapat mengakses manajemen role.

3. Routes
- Tambahkan resource routes pada `routes/web.php` di dalam group admin:
  - `Route::resource('kategori', KategoriController::class);`
  - `Route::resource('user-grup', UserGrupController::class);`
- Gunakan `name('admin.kategori')` dan `name('admin.user-grup')` conventions.

4. Frontend — Pages (Inertia + React)
- Buat halaman React di `resources/js/pages/admin/`:
  - `Kategori.tsx` — daftar, modal/halaman create & edit, form validation, pagination.
  - `UserGrup.tsx` — daftar role, create/edit, assign slug/jenis.
- Konsumsi API (controller) lewat Inertia form props & POST/PUT requests.
- Tambahkan link/menu di admin layout agar muncul di sidebar/navigation.

5. Model & Resource
- Jika perlu buat Eloquent Resource / transformers untuk respon JSON.
- Pastikan relasi `kategori` digunakan pada `Artikel` (controller/view) untuk memilih kategori saat membuat artikel.

6. Tests (opsional tapi direkomendasikan)
- Tambah feature tests untuk:
  - `admin.kategori` CRUD flows (create, update, delete) — menggunakan user dengan role admin.
  - `admin.user-grup` CRUD flows.

7. Seeder Admin User
- Tambah/ubah user test agar punya `id_grup` Administrator dan `config_id` (jika sistem multi-config). Contoh:
  - Update record `users` setelah seeder: set `id_grup` ke ID Administrator.

8. Dokumentasi & Mapping
- Perbarui `dokumentasi_erd_admin/mapping_menu_admin_web.txt` dan `erd_admin_web.txt` jika ada penambahan kolom/constraint.
- Tambah petunjuk di `dokumentasi_erd_admin/README_DOKUMENTASI.txt` bahwa kategori & user_grup kini punya UI CRUD.

9. Deploy/Build
- Build frontend: `npm run build` (atau `npm run dev` saat development).
- Commit perubahan dan push ke remote; buat PR jika perlu review.

File referensi utama:
- `dokumentasi_erd_admin/dbdiagram_admin_web.dbml`
- `database/migrations/2026_01_28_043339_create_admin_web_schema.php`
- `routes/web.php`
- `resources/js/pages/admin/` (existing pages)

Checklist quick-verify:
- [ ] Route resource untuk `kategori` dan `user-grup` terdaftar.
- [ ] Controller dan Request validation dibuat dan teruji.
- [ ] Halaman React tersedia dan terhubung (Inertia forms berfungsi).
- [ ] Seeder role dibuat dan admin user diset.
- [ ] Docs (`dokumentasi_erd_admin`) diperbarui.

---
Generated: 2026-01-29
