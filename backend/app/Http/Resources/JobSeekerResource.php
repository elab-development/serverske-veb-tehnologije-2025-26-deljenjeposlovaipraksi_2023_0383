<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobSeekerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'job_seeker';
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->resource->id,
            'first_name' => $this->resource->first_name,
            'last_name'  => $this->resource->last_name,
            'education'  => $this->resource->education,
            'phone'      => $this->resource->phone,
            'location'   => $this->resource->location,
            'bio'        => $this->resource->bio,
            'github_url' => $this->resource->github_url,
            'user'       => new UserResource($this->resource->user),
        ];
    }
}
