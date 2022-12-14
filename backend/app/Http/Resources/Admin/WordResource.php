<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class WordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'pinin' => $this->pinin,
            'score' => $this->score,
            'translations' => TranslationResource::collection($this->whenLoaded('translations')),
            'examples' => ExampleResource::collection($this->whenLoaded('examples')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
