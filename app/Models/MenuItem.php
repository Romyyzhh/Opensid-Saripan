<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $table = 'menu';

    protected $fillable = [
        'config_id',
        'nama',
        'link',
        'parrent',
        'link_tipe',
        'enabled',
        'urut',
    ];
}
