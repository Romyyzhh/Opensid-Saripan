<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemaController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Tema');
    }

    public function update(Request $request)
    {
        // Update theme settings logic here
        return redirect()->route('admin.tema.index');
    }
}
