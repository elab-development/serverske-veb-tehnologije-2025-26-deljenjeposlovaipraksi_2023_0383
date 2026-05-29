<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $company = Company::all();
        return $company;
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
    public function show(Company $company)
    {
        $company = $request->user()->company;

        if (is_null($company)) {
            return response()->json([
                'message' => 'Profile not found.'
            ], 404);
        }

        return response()->json($company);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        $validator = Validator::make($request->all(), [
            'companyName' => 'sometimes|string|max:255',
            'website'     => 'sometimes|nullable|url',
            'location'    => 'sometimes|nullable|string|max:255',
            'companySize' => 'sometimes|nullable|string|max:50',
            'description' => 'sometimes|nullable|string',
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
                'message' => 'Profile not found.'
            ], 404);
        }

        $company->update($request->only([
            'companyName',
            'website',
            'location',
            'companySize',
            'description'
        ]));

        return response()->json([
            'message' => 'Profile updated successfully.',
            'company' => $company
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company = $request->user()->company;

        if (is_null($company)) {
            return response()->json([
                'message' => 'Profile not found.'
            ], 404);
        }

        $company->delete();

        return response()->json([
            'message' => 'Profile deleted successfully.'
        ]);
    }
}
