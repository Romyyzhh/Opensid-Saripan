# Alur Implementasi Keamanan Backend (Standar Profesional)

Dokumen ini merinci 8 poin utama keamanan backend yang diterapkan pada aplikasi OpenSID Saripan.

## 1. Password Hashing [DONE]
- **Metode**: Menggunakan **Bcrypt** (default Laravel) atau **Argon2id**.
- **Status**: **Terimplementasi** (Konfigurasi eksplisit di `config/hashing.php`).
- **Detail**: Password di-hash secara otomatis menggunakan Bcrypt dengan 12 rounds (default). Mendukung switch ke Argon2id melalui env.
- **Ref**: [password_hashing.md](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/dokumentasi/keamanan_backend/password_hashing.md)

## 2. Parameterized Queries (SQL Injection Prevention) [DONE]
- **Metode**: Menggunakan **Eloquent ORM** dan **Query Builder**.
- **Status**: **Terimplementasi** secara menyeluruh.
- **Detail**: Semua interaksi database menggunakan binding parameter otomatis yang mencegah serangan SQL Injection. Penggunaan `DB::raw()` dihindari kecuali dengan binding parameter yang aman.
- **Ref**: [parameterized_queries.md](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/dokumentasi/keamanan_backend/parameterized_queries.md)

## 3. JWT/OAuth2 & Secure Cookies [DONE]
- **Metode**: Statefull Session dengan **Secure Cookies** (via Laravel Fortify).
- **Status**: **Terimplementasi**.
- **Detail**: Menggunakan cookie yang dienkripsi, `HttpOnly`, dan `SameSite=Lax`. Sesi dikelola dengan driver database untuk keamanan ekstra.
- **Ref**: [session_management.md](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/dokumentasi/keamanan_backend/session_management.md)

## 4. Rate Limiting [DONE]
- **Metode**: Middleware `ThrottleRequests` dan `RateLimiter` Facade.
- **Status**: Terimplementasi (Login, Register, Forgot Password, 2FA).
- **Detail**: Membatasi jumlah request per menit/jam berdasarkan IP atau user ID untuk mencegah brute force dan DoS.
- **Ref**: [rate_limiter.md](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/dokumentasi/keamanan_backend/rate_limiter.md)

## 5. Implementasi HTTPS & HSTS [DONE]
- **Metode**: Middleware `App\Http\Middleware\TrustProxies` & Konfigurasi Web Server.
- **Status**: **Terimplementasi** (Level aplikasi & panduan konfigurasi server).
- **Detail**: Memaksa koneksi menggunakan HTTPS dan mengirimkan header `Strict-Transport-Security` untuk mencegah *man-in-the-middle attacks*.
- **Ref**: [https_hsts.md](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/dokumentasi/keamanan_backend/https_hsts.md)

## 6. Strict CORS Policy [DONE]
- **Metode**: Konfigurasi `config/cors.php`.
- **Status**: **Terimplementasi**.
- **Detail**: Membatasi domain mana saja yang boleh mengakses API backend. Menggunakan environment variable `FRONTEND_URL` untuk fleksibilitas.
- **Ref**: [cors_policy.md](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/dokumentasi/keamanan_backend/cors_policy.md)

## 7. Validation & Sanitasi Input [DONE]
- **Metode**: Form Request Validation & Eloquent Casting.
- **Status**: **Terimplementasi** (Menggunakan FormRequests di `app/Http/Requests`).
- **Detail**: Semua input divalidasi dengan aturan ketat. Output di-escape secara otomatis oleh Inertia.js untuk mencegah XSS.
- **Ref**: [validation_sanitization.md](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/dokumentasi/keamanan_backend/validation_sanitization.md)

## 8. Secret Management [DONE]
- **Metode**: File `.env` & Environment Variables.
- **Status**: **Terimplementasi**.
- **Detail**: Semua kredensial sensitif (DB_PASSWORD, API_KEY, APP_KEY) disimpan di `.env` yang tidak masuk ke version control (Git). Gunakan `php artisan key:generate` untuk kunci enkripsi unik.
- **Ref**: [secret_management.md](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/dokumentasi/keamanan_backend/secret_management.md)

---

### Roadmap Pengembangan Keamanan
1. [x] Implementasi Rate Limiting Dasar.
2. [ ] Audit keamanan berkala pada dependensi (`composer audit`).
3. [ ] Pengetatan aturan CORS untuk environment produksi.
4. [ ] Implementasi log aktivitas admin untuk audit trail.
