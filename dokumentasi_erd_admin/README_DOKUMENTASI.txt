DOKUMENTASI ERD & MODUL ADMIN WEB OPENSID
=========================================

Folder ini berisi dokumentasi teknis dan fungsional terkait struktur database yang digunakan dalam modul "Admin Web" (Administrasi Web) pada aplikasi OpenSID.

DAFTAR FILE:
------------
1. erd_admin_web.txt
   - Deskripsi: Berisi rincian setiap tabel beserta atribut (kolom) dan tipe datanya.
   - Kegunaan: Referensi cepat untuk mengetahui detail isi tabel secara tekstual.

2. dbdiagram_admin_web.dbml
   - Deskripsi: Kode standar Database Markup Language (DBML).
   - Kegunaan: Salin kode di dalam file ini dan tempel di https://dbdiagram.io untuk memvisualisasikan Entity Relationship Diagram (ERD) secara grafis beserta relasi antar tabel (Foreign Keys).

3. mapping_menu_admin_web.txt
   - Deskripsi: Pemetaan antara Menu di UI Admin Web dengan tabel database yang relevan.
   - Kegunaan: Membantu pengembang/tester memahami tabel mana yang akan terpengaruh saat melakukan aksi pada menu tertentu di aplikasi.

HUBUNGAN ANTAR FILE:
--------------------
Ketiga file ini saling melengkapi untuk memastikan keabsahan data selama pengembangan dan testing:
- [Teknis] dbdiagram_admin_web.dbml menentukan struktur dan relasi kunci.
- [Detail] erd_admin_web.txt menjelaskan makna dari setiap kolom di struktur tersebut.
- [Fungsional] mapping_menu_admin_web.txt menunjukkan bagaimana struktur data tersebut digunakan oleh pengguna melalui antarmuka aplikasi.

Dibuat pada: 2026-01-28
Status: Valid & Akurat (Berdasarkan Migrasi Database OpenSID)
