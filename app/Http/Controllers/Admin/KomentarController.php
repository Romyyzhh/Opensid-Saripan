<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KomentarController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Komentar');
    }

    public function create()
    {
        return Inertia::render('admin/Komentar');
    }

    public function store(Request $request)
    {
        return redirect()->route('admin.komentar.index');
    }

    public function edit($id)
    {
        return Inertia::render('admin/Komentar');
    }

    public function update(Request $request, $id)
    {
        return redirect()->route('admin.komentar.index');
    }

    public function destroy($id)
    {
        return redirect()->route('admin.komentar.index');
    }
}
