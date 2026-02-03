# Postman: Login (session auth) tutorial

Panduan ini menjelaskan cara login ke aplikasi Laravel yang menggunakan session-based auth (Fortify) menggunakan Postman. Tujuan: dapat melakukan request terautentikasi ke route admin tanpa mematikan CSRF.

Prasyarat
- Aplikasi berjalan lokal, mis. `http://127.0.0.1:8000`
- Akun admin tersedia: `admin@example.com` / `secret` (di-seed)

Langkah singkat (manual)

1. Buka Postman, buat environment variable `baseUrl` = `http://127.0.0.1:8000`.

2. Ambil cookie CSRF (XSRF-TOKEN)
- Buat request `GET {{baseUrl}}/` (atau `GET {{baseUrl}}/login`) dan kirim. Postman akan menyimpan cookie di Cookie Jar.
- Di Postman: klik `Cookies` (kanan atas), pilih host `127.0.0.1`, temukan cookie `XSRF-TOKEN` dan salin nilainya.

3. Dekode nilai cookie (jika ter-URL-encode)
- Jika token mengandung `%` escape, dekode dengan tool online kecil atau gunakan fitur decode pada editor. (Contoh: `%2B` → `+`, `%3A` → `:`)

4. Kirim `POST /login` dengan header dan cookie
- Method: `POST`
- URL: `{{baseUrl}}/login`
- Headers:
  - `Accept: application/json`
  - `Content-Type: application/json`
  - `X-XSRF-TOKEN: <nilai XSRF-TOKEN yang sudah didekode>`
- Body -> raw -> JSON:
```json
{
  "email": "admin@example.com",
  "password": "secret"
}
```
- Pastikan Cookie Jar (Postman) menyertakan cookie untuk domain yang sama; jika ya, response sukses akan mengembalikan cookie `laravel_session` dan/atau `XSRF-TOKEN` yang baru.

5. Gunakan cookie yang tersimpan untuk request berikutnya
- Setelah login sukses, request berikutnya (GET/POST ke `/admin/artikel` dsb.) akan otomatis menggunakan cookie jar Postman.

Opsi: Pre-request Script agar otomatis memasang header X-XSRF-TOKEN
- Pada tab `Pre-request Script` untuk request `POST /login` tempel skrip ini (Postman akan membaca cookie dan mendekodenya):

```javascript
// Ambil cookie XSRF-TOKEN dari cookie jar (Postman) dan set env var
const xsrf = pm.cookies.get('XSRF-TOKEN');
if (xsrf) {
  pm.environment.set('XSRF', decodeURIComponent(xsrf));
}

// Set header otomatis jika env var tersedia
if (pm.environment.get('XSRF')) {
  pm.request.headers.upsert({ key: 'X-XSRF-TOKEN', value: pm.environment.get('XSRF') });
}
```

Catatan: beberapa versi Postman expose cookie jar di skrip; jika `pm.cookies.get` tidak tersedia, gunakan langkah manual (salin token dari dialog Cookies).

cURL (Windows / PowerShell) — manual cookie jar

1) Ambil cookie awal:

```powershell
curl -c cookies.txt http://127.0.0.1:8000/
```

2) Buka `cookies.txt`, salin nilai `XSRF-TOKEN` (kolom value). Jika nilai URL-encoded, dekode manual.

3) POST login:

```powershell
curl -b cookies.txt -c cookies.txt -H "Accept: application/json" -H "X-XSRF-TOKEN: <DECODED_XSRF>" -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"secret"}' -X POST http://127.0.0.1:8000/login
```

Troubleshooting
- Response `CSRF token mismatch.`: berarti header `X-XSRF-TOKEN` tidak cocok atau cookie sesi tidak disertakan. Pastikan nilai header sesuai dengan cookie `XSRF-TOKEN` dan cookie jar mengirim cookie `laravel_session`.
- Response redirect HTML (login form): tambahkan header `Accept: application/json` untuk menerima JSON respons jika ada error.

Alternatif (untuk testing lokal cepat)
- Tambahkan `/login` ke pengecualian CSRF (file `app/Http/Middleware/VerifyCsrfToken.php`) sementara — TIDAK disarankan untuk produksi. Hapus pengecualian setelah testing selesai.

Referensi
- Laravel session CSRF: https://laravel.com/docs/csrf
