<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Company;
use App\Models\JobSeeker;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{

    private function validateEmail(string $email): bool
{
    $apiKey = env('ABSTRACT_API_KEY');
    
    $response = \Http::get("https://emailvalidation.abstractapi.com/v1/", [
        'api_key' => $apiKey,
        'email'   => $email,
    ]);

    $data = $response->json();

    if (!$data['is_valid_format']['value']) {
        return false;
    }

    if ($data['is_disposable_email']['value']) {
        return false;
    }

    if ($data['deliverability'] !== 'DELIVERABLE') {
        return false;
    }

    return true;
}

    public function loginAdmin(Request $request){
        if(!Auth::guard('admin')->attempt($request->only('email','password'))){
            return response()->json(['message' => 'Unauthorized'],401);
        }

        $admin = Admin::where('email', $request['email'])->firstOrFail();

        $token = $admin->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'Hi '.$admin->name . ', welcome to admin home',
         'access_token' => $token, 'token_type' => 'Bearer']);
    }
    public function register(Request $request){
        $commonRules = [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:job_seeker,company',
        ];

        $roleRules = [];

        if($request->role === 'job_seeker'){
            $roleRules = [
                'first_name' => 'required|string|max:255',
                'last_name'  => 'required|string|max:255',
                'phone'     => 'nullable|string|max:20',
                'location'  => 'nullable|string|max:255',
                'bio'       => 'nullable|string',
                'education' => 'nullable|string|max:255',
                'github_url'=> 'nullable|url',
            ];
        } elseif ($request->role === 'company') {
            $roleRules = [
                'company_name' => 'required|string|max:255',
                'website'     => 'nullable|url',
                'location'    => 'nullable|string|max:255',
                'company_size' => 'nullable|string|max:50',
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
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role,
        ]);

        if($request->role === 'job_seeker'){
            JobSeeker::create([
                'user_id'   => $user->id,
                'first_name' => $request->first_name,
                'last_name'  => $request->last_name,
                'phone'     => $request->phone,
                'location'  => $request->location,
                'bio'       => $request->bio,
                'education' => $request->education,
                'github_url'=> $request->github_url,
            ]);
        }elseif ($request->role === 'company') {
            Company::create([
                'user_id'     => $user->id,
                'company_name' => $request->company_name,
                'website'     => $request->website,
                'location'    => $request->location,
                'company_size' => $request->company_size,
                'description' => $request->description,
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $user->load($request->role === 'job_seeker' ? 'jobSeeker' : 'company');

        return response()->json([
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }
        
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors'  => $validator->errors()
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        // Učitaj profil zavisno od role
        if ($user->role === 'job_seeker') {
            $user->load('jobSeeker');
        } elseif ($user->role === 'company') {
            $user->load('company');
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Hi ' . ($user->role === 'job_seeker'
                ? $user->jobSeeker->first_name
                : $user->company->company_name) . ', welcome back!',
            'data'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ]);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out.'
        ]);
    }
}
