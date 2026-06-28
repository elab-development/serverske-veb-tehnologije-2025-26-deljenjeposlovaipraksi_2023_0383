<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
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
        $company = $request->user()->company;

        if (is_null($company)) {
            return response()->json([
                'message' => 'Profile not found.'
            ], 404);
        }

        return response()->json($company);
    }

    public function edit(Company $company)
    {
        //
    }

    public function update(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'company_name' => 'sometimes|string|max:255',
            'website'      => 'sometimes|nullable|url',
            'location'     => 'sometimes|nullable|string|max:255',
            'company_size' => 'sometimes|nullable|in:0-50,50-100,100-500,500-1000,1000+',
            'description'  => 'sometimes|nullable|string',
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
            'company_name',
            'website',
            'location',
            'company_size',
            'description'
        ]));

        return response()->json([
            'message' => 'Profile updated successfully.',
            'company' => $company
        ]);
    }

    public function destroy(Request $request) 
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