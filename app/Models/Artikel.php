<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    use HasFactory;

    protected $table = 'artikel';

    protected $fillable = [
        'config_id',
        'id_kategori',
        'id_user',
        'judul',
        'isi',
        'gambar',
        'enabled',
        'tgl_upload',
        'headline',
        'gambar1',
        'gambar2',
        'gambar3',
        'dokumen',
        'link_dokumen',
        'boleh_komentar',
        'slug',
        'hit',
        'slider',
    ];
}
