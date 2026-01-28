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
    Route::resource('sinergi-program', \App\Http\Controllers\Admin\SinergiProgramController::class);
    Route::resource('komentar', \App\Http\Controllers\Admin\KomentarController::class);
    Route::get('tema', [\App\Http\Controllers\Admin\TemaController::class, 'index'])->name('tema.index');
    Route::post('tema', [\App\Http\Controllers\Admin\TemaController::class, 'update'])->name('tema.update');
    Route::resource('media-sosial', \App\Http\Controllers\Admin\MediaSosialController::class);
    Route::resource('slider', \App\Http\Controllers\Admin\SliderController::class);
    Route::resource('teks-berjalan', \App\Http\Controllers\Admin\TeksBerjalanController::class);
    Route::get('pengunjung', [\App\Http\Controllers\Admin\PengunjungController::class, 'index'])->name('pengunjung.index');
});

require __DIR__.'/settings.php';
