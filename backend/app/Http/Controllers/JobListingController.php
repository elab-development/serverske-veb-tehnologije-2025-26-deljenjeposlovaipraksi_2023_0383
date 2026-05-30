<?php

namespace App\Http\Controllers;
use App\Models\JobListing;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobListingController extends Controller
{

    public function index(Request $request){
        $query = JobListing::with('company');

        if($request->has('location')){
            $query->where('location','like','%' . $request->location . '%'); 
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('experience_level')) {
            $query->where('experience_level', $request->experience_level);
        }

        if ($request->has('salary_min')) {
            $query->where('salary_min', '>=', $request->salary_min);
        }

        if ($request->has('salary_max')) {
            $query->where('salary_max', '<=', $request->salary_max);
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        $listings = $query->paginate($request->get('per_page', 10));

        if($listings->isEmpty()){
            return response()->json([
                'message' => 'No job listings found.'
            ], 404);
        }

        return response()->json($listings);
    }

    public function show($id){
        $job = JobListing::with('company')->find($id);

        if (is_null($job)) {
            return response()->json([
                'message' => 'Job listing not found.'
            ], 404);
        }

        return response()->json($job);
    }

    public function search(Request $request){
        $validator = Validator::make($request->all(), [
            'keyword'          => 'sometimes|string|max:255',
            'location'         => 'sometimes|string|max:255',
            'type'             => 'sometimes|in:posao,praksa',
            'experience_level' => 'sometimes|in:intern,junior,medior,senior',
            'salary_min'       => 'sometimes|integer|min:0',
            'salary_max'       => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $query = JobListing::with('company');

        if ($request->has('keyword')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->keyword . '%')
                  ->orWhere('description', 'like', '%' . $request->keyword . '%');
            });
        }

        if ($request->has('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('experience_level')) {
            $query->where('experience_level', $request->experience_level);
        }

        if ($request->has('salary_min')) {
            $query->where('salary_min', '>=', $request->salary_min);
        }

        if ($request->has('salary_max')) {
            $query->where('salary_max', '<=', $request->salary_max);
        }

        $results = $query->paginate($request->get('per_page', 10));

        if ($results->isEmpty()) {
            return response()->json([
                'message' => 'No job listings found.'
            ], 404);
        }

        return response()->json($results);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'            => 'required|string|max:255',
            'location'         => 'nullable|string|max:255',
            'type'             => 'required|in:posao,praksa',
            'experience_level' => 'nullable|in:intern,junior,medior,senior',
            'salary_min'       => 'nullable|numeric|min:0',
            'salary_max'       => 'nullable|numeric|min:0|gte:salary_min',
            'is_active'        => 'boolean',
            'description'      => 'required|string',
            'expires_at'       => 'nullable|date|after:today',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $company = $request->user()->company;

        if (is_null($company)) {
            return response()->json([
                'message' => 'Only companies can create job listings.'
            ], 403);
        }

        $job = JobListing::create([
            'company_id'       => $company->id,
            'title'            => $request->title,
            'location'         => $request->location,
            'type'             => $request->type,
            'experience_level' => $request->experience_level,
            'salary_min'       => $request->salary_min,
            'salary_max'       => $request->salary_max,
            'is_active'        => $request->is_active ?? true,
            'description'      => $request->description,
            'expires_at'       => $request->expires_at,
        ]);

        return response()->json([
            'message'     => 'Job listing created successfully.',
            'job_listing' => $job
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title'            => 'sometimes|string|max:255',
            'location'         => 'sometimes|nullable|string|max:255',
            'type'             => 'sometimes|in:posao,praksa',
            'experience_level' => 'sometimes|nullable|in:intern,junior,medior,senior',
            'salary_min'       => 'sometimes|nullable|numeric|min:0',
            'salary_max'       => 'sometimes|nullable|numeric|min:0|gte:salary_min',
            'is_active'        => 'sometimes|boolean',
            'description'      => 'sometimes|string',
            'expires_at'       => 'sometimes|nullable|date|after:today',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors'  => $validator->errors()
            ], 422);
        }

        $company = $request->user()->company;

        if (is_null($company)) {
            return response()->json([
                'message' => 'Only companies can update job listings.'
            ], 403);
        }

        $job = JobListing::where('id', $id)
                         ->where('company_id', $company->id)
                         ->first();

        if (is_null($job)) {
            return response()->json([
                'message' => 'Job listing not found.'
            ], 404);
        }

        $job->update($request->only([
            'title',
            'location',
            'type',
            'experience_level',
            'salary_min',
            'salary_max',
            'is_active',
            'description',
            'expires_at'
        ]));

        return response()->json([
            'message'     => 'Job listing updated successfully.',
            'job_listing' => $job
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $company = $request->user()->company;

        if (is_null($company)) {
            return response()->json([
                'message' => 'Only companies can delete job listings.'
            ], 403);
        }

        $job = JobListing::where('id', $id)
                         ->where('company_id', $company->id)
                         ->first();

        if (is_null($job)) {
            return response()->json([
                'message' => 'Job listing not found.'
            ], 404);
        }

        $job->delete();

        return response()->json([
            'message' => 'Job listing deleted successfully.'
        ]);
    }
}
