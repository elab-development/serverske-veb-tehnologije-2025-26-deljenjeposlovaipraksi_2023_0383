<?php

namespace App\Http\Controllers;

use App\Models\JobSeeker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobSeekerController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Request $request)
    {
        $jobSeeker = $request->user()->jobSeeker;

        if (is_null($jobSeeker)) {
            return response()->json([
                'message' => 'Profile not found.'
            ], 404);
        }

        return response()->json($jobSeeker);
    }

    public function edit(JobSeeker $jobSeeker)
    {
        //
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|string|max:255',
            'last_name'  => 'sometimes|string|max:255',
            'phone'      => 'sometimes|nullable|string|max:20',
            'location'   => 'sometimes|nullable|string|max:255',
            'bio'        => 'sometimes|nullable|string',
            'education'  => 'sometimes|nullable|in:osnovna_skola,srednja_skola,visa_skola,fakultet,master,doktorske_studije',
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
            'first_name',
            'last_name',
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

    public function destroy(Request $request)
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