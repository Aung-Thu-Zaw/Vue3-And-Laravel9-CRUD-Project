<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules=[
            "title"=>"required",
            "content"=>"required",
            "category_id"=>["required","exists:categories,id"]
        ];

        if ($this->hasFile("photo")) {
            $rules["photo"]=["required","image","mimes:png,jpg,gif,jpeg"];
        }

        return $rules;
    }

    public function attributes()
    {
        return["category_id"=>"category"];
    }
}
