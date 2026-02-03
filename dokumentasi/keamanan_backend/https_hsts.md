# Dokumentasi Keamanan Backend - HTTPS & HSTS

Dokumen ini menjelaskan implementasi dan konfigurasi HTTPS serta HSTS pada aplikasi OpenSID Saripan untuk memastikan seluruh data yang dikirimkan antara server dan client terenkripsi.

## 1. Implementasi HTTPS
Aplikasi diwajibkan menggunakan protokol HTTPS di lingkungan produksi. Hal ini dilakukan untuk:
- Mencegah serangan *Man-in-the-Middle* (MitM).
- Mengenkripsi kredensial pengguna (password) saat login.
- Memastikan integritas data yang dikirimkan.

### Konfigurasi Laravel
Laravel secara otomatis menangani deteksi HTTPS melalui middleware `TrustProxies`. Di lingkungan produksi, pastikan `APP_URL` di file `.env` diawali dengan `https://`.

```env
APP_URL=https://saripan.desa.id
```

## 2. HTTP Strict Transport Security (HSTS)
HSTS adalah mekanisme keamanan yang memberitahu browser bahwa aplikasi hanya boleh diakses menggunakan HTTPS. Jika pengguna mencoba mengakses via HTTP, browser akan secara otomatis mengalihkan permintaan ke HTTPS sebelum mencapai server.

### Cara Aktivasi di Laravel
Meskipun HSTS biasanya dikonfigurasi pada level web server (Nginx/Apache), Laravel juga dapat mengirimkan header ini melalui middleware kustom atau konfigurasi App Service Provider.

**Header yang dikirimkan:**
`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

## 3. Pengamanan Cookie Sesi
Saat HTTPS aktif, cookie sesi harus dikonfigurasi agar hanya dikirim melalui koneksi aman.

- **File**: [session.php](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/config/session.php)
- **Parameter**: `'secure' => true` (atau diatur via `.env` `SESSION_SECURE_COOKIE=true`)

## 4. Rekomendasi Konfigurasi Web Server (Nginx)
Untuk hasil terbaik, konfigurasi berikut disarankan pada file konfigurasi Nginx:

```nginx
server {
    listen 80;
    server_name saripan.desa.id;
    return 301 https://$server_name$request_uri; # Redirect HTTP ke HTTPS
}

server {
    listen 443 ssl http2;
    server_name saripan.desa.id;

    # SSL Certificate
    ssl_certificate /path/to/cert.crt;
    ssl_certificate_key /path/to/cert.key;

    # HSTS Header
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
}
```

---

**File Terkait:**
- `config/session.php`
- `.env`
- `bootstrap/app.php`
