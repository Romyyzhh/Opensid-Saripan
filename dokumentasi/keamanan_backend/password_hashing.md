# Dokumentasi Keamanan Backend - Password Hashing

Dokumen ini menjelaskan implementasi teknis penyimpanan kata sandi (password hashing) pada aplikasi OpenSID Saripan.

## 1. Algoritma yang Digunakan
Aplikasi menggunakan algoritma hashing standar industri untuk memastikan kata sandi pengguna tidak dapat dibaca meskipun database bocor.

- **Default**: **Bcrypt**
- **Alternatif**: **Argon2id** (Dapat diaktifkan melalui `.env`)

## 2. Konfigurasi Teknis
Konfigurasi dikelola melalui file [hashing.php](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/config/hashing.php).

### Bcrypt (Default)
- **Rounds**: 12
- **Deskripsi**: Jumlah iterasi (cost factor) diatur ke 12 untuk memberikan perlindungan yang kuat terhadap serangan brute-force offline menggunakan GPU/ASIC, namun tetap menjaga performa server.

### Argon2id
- **Memory**: 65536 KB
- **Threads**: 1
- **Time**: 4
- **Deskripsi**: Algoritma pemenang Password Hashing Competition yang memberikan perlindungan lebih baik terhadap serangan berbasis memori.

## 3. Implementasi Kode
Setiap kali pengguna mendaftar atau mengubah kata sandi, Laravel secara otomatis menggunakan `Hash::make()` yang merujuk pada konfigurasi ini.

Contoh pada proses registrasi di [CreateNewUser.php](file:///c:/Users/DELL/Desktop/magang/real-projek/Opensid-Saripan/app/Actions/Fortify/CreateNewUser.php):
```php
return User::create([
    'name' => $input['name'],
    'email' => $input['email'],
    'password' => $input['password'], // Laravel Fortify otomatis melakukan hashing
]);
```

## 4. Keamanan Tambahan
- **Salting Otomatis**: Setiap password memiliki *salt* unik yang dihasilkan secara otomatis oleh Bcrypt/Argon2, sehingga dua pengguna dengan password yang sama akan memiliki hash yang berbeda di database.
- **Environment Variable**: Driver hashing dapat diubah tanpa menyentuh kode program dengan mengubah nilai `HASH_DRIVER` di file `.env`.

---

**File Terkait:**
- `config/hashing.php`
- `app/Actions/Fortify/CreateNewUser.php`
- `.env`
