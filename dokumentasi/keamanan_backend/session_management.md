# Dokumentasi Keamanan Backend - Manajemen Sesi & Secure Cookies

Dokumen ini menjelaskan implementasi manajemen sesi yang aman pada aplikasi OpenSID Saripan menggunakan standar Laravel Fortify dan Secure Cookies.

## 1. Strategi Autentikasi
Aplikasi menggunakan **Stateful Session Authentication**. Untuk aplikasi berbasis Inertia.js, ini adalah metode yang lebih aman dan direkomendasikan dibandingkan JWT murni karena:
- Mencegah serangan XSS (karena token tidak disimpan di `localStorage`).
- Mendukung proteksi CSRF secara bawaan.
- Manajemen sesi yang lebih mudah di sisi server (misal: logout dari semua perangkat).

## 2. Keamanan Cookie
Konfigurasi cookie diatur pada [session.php](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/config/session.php) dengan parameter keamanan berikut:

### HttpOnly
- **Status**: Teraktifkan (`'http_only' => true`).
- **Deskripsi**: Mencegah skrip sisi klien (seperti JavaScript) mengakses cookie sesi. Ini adalah pertahanan utama terhadap serangan pencurian sesi melalui XSS.

### SameSite (Lax)
- **Status**: Teraktifkan (`'same_site' => 'lax'`).
- **Deskripsi**: Membatasi pengiriman cookie pada permintaan lintas situs (cross-site). Membantu mencegah serangan Cross-Site Request Forgery (CSRF).

### Cookie Encryption
- **Status**: Teraktifkan (via Middleware di [app.php](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/bootstrap/app.php)).
- **Deskripsi**: Semua cookie sesi dienkripsi secara otomatis oleh Laravel menggunakan `APP_KEY`, sehingga isinya tidak dapat dibaca atau dimanipulasi oleh pengguna.

### Secure Flag (HTTPS)
- **Status**: Mengikuti environment (`env('SESSION_SECURE_COOKIE')`).
- **Rekomendasi**: Pada lingkungan produksi, pastikan nilai ini adalah `true` agar cookie hanya dikirim melalui koneksi HTTPS.

## 3. Proteksi CSRF
Setiap permintaan `POST`, `PUT`, `PATCH`, atau `DELETE` diwajibkan menyertakan token CSRF. Laravel secara otomatis memvalidasi token ini melalui middleware `VerifyCsrfToken` (internal Laravel 11).

## 4. Manajemen Sesi Database
Aplikasi menggunakan driver `database` untuk menyimpan data sesi ([session.php:L21](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/config/session.php#L21)). Hal ini memungkinkan:
- Pemantauan sesi aktif.
- Penghapusan sesi secara remote jika diperlukan.
- Keamanan lebih tinggi dibandingkan driver `file` atau `cookie`.

---

**File Terkait:**
- `config/session.php`
- `bootstrap/app.php`
- `config/fortify.php`
