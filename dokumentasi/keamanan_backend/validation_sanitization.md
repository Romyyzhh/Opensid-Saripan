# Dokumentasi Keamanan Backend - Validation & Sanitasi Input

Dokumen ini menjelaskan implementasi teknis validasi dan sanitasi input pada aplikasi OpenSID Saripan untuk mencegah serangan XSS, Injeksi Data, dan memastikan integritas data.

## 1. Konsep Keamanan Input
Setiap data yang masuk dari pengguna (request) dianggap tidak aman. Aplikasi menerapkan dua lapis perlindungan:
1. **Validasi**: Memastikan data sesuai dengan format, tipe, dan batasan yang ditentukan.
2. **Sanitasi**: Membersihkan data dari karakter berbahaya (seperti skrip HTML) sebelum disimpan atau ditampilkan.

## 2. Implementasi Validasi (Form Requests)
Aplikasi menggunakan **Laravel Form Requests** untuk memisahkan logika validasi dari Controller. Hal ini memastikan hanya data yang valid yang dapat diproses oleh aplikasi.

Contoh pada [StoreArtikelRequest.php](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/app/Http/Requests/StoreArtikelRequest.php):
- `judul`: Wajib diisi, string, maksimal 200 karakter.
- `isi`: Wajib diisi, string.
- `gambar`: Harus berupa file gambar (jpg, png, dsb) dengan ukuran maksimal 2MB.

```php
public function rules()
{
    return [
        'judul' => 'required|string|max:200',
        'isi' => 'required|string',
        'id_kategori' => 'nullable|integer|exists:kategori,id',
        'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
    ];
}
```

## 3. Pencegahan XSS (Cross-Site Scripting)
Aplikasi mencegah serangan XSS melalui beberapa mekanisme:

### Otomatisasi Escape (Inertia & Blade)
- **Inertia.js**: Secara default meng-escape semua data yang dikirimkan ke frontend.
- **Blade**: Menggunakan sintaks `{{ $data }}` yang secara otomatis menjalankan fungsi `htmlspecialchars`.

### Sanitasi Konten HTML
Untuk input yang mengizinkan HTML (seperti konten artikel), disarankan menggunakan library seperti **HTMLPurifier** untuk membersihkan tag berbahaya (misal: `<script>`, `onerror`, `onload`).

## 4. Keamanan Upload File
- **Validasi Mime-Type**: Memastikan file benar-benar gambar, bukan skrip berbahaya dengan ekstensi palsu.
- **Randomize Filename**: Menyimpan file dengan nama acak untuk mencegah serangan *Insecure Direct Object Reference* (IDOR).
- **Storage Path**: File disimpan di luar direktori publik yang dapat dieksekusi langsung.

---

**File Terkait:**
- `app/Http/Requests/`
- `resources/js/Pages/`
- `app/Http/Controllers/`
