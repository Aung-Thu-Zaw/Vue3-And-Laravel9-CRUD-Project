<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data= [
            "id"=>$this->id,
            "category_id"=>$this->category_id,
            "category"=>$this->category->name,
            "title"=>$this->title,
            "content"=>substr($this->content, 0, 50),
            "created_at"=>$this->created_at->toDateString()
        ];

        if ($this->photo) {
            $data["photo"]=env("APP_URL")."storage/".$this->photo;
        }

        return $data;
        return parent::toArray($request);
    }
}
