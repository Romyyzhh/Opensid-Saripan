<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKategoriRequest;
use App\Http\Requests\UpdateKategoriRequest;
use App\Models\Kategori;
use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index()
    {
        $list = Kategori::orderBy('kategori')->paginate(20);
        return Inertia::render('admin/Kategori', [
            'kategori' => $list,
        ]);
    }

    public function store(StoreKategoriRequest $request)
    {
        $data = $request->validated();
        Kategori::create($data);
        return redirect()->route('admin.kategori.index')->with('success', 'Kategori created');
    }

    public function update(UpdateKategoriRequest $request, Kategori $kategori)
    {
        $kategori->update($request->validated());
        return redirect()->route('admin.kategori.index')->with('success', 'Kategori updated');
    }

    public function destroy(Kategori $kategori)
    {
        $kategori->delete();
        return redirect()->route('admin.kategori.index')->with('success', 'Kategori deleted');
    }
}
