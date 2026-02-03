# Backend CRUD Requirements — Admin ERD

Tujuan: mendefinisikan kebutuhan backend untuk operasi CRUD yang akan digunakan oleh admin. Semua operasi harus diautentikasi (session-based auth dari Fortify/Auth) dan divalidasi di server. Testing awal akan dilakukan tanpa Postman (menggunakan browser/cURL dengan kredensial sah), lalu dapat diuji di Postman bila diperlukan.

1. Autentikasi & Akses
- Gunakan Laravel Fortify / auth session default untuk login form. Semua route admin dilindungi `auth` middleware.
- Hanya user dengan `role` = `admin` (atau `id_grup` tertentu) boleh melakukan CRUD (middleware `can:admin` atau custom `CheckRole`).
- Untuk testing tanpa Postman: login melalui `POST /login` (form auth). Simpan cookie sesi dan gunakan cookie tersebut untuk request berikutnya.

2. Konvensi response
- Success: HTTP 200 / 201 dengan JSON `{ "success": true, "data": ..., "message": "" }`.
- Validation error: HTTP 422 dengan payload standar Laravel validation errors.
- Not found / forbidden: HTTP 404 / 403.

3. Resource: Artikel
- Routes (route group prefix `/admin/artikel`):
  - `GET /admin/artikel` — list (paginasi): query params `?page=1&per_page=15&search=&kategori=`
  - `GET /admin/artikel/{id}` — detail
  - `POST /admin/artikel` — create
  - `PUT /admin/artikel/{id}` — update
  - `DELETE /admin/artikel/{id}` — delete
- Validation (POST/PUT):
  - `judul`: required|string|max:200
  - `isi`: required|string
  - `id_kategori`: nullable|integer|exists:kategori,id
  - `gambar`: nullable|image|max:2048
  - `slug`: nullable|string|unique:artikel,slug,{{id?}}
  - `enabled`: boolean
  - `headline`: boolean
- Backend behavior:
  - Simpan file gambar melalui disk `public` dan simpan path pada `gambar`.
  - Hit counter (`hit`) readonly (update via public view controller, not admin CRUD).
  - Return created/updated artikel payload setelah operasi.

4. Resource: Kategori
- Routes `/admin/kategori` — standard CRUD (index, show, store, update, destroy).
- Validation:
  - `kategori`: required|string|max:100
  - `slug`: nullable|string|unique:kategori,slug,{{id?}}
  - `enabled`: boolean

5. Resource: User Grup
- Routes `/admin/user-grup` — CRUD for grouping user roles.
- Validation:
  - `nama`: required|string|max:50
  - `slug`: required|string|unique:user_grup,slug,{{id?}}

6. Other resources (menu, galeri, widget)
- Terapkan pola yang sama: route prefix `/admin/{resource}`, middleware `auth` + role check, validation rules di Form Request classes.

7. Security / Validation Implementation Notes
- Buat `FormRequest` classes (e.g., `StoreArtikelRequest`, `UpdateArtikelRequest`) untuk mengelola validasi.
- Gunakan Gate atau custom middleware `EnsureAdmin` untuk otorisasi.
- Pastikan file upload divalidasi (`mimes:jpg,jpeg,png,gif,webp`) dan simpan di `storage/app/public` lalu `php artisan storage:link`.
- Gunakan CSRF token default untuk form post dari browser. Untuk cURL testing, ambil cookie sesi setelah login.

8. Testing tanpa Postman (quick steps)
- 1) Jalankan dev server: `php artisan serve`
- 2) Login via form di browser atau curl:
```bash
# Login with credentials (replace email/password)
curl -c cookies.txt -d "email=admin@example.com&password=secret" -X POST http://127.0.0.1:8000/login
```
- 3) Gunakan cookie untuk membuat artikel:
```bash
curl -b cookies.txt -F "judul=Judul Tes" -F "isi=Isi tes" -F "id_kategori=1" -F "gambar=@/path/to/file.jpg" http://127.0.0.1:8000/admin/artikel -X POST
```
- 4) Hapus/Update memakai `-b cookies.txt` untuk mengirim cookie sesi.

Note: after seeding, an admin account will be available with email `admin@example.com` and password `secret` for browser testing.

9. Automated Tests (disarankan)
- Tambahkan Feature tests di `tests/Feature/Admin` untuk setiap resource: cek akses tanpa login (403/redirect), cek validasi (422), cek create/read/update/delete (201/200/204).
- Gunakan model factories (`ArtikelFactory`, `KategoriFactory`, `UserFactory`) dan `actingAs($admin)` untuk mensimulasikan user terautentikasi.

10. Logging & Error Handling
- Log server-side errors di `storage/logs/laravel.log`.
- Kembalikan pesan error yang jelas pada validation errors.

11. Deliverables
- Implementasi controller CRUD untuk `Artikel`, `Kategori`, `UserGrup` dengan FormRequest.
- Middleware otorisasi admin.
- Contoh cURL test scripts (di atas) dan minimal Feature tests.

Catatan: jika ingin pengujian API token (stateless), pertimbangkan Laravel Sanctum — tapi karena target adalah operasi admin internal via browser, gunakan session auth dan cookie.
