<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WidgetController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Widget');
    }

    public function create()
    {
        return Inertia::render('admin/Widget');
    }

    public function store(Request $request)
    {
        // Store logic here
        return redirect()->route('admin.widget.index');
    }

    public function edit($id)
    {
        return Inertia::render('admin/Widget');
    }

    public function update(Request $request, $id)
    {
        // Update logic here
        return redirect()->route('admin.widget.index');
    }

    public function destroy($id)
    {
        // Delete logic here
        return redirect()->route('admin.widget.index');
    }
}
