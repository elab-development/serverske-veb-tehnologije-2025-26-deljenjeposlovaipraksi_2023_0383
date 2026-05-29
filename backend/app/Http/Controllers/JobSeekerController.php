<?php

namespace App\Http\Controllers;

use App\Models\JobSeeker;
use Illuminate\Http\Request;

class JobSeekerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(JobSeeker $jobSeeker)
    {
        $jobSeeker = $request->user()->jobSeeker;

        if (is_null($jobSeeker)) {
            return response()->json([
                'message' => 'Profile not found.'
            ], 404);
        }

        return response()->json($jobSeeker);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobSeeker $jobSeeker)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JobSeeker $jobSeeker)
    {
        $validator = Validator::make($request->all(), [
            'firstName'  => 'sometimes|string|max:255',
            'lastName'   => 'sometimes|string|max:255',
            'phone'      => 'sometimes|nullable|string|max:20',
            'location'   => 'sometimes|nullable|string|max:255',
            'bio'        => 'sometimes|nullable|string',
            'education'  => 'sometimes|nullable|string|max:255',
            'github_url' => 'sometimes|nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $jobSeeker = $request->user()->jobSeeker;

        if (is_null($jobSeeker)) {
            return response()->json([
                'message' => 'Profile not found.'
            ], 404);
        }

        $jobSeeker->update($request->only([
            'firstName',
            'lastName',
            'phone',
            'location',
            'bio',
            'education',
            'github_url'
        ]));

        return response()->json([
            'message'    => 'Profile updated successfully.',
            'job_seeker' => $jobSeeker
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobSeeker $jobSeeker)
    {
        $jobSeeker = $request->user()->jobSeeker;

        if (is_null($jobSeeker)) {
            return response()->json([
                'message' => 'Profile not found.'
            ], 404);
        }

        $jobSeeker->delete();

        return response()->json([
            'message' => 'Profile deleted successfully.'
        ]);
    }
}
