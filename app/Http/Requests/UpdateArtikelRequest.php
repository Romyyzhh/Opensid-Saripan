<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateArtikelRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user() && ($this->user()->role ?? '') === 'admin';
    }

    public function rules()
    {
        $id = $this->route('artikel');

        return [
            'judul' => 'required|string|max:200',
            'isi' => 'required|string',
            'id_kategori' => 'nullable|integer|exists:kategori,id',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'slug' => 'nullable|string|unique:artikel,slug,' . $id,
            'enabled' => 'sometimes|boolean',
            'headline' => 'sometimes|boolean',
        ];
    }
}
