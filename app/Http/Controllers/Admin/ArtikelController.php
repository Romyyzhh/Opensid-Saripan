<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Artikel;

class ArtikelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Artikel::leftJoin('kategori', 'artikel.id_kategori', '=', 'kategori.id')
            ->select([
                'artikel.id',
                'artikel.judul as title',
                'artikel.slug',
                'artikel.id_kategori',
                'artikel.id_user',
                'artikel.tgl_upload',
                'artikel.hit',
                'artikel.enabled',
                'artikel.headline',
                'kategori.kategori as category',
            ])
            ->orderByDesc('artikel.tgl_upload')
            ->paginate(15)
            ->through(function ($a) {
                $date = null;
                if (!empty($a->tgl_upload)) {
                    $date = \Illuminate\Support\Carbon::parse($a->tgl_upload)->toDateString();
                }

                return [
                    'id' => $a->id,
                    'title' => $a->title,
                    'category' => $a->category ?? null,
                    'category_id' => $a->id_kategori,
                    'status' => $a->enabled ? 'published' : 'draft',
                    'date' => $date,
                    'views' => $a->hit,
                ];
            });

        return Inertia::render('admin/Artikel', [
            'articles' => $articles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/Artikel/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Handled by StoreArtikelRequest
        // placeholder to satisfy method signature
        // Implementation will be added by store method.
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('admin/Artikel/Show', [
            'id' => $id,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('admin/Artikel/Edit', [
            'id' => $id,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Placeholder for update logic
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Placeholder for destroy logic
    }
}
