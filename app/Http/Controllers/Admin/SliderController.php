<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SliderController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Slider');
    }

    public function create()
    {
        return Inertia::render('admin/Slider');
    }

    public function store(Request $request)
    {
        return redirect()->route('admin.slider.index');
    }

    public function edit($id)
    {
        return Inertia::render('admin/Slider');
    }

    public function update(Request $request, $id)
    {
        return redirect()->route('admin.slider.index');
    }

    public function destroy($id)
    {
        return redirect()->route('admin.slider.index');
    }
}
