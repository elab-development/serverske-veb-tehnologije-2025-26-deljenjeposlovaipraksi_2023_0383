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
    public function index()
    {
        $applications = Application::with(['jobSeeker','jobListing'])->get();
        return new ApplicationCollection($applications);
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
        $validated = $request->validate([
            'job_seeker_id' => 'required|exists:job_seekers,id',
            'job_listing_id' => 'required|exists:job_listings,id',
            'status' => 'required|in:accepted,pending,denied',
        ]);

        $exists = Application::where('job_seeker_id',$validated['job_seeker_id'])
            ->where('job_listing_id',$validated['job_listing_id'])->exists();

        if($exists){
            return response()->json([
                'message' => 'You have applied for this job'
            ], 409);
        }

        $application = Application::create([
            'job_seeker_id'  => $validated['job_seeker_id'],
            'job_listing_id' => $validated['job_listing_id'],
            'status'         => $validated['status'],
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