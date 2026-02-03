# Dokumentasi Keamanan Backend - Parameterized Queries

Dokumen ini menjelaskan implementasi teknis pencegahan SQL Injection menggunakan Parameterized Queries pada aplikasi OpenSID Saripan.

## 1. Konsep Dasar
SQL Injection adalah serangan di mana penyerang mencoba menyisipkan perintah SQL berbahaya melalui input pengguna. Aplikasi ini mencegah hal tersebut dengan menggunakan **Parameterized Queries** (juga dikenal sebagai Prepared Statements).

## 2. Implementasi via Eloquent & Query Builder
Laravel secara default menggunakan PDO (PHP Data Objects) yang mendukung binding parameter otomatis.

### Contoh Aman (Eloquent)
Aplikasi menggunakan model Eloquent untuk interaksi database. Input pengguna secara otomatis di-bind sebagai parameter, bukan digabungkan sebagai string.

```php
// AMAN: Laravel secara otomatis melakukan binding parameter
$user = User::where('email', $request->email)->first();
```

### Contoh Aman (Query Builder)
Saat menggunakan Join atau Query Builder kompleks, aplikasi tetap menggunakan metode standar Laravel.

```php
// AMAN: Input di dalam where() di-bind secara otomatis
$articles = Artikel::leftJoin('kategori', 'artikel.id_kategori', '=', 'kategori.id')
            ->where('artikel.enabled', 1)
            ->get();
```

## 3. Larangan Penggunaan Raw Queries yang Tidak Aman
Pengembang dilarang keras menggunakan `DB::raw()`, `whereRaw()`, atau metode "Raw" lainnya dengan menggabungkan input pengguna secara langsung.

### ❌ JANGAN LAKUKAN (Vulnerable)
```php
// BERBAHAYA: Rentan SQL Injection
$results = DB::select("SELECT * FROM users WHERE email = '" . $request->email . "'");
```

### ✅ LAKUKAN (Aman)
Jika harus menggunakan raw query, gunakan binding parameter manual.
```php
// AMAN: Menggunakan binding parameter (?)
$results = DB::select("SELECT * FROM users WHERE email = ?", [$request->email]);
```

## 4. Verifikasi Keamanan
Aplikasi ini telah diperiksa untuk memastikan:
1. Penggunaan ORM Eloquent secara konsisten di seluruh Controller.
2. Tidak adanya penggunaan string concatenation pada query database.
3. Validasi input dilakukan sebelum data menyentuh lapisan database.

---

**File Terkait:**
- `app/Http/Controllers/Admin/ArtikelController.php`
- `app/Models/User.php`
- `app/Models/Artikel.php`
