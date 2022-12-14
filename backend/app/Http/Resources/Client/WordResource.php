<?php

namespace App\Http\Resources\Client;

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
            'translations' => TranslationResource::collection($this->whenLoaded('translations')),
            'examples' => ExampleResource::collection($this->whenLoaded('examples')),
        ];
    }
}
