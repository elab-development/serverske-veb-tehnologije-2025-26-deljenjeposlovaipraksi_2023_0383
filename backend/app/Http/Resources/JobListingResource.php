<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobListingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'job_listing';
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->resource->id,
            'title'            => $this->resource->title,
            'description'      => $this->resource->description,
            'location'         => $this->resource->location,
            'type'             => $this->resource->type,
            'experience_level' => $this->resource->experience_level,
            'salary_min'       => $this->resource->salary_min,
            'salary_max'       => $this->resource->salary_max,
            'is_active'        => $this->resource->is_active,
            'expires_at'       => $this->resource->expires_at,
            'company'          => new CompanyResource($this->resource->company),
        ];
    }
}
