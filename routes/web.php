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
    return Inertia::render('dashboard', [
        'adminDashboardUrl' => route('admin.dashboard'),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::resource('artikel', ArtikelController::class);
    Route::resource('galeri', GaleriController::class);
});

require __DIR__.'/settings.php';
