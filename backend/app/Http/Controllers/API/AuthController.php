<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\JobSeeker;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function register(Request $request){
        $commonRules = [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:job_seeker,company',
        ];

        $roleRules = [];

        if($request->role === 'job_seeker'){
            $roleRules = [
                'firstName' => 'required|string|max:255',
                'lastName'  => 'required|string|max:255',
                'phone'     => 'nullable|string|max:20',
                'location'  => 'nullable|string|max:255',
                'bio'       => 'nullable|string',
                'education' => 'nullable|string|max:255',
                'github_url'=> 'nullable|url',
            ];
        } elseif ($request->role === 'company') {
            $roleRules = [
                'companyName' => 'required|string|max:255',
                'website'     => 'nullable|url',
                'location'    => 'nullable|string|max:255',
                'companySize' => 'nullable|string|max:50',
                'description' => 'nullable|string',
            ];
        }

        $validator = Validator::make($request->all(),array_merge($commonRules,$roleRules));

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors()
            ],422);
        }

        $user = User::create([
            'name'     => $request->role === 'company'
                            ? $request->companyName
                            : $request->firstName . ' ' . $request->lastName,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role,
        ]);

        if($request->role === 'job_seeker'){
            JobSeeker::create([
                'user_id'   => $user->id,
                'firstName' => $request->firstName,
                'lastName'  => $request->lastName,
                'phone'     => $request->phone,
                'location'  => $request->location,
                'bio'       => $request->bio,
                'education' => $request->education,
                'github_url'=> $request->github_url,
            ]);
        }elseif ($request->role === 'company') {
            Company::create([
                'user_id'     => $user->id,
                'companyName' => $request->companyName,
                'website'     => $request->website,
                'location'    => $request->location,
                'companySize' => $request->companySize,
                'description' => $request->description,
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $user->load($request->role === 'job_seekr' ? 'job_seeker' : 'company');

        return response()->json([
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }
}
