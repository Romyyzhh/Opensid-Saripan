<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeksBerjalanController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/TeksBerjalan');
    }

    public function create()
    {
        return Inertia::render('admin/TeksBerjalan');
    }

    public function store(Request $request)
    {
        return redirect()->route('admin.teks-berjalan.index');
    }

    public function edit($id)
    {
        return Inertia::render('admin/TeksBerjalan');
    }

    public function update(Request $request, $id)
    {
        return redirect()->route('admin.teks-berjalan.index');
    }

    public function destroy($id)
    {
        return redirect()->route('admin.teks-berjalan.index');
    }
}
