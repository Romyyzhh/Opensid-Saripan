# Dokumentasi Keamanan Backend - Strict CORS Policy

Dokumen ini menjelaskan implementasi kebijakan Cross-Origin Resource Sharing (CORS) yang ketat pada aplikasi OpenSID Saripan untuk mencegah akses ilegal dari domain yang tidak dikenal.

## 1. Konsep CORS
CORS adalah mekanisme keamanan browser yang membatasi bagaimana skrip pada satu domain dapat berinteraksi dengan sumber daya di domain lain. Tanpa CORS yang ketat, aplikasi rentan terhadap serangan di mana situs jahat mencoba melakukan permintaan atas nama pengguna yang sah.

## 2. Implementasi di Laravel
Aplikasi menggunakan file konfigurasi [cors.php](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/config/cors.php) untuk mengatur kebijakan akses.

### Konfigurasi yang Diterapkan:
- **Allowed Origins**: Membatasi akses hanya untuk domain yang diperbolehkan. Secara default diatur menggunakan environment variable `FRONTEND_URL`.
- **Paths**: Menentukan rute mana saja yang menerapkan kebijakan CORS, termasuk rute autentikasi kritis (`login`, `register`, `logout`, `api/*`).
- **Allowed Methods**: Membatasi metode HTTP (GET, POST, dll) yang diizinkan.

## 3. Detail Konfigurasi
File: `config/cors.php`

```php
'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'register', 'logout'],
'allowed_methods' => ['*'],
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
'allowed_headers' => ['*'],
'supports_credentials' => false,
```

## 4. Keamanan Tambahan
- **Bukan Pengganti Autentikasi**: CORS hanyalah lapisan perlindungan browser. Keamanan sisi server tetap bergantung pada sesi dan token valid.
- **Environment Specific**: Di lingkungan lokal, `allowed_origins` biasanya diatur ke `http://localhost:3000` atau alamat dev server lainnya. Di produksi, pastikan hanya domain resmi desa yang dimasukkan.

---

**File Terkait:**
- `config/cors.php`
- `.env`
