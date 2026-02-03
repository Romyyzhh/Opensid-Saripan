# Dokumentasi Keamanan Backend - Rate Limiting

Dokumen ini menjelaskan implementasi Rate Limiting pada aplikasi OpenSID Saripan untuk mencegah serangan brute-force dan spam.

## 1. Login Rate Limiter
- **Konfigurasi**: `App\Providers\FortifyServiceProvider::configureRateLimiting`
- **Batas**: 5 percobaan per menit.
- **Identifikasi**: Berdasarkan kombinasi `username/email` dan `IP Address`.
- **Tujuan**: Mencegah serangan brute-force pada akun pengguna tertentu.

## 2. Register Rate Limiter (Baru)
- **Konfigurasi**: `App\Providers\FortifyServiceProvider` & `App\Actions\Fortify\CreateNewUser`
- **Batas**: 5 pendaftaran per jam.
- **Identifikasi**: Berdasarkan `IP Address`.
- **Pesan Error**: *"Terlalu banyak percobaan pendaftaran. Silakan coba lagi dalam :seconds detik."*
- **Tujuan**: Mencegah spam pembuatan akun otomatis oleh bot.

## 3. Forgot Password Rate Limiter (Baru)
- **Konfigurasi**: `App\Providers\FortifyServiceProvider::configureRateLimiting`
- **Batas**: 3 permintaan per menit.
- **Identifikasi**: Berdasarkan `IP Address`.
- **Tujuan**: Mencegah penyalahgunaan fitur kirim email reset password (email bombing).

## 4. Two-Factor Authentication Limiter
- **Konfigurasi**: `App\Providers\FortifyServiceProvider::configureRateLimiting`
- **Batas**: 5 percobaan per menit.
- **Identifikasi**: Berdasarkan `session ID` pengguna.
- **Tujuan**: Mengamankan verifikasi kode 2FA.

---

### Cara Kerja Teknis
Aplikasi menggunakan facade `Illuminate\Support\Facades\RateLimiter`. Untuk pendaftaran, pengecekan dilakukan secara manual di dalam action `CreateNewUser` sebelum validasi data dimulai. Jika batas tercapai, aplikasi akan melempar `ValidationException` yang akan ditangkap oleh Inertia dan ditampilkan sebagai error validasi di frontend.

**File Terkait:**
- `app/Providers/FortifyServiceProvider.php`
- `app/Actions/Fortify/CreateNewUser.php`
- `config/fortify.php`
