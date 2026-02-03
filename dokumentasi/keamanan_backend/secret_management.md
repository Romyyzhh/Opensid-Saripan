# Secret Management (Manajemen Rahasia)

Dokumentasi ini menjelaskan bagaimana aplikasi mengelola informasi sensitif (secrets) seperti API keys, database credentials, dan application keys secara aman untuk mencegah kebocoran data.

## 1. Penggunaan Environment Variables (.env)
Aplikasi menggunakan file `.env` untuk memisahkan konfigurasi sensitif dari kode sumber (source code).

- **Prinsip Utama**: File `.env` **TIDAK BOLEH** dikomit ke sistem kontrol versi (Git).
- **Verifikasi**: File `.env` sudah terdaftar di [.gitignore](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/.gitignore) untuk mencegah pengunggahan yang tidak disengaja.
- **Template**: File [.env.example](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/.env.example) disediakan sebagai panduan variabel apa saja yang perlu diisi tanpa membocorkan nilai aslinya.

## 2. Larangan Hardcoded Secrets
Semua nilai sensitif harus diakses melalui fungsi pembantu `env()` di dalam file konfigurasi, dan kemudian diakses melalui fungsi `config()` di dalam aplikasi.

**Contoh Salah (Hardcoded):**
```php
// Jangan lakukan ini
$apiKey = '12345-SUPER-SECRET-KEY';
```

**Contoh Benar (Menggunakan Config):**
```php
// config/services.php
'myservice' => [
    'key' => env('MY_SERVICE_API_KEY'),
],

// Di dalam Controller/Action
$apiKey = config('services.myservice.key');
```

## 3. Application Key (APP_KEY)
Laravel menggunakan `APP_KEY` untuk mengenkripsi data seperti sesi pengguna dan cookie.
- **Keamanan**: Pastikan `APP_KEY` unik dan kuat untuk setiap lingkungan (local, staging, production).
- **Perintah**: Gunakan `php artisan key:generate` untuk membuat key baru jika belum ada.

## 4. Keamanan di Lingkungan Produksi
Untuk meningkatkan keamanan dan performa di lingkungan produksi:

### Config Caching
Gunakan perintah berikut untuk memuat semua konfigurasi ke dalam satu file cache, yang juga mencegah pembacaan langsung dari file `.env` pada setiap request (meningkatkan keamanan):
```bash
php artisan config:cache
```
*Catatan: Setelah menjalankan ini, perubahan pada `.env` tidak akan terbaca sampai cache dihapus atau diperbarui.*

### Permission File
Pastikan file `.env` memiliki izin akses yang ketat pada server produksi (misalnya `600` atau `640`) agar tidak bisa dibaca oleh pengguna sistem lain.

## 5. Checklist Manajemen Rahasia
- [x] File `.env` diabaikan oleh Git via `.gitignore`.
- [x] Tidak ada API Key atau Password yang tertulis langsung (hardcoded) di kode program.
- [x] Menggunakan `.env.example` sebagai referensi.
- [ ] (Produksi) Menjalankan `config:cache`.
- [ ] (Produksi) Memastikan izin file `.env` aman.
