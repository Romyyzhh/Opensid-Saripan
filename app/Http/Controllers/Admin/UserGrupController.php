<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKategoriRequest as StoreUserGrupRequest;
use App\Http\Requests\UpdateKategoriRequest as UpdateUserGrupRequest;
use App\Models\UserGrup;
use Inertia\Inertia;

class UserGrupController extends Controller
{
    public function index()
    {
        $list = UserGrup::orderBy('nama')->paginate(20);
        return Inertia::render('admin/UserGrup', [
            'user_grup' => $list,
        ]);
    }

    public function store(StoreUserGrupRequest $request)
    {
        UserGrup::create($request->validated());
        return redirect()->route('admin.user-grup.index')->with('success', 'User group created');
    }

    public function update(UpdateUserGrupRequest $request, UserGrup $user_grup)
    {
        $user_grup->update($request->validated());
        return redirect()->route('admin.user-grup.index')->with('success', 'User group updated');
    }

    public function destroy(UserGrup $user_grup)
    {
        $user_grup->delete();
        return redirect()->route('admin.user-grup.index')->with('success', 'User group deleted');
    }
}
