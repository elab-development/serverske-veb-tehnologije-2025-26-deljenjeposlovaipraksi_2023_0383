<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'company';
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->resource->id,
            'company_name' => $this->resource->company_name,
            'website'      => $this->resource->website,
            'location'     => $this->resource->location,
            'company_size' => $this->resource->company_size,
            'description'  => $this->resource->description,
            'user'         => new UserResource($this->resource->user),
        ];
    }
}
