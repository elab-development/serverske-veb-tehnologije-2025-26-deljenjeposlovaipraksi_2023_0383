<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'application';
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        return [
            'id'          => $this->resource->id,
            'status'      => $this->resource->status,
            'applied_at'  => $this->resource->applied_at,
            'job_listing' => $this->resource->jobListing,
            'job_seeker'  => $this->resource->jobSeeker,
        ];
    }
}
