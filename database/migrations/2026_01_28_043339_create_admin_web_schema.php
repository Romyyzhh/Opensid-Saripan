<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Drop existing tables if they conflict or need replacement
        Schema::dropIfExists('village_info');
        Schema::dropIfExists('galeris');
        Schema::dropIfExists('artikels');

        // 0. A. Config
        if (!Schema::hasTable('config')) {
            Schema::create('config', function (Blueprint $table) {
                $table->integer('id')->primary(); // Assuming single row config, usually ID 1
                $table->string('nama_desa', 100);
                $table->string('kode_desa', 10);
                $table->string('alamat_kantor', 200);
                $table->timestamps();
            });
        }

        // 0. C. User Grup
        if (!Schema::hasTable('user_grup')) {
            Schema::create('user_grup', function (Blueprint $table) {
                $table->integer('id')->primary();
                $table->integer('config_id')->nullable();
                $table->string('nama', 20);
                $table->string('slug');
                $table->timestamps();
            });
        }

        // 0. B. Update Users
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'config_id')) {
                $table->integer('config_id')->nullable();
            }
            if (!Schema::hasColumn('users', 'id_grup')) {
                $table->integer('id_grup')->nullable();
            }
            if (!Schema::hasColumn('users', 'username')) {
                $table->string('username', 100)->nullable()->unique();
            }
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('user')->after('email');
            }
        });

        // 8. Kategori
        if (!Schema::hasTable('kategori')) {
            Schema::create('kategori', function (Blueprint $table) {
                $table->id();
                $table->integer('config_id')->nullable();
                $table->string('kategori', 100);
                $table->integer('tipe')->default(1);
                $table->tinyInteger('urut')->default(0);
                $table->tinyInteger('enabled')->default(1);
                $table->tinyInteger('parrent')->default(0);
                $table->string('slug', 100)->nullable();
                $table->timestamps();
            });
        }

        // 1. Artikel
        if (!Schema::hasTable('artikel')) {
            Schema::create('artikel', function (Blueprint $table) {
                $table->id();
                $table->integer('config_id')->nullable();
                $table->string('gambar', 200)->nullable();
                $table->text('isi');
                $table->integer('enabled')->default(1);
                $table->timestamp('tgl_upload')->useCurrent();
                $table->integer('id_kategori')->nullable();
                $table->integer('id_user')->nullable();
                $table->string('judul', 200);
                $table->boolean('headline')->default(false);
                $table->string('gambar1', 200)->nullable();
                $table->string('gambar2', 200)->nullable();
                $table->string('gambar3', 200)->nullable();
                $table->string('dokumen', 400)->nullable();
                $table->string('link_dokumen', 200)->nullable();
                $table->boolean('boleh_komentar')->default(true);
                $table->string('slug', 200)->nullable();
                $table->integer('hit')->default(0);
                $table->boolean('slider')->default(false);
                $table->timestamps();
            });
        }

        // 2. Widget
        if (!Schema::hasTable('widget')) {
            Schema::create('widget', function (Blueprint $table) {
                $table->id();
                $table->integer('config_id')->nullable();
                $table->text('isi')->nullable();
                $table->integer('enabled')->nullable();
                $table->string('judul', 100)->nullable();
                $table->tinyInteger('jenis_widget')->default(3);
                $table->integer('urut')->nullable();
                $table->string('form_admin', 100)->nullable();
                $table->text('setting')->nullable();
                $table->string('foto')->nullable();
                $table->timestamps();
            });
        }

        // 3. Menu
        if (!Schema::hasTable('menu')) {
            Schema::create('menu', function (Blueprint $table) {
                $table->id();
                $table->integer('config_id')->nullable();
                $table->string('nama', 50);
                $table->string('link', 500);
                $table->integer('parrent')->default(0);
                $table->boolean('link_tipe')->default(false);
                $table->boolean('enabled')->default(true);
                $table->integer('urut')->nullable();
                $table->timestamps();
            });
        }

        // 4. Komentar
        if (!Schema::hasTable('komentar')) {
            Schema::create('komentar', function (Blueprint $table) {
                $table->id();
                $table->integer('config_id')->nullable();
                $table->integer('id_artikel');
                $table->string('owner', 50);
                $table->string('email', 50)->nullable();
                $table->tinyText('subjek')->nullable();
                $table->text('komentar');
                $table->timestamp('tgl_upload')->useCurrent();
                $table->boolean('status')->nullable();
                $table->boolean('tipe')->nullable();
                $table->string('no_hp', 15)->nullable();
                $table->boolean('is_archived')->default(false);
                $table->text('permohonan')->nullable();
                $table->timestamps();
            });
        }

        // 5. Gambar Gallery
        if (!Schema::hasTable('gambar_gallery')) {
            Schema::create('gambar_gallery', function (Blueprint $table) {
                $table->id();
                $table->integer('config_id')->nullable();
                $table->integer('parrent')->default(0);
                $table->string('gambar', 200);
                $table->string('nama', 50);
                $table->integer('enabled')->default(1);
                $table->timestamp('tgl_upload')->useCurrent();
                $table->integer('tipe')->default(0);
                $table->boolean('slider')->nullable();
                $table->integer('urut')->nullable();
                $table->timestamps();
            });
        }

        // 6. Media Sosial
        if (!Schema::hasTable('media_sosial')) {
            Schema::create('media_sosial', function (Blueprint $table) {
                $table->id();
                $table->integer('config_id')->nullable();
                $table->text('gambar');
                $table->text('link')->nullable();
                $table->string('nama', 100);
                $table->boolean('tipe')->default(true);
                $table->integer('enabled');
                $table->timestamps();
            });
        }

        // 7. Teks Berjalan
        if (!Schema::hasTable('teks_berjalan')) {
            Schema::create('teks_berjalan', function (Blueprint $table) {
                $table->id();
                $table->integer('config_id')->nullable();
                $table->text('teks')->nullable();
                $table->integer('urut')->nullable();
                $table->boolean('status')->default(false);
                $table->tinyInteger('tipe')->default(1);
                $table->string('tautan', 150)->nullable();
                $table->string('judul_tautan', 150)->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('teks_berjalan');
        Schema::dropIfExists('media_sosial');
        Schema::dropIfExists('gambar_gallery');
        Schema::dropIfExists('komentar');
        Schema::dropIfExists('menu');
        Schema::dropIfExists('widget');
        Schema::dropIfExists('artikel');
        Schema::dropIfExists('kategori');
        Schema::dropIfExists('user_grup');
        Schema::dropIfExists('config');
        
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['config_id', 'id_grup', 'username']);
        });
    }
};
