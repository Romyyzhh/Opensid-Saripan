<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtikelRequest;
use App\Http\Requests\UpdateArtikelRequest;
use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArtikelCrudController extends Controller
{
    public function store(StoreArtikelRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('artikel', 'public');
            $data['gambar'] = $path;
        }

        $user = $request->user();

        $artikel = Artikel::create([
            'config_id' => $data['config_id'] ?? null,
            'id_kategori' => $data['id_kategori'] ?? null,
            'id_user' => $user ? $user->id : null,
            'judul' => $data['judul'],
            'isi' => $data['isi'],
            'gambar' => $data['gambar'] ?? null,
            'enabled' => $data['enabled'] ?? 1,
            'headline' => $data['headline'] ?? 0,
            'slug' => $data['slug'] ?? null,
        ]);

        return redirect()->route('admin.artikel.index')->with('success', 'Artikel created');
    }

    public function update(UpdateArtikelRequest $request, Artikel $artikel)
    {
        $data = $request->validated();

        if ($request->hasFile('gambar')) {
            if ($artikel->gambar) {
                Storage::disk('public')->delete($artikel->gambar);
            }
            $path = $request->file('gambar')->store('artikel', 'public');
            $data['gambar'] = $path;
        }

        $artikel->update($data);

        return redirect()->route('admin.artikel.index')->with('success', 'Artikel updated');
    }

    public function destroy(Artikel $artikel)
    {
        if ($artikel->gambar) {
            Storage::disk('public')->delete($artikel->gambar);
        }

        $artikel->delete();

        return redirect()->route('admin.artikel.index')->with('success', 'Artikel deleted');
    }
}
