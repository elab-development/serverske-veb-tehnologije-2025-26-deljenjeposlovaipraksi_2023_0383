<?php

namespace App\Http\Controllers;
use App\Models\JobListing;

use Illuminate\Http\Request;

class JobListingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id'       => 'required|exists:companies,id',
            'title'            => 'required|string|max:255',
            'location'         => 'required|string|max:255',
            'type'             => 'required|in:posao,praksa',
            'experience_level' => 'required|in:intern,junior,medior,senior',
            'salary_min'       => 'nullable|numeric|min:0',
            'salary_max'       => 'nullable|numeric|min:0|gte:salary_min',
            'is_active'        => 'boolean',
            'description'      => 'required|string',
            'expire_at'        => 'nullable|date|after:today',
        ]);

        $job = JobListing::create([
            'company_id'       => $request->company_id,
            'title'            => $request->title,
            'location'         => $request->location,
            'type'             => $request->type,
            'experience_level' => $request->experience_level,
            'salary_min'       => $request->salary_min,
            'salary_max'       => $request->salary_max,
            'is_active'        => $request->is_active ?? true,
            'description'      => $request->description,
            'expire_at'        => $request->expire_at,
        ]);

        return response()->json(['message' => 'Job created successfully', 'jobListing' => $job], 201);
    }
}
