<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApplicationCollection;
use App\Http\Resources\ApplicationResource;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if($user->role === 'job_seeker'){
            $applications = Application::with(['jobSeeker','jobListing'])
                ->where('job_seeker_id',$user->job_seeker_id)
                ->get();

        }elseif($user->role === 'company'){
            $applications = Application::with(['jobSeeker','jobListing'])
                ->whereHas('jobListing', function ($q) use ($user){
                    $q->where('company_id',$user->company->id);
                })
                ->get();
        }else{
            return response()->json([
                'message' => 'Unautorized.'
            ],404);
        }

        return ApplicationResource::collection($applications);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $jobSeeker = $request->user()->jobSeeker;

        if (is_null($jobSeeker)) {
            return response()->json([
                'message' => 'Only job seekers can apply for jobs.'
            ], 403);
        }

        $validated = $request->validate([
            'job_listing_id' => 'required|exists:job_listings,id',
        ]);

        $exists = Application::where('job_seeker_id', $jobSeeker->id)
            ->where('job_listing_id', $validated['job_listing_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'You have already applied for this job.'
            ], 409);
        }

        $application = Application::create([
            'job_seeker_id'  => $jobSeeker->id,
            'job_listing_id' => $validated['job_listing_id'],
            'status'         => 'pending', 
            'applied_at'     => now(),
        ]);

        return new ApplicationResource($application);
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application)
    {
        $application->load(['jobSeeker','jobListing']);
        return new ApplicationResource($application);
    }

    /**
     * Show the form for editing the existing resource.
     */
    public function edit(Application $application)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Application $application)
    {
        $validated = $request->validate([
            'status' => 'required|in:accepted,pending,denied',
        ]);

        $application->update($validated);

        return new ApplicationResource($application);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Application $application)
    {
        $application->delete();

        return response()->json([
            'message' => 'Application deleted successfully'
        ],200);
    }
}