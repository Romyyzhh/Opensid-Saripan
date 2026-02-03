<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKategoriRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user() && ($this->user()->role ?? '') === 'admin';
    }

    public function rules()
    {
        return [
            'kategori' => 'required|string|max:100',
            'slug' => 'nullable|string|unique:kategori,slug',
            'enabled' => 'sometimes|boolean',
        ];
    }
}
