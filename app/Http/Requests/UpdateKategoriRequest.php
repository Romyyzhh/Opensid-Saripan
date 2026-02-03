<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKategoriRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user() && ($this->user()->role ?? '') === 'admin';
    }

    public function rules()
    {
        $id = $this->route('kategori');

        return [
            'kategori' => 'required|string|max:100',
            'slug' => 'nullable|string|unique:kategori,slug,' . $id,
            'enabled' => 'sometimes|boolean',
        ];
    }
}
