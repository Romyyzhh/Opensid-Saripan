<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ArtikelController;
use App\Http\Controllers\Admin\GaleriController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('HomePage');
})->name('home');

Route::get('dashboard', function () {
    if (auth()->user()->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }
    return Inertia::render('user/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::resource('artikel', ArtikelController::class);
    Route::resource('galeri', GaleriController::class);
    Route::resource('widget', \App\Http\Controllers\Admin\WidgetController::class);
    Route::resource('menu', \App\Http\Controllers\Admin\MenuController::class);
    Route::resource('kategori', \App\Http\Controllers\Admin\KategoriController::class);
    Route::resource('user-grup', \App\Http\Controllers\Admin\UserGrupController::class);
    Route::resource('sinergi-program', \App\Http\Controllers\Admin\SinergiProgramController::class);
    Route::resource('komentar', \App\Http\Controllers\Admin\KomentarController::class);
    Route::get('tema', [\App\Http\Controllers\Admin\TemaController::class, 'index'])->name('tema.index');
    Route::post('tema', [\App\Http\Controllers\Admin\TemaController::class, 'update'])->name('tema.update');
    Route::resource('media-sosial', \App\Http\Controllers\Admin\MediaSosialController::class);
    Route::resource('slider', \App\Http\Controllers\Admin\SliderController::class);
    Route::resource('teks-berjalan', \App\Http\Controllers\Admin\TeksBerjalanController::class);
    Route::get('pengunjung', [\App\Http\Controllers\Admin\PengunjungController::class, 'index'])->name('pengunjung.index');
    
    // Debug: menu -> table/page mapping (only available in local environment)
    Route::get('debug/menu-mapping', function () {
        if (!app()->environment('local')) {
            abort(404);
        }

        $mapping = [
            'artikel' => [
                'table' => 'artikel',
                'controller' => \App\Http\Controllers\Admin\ArtikelController::class,
                'page' => 'resources/js/pages/admin/Artikel.tsx',
            ],
            'slider' => [
                'table' => 'artikel (filter: slider = 1)',
                'controller' => \App\Http\Controllers\Admin\SliderController::class,
                'page' => 'resources/js/pages/admin/Slider.tsx',
            ],
            'widget' => [
                'table' => 'widget',
                'controller' => \App\Http\Controllers\Admin\WidgetController::class,
                'page' => 'resources/js/pages/admin/Widget.tsx',
            ],
            'menu' => [
                'table' => 'menu',
                'controller' => \App\Http\Controllers\Admin\MenuController::class,
                'page' => 'resources/js/pages/admin/Menu.tsx',
            ],
            'komentar' => [
                'table' => 'komentar',
                'controller' => \App\Http\Controllers\Admin\KomentarController::class,
                'page' => 'resources/js/pages/admin/Komentar.tsx',
            ],
            'galeri' => [
                'table' => 'gambar_gallery',
                'controller' => \App\Http\Controllers\Admin\GaleriController::class,
                'page' => 'resources/js/pages/admin/Galeri.tsx',
            ],
            'media-sosial' => [
                'table' => 'media_sosial',
                'controller' => \App\Http\Controllers\Admin\MediaSosialController::class,
                'page' => 'resources/js/pages/admin/MediaSosial.tsx',
            ],
            'teks-berjalan' => [
                'table' => 'teks_berjalan',
                'controller' => \App\Http\Controllers\Admin\TeksBerjalanController::class,
                'page' => 'resources/js/pages/admin/TeksBerjalan.tsx',
            ],
            'kategori' => [
                'table' => 'kategori',
                'controller' => null,
                'page' => null,
                'status' => 'missing controller/page (implement KategoriController & Kategori.tsx)'
            ],
            'user-grup' => [
                'table' => 'user_grup',
                'controller' => null,
                'page' => null,
                'status' => 'missing controller/page (implement UserGrupController & UserGrup.tsx)'
            ],
        ];

        return response()->json($mapping);
    })->name('debug.menu-mapping');
});

require __DIR__.'/settings.php';
