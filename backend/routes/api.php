<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobListingController;
use App\Http\Controllers\JobSeekerController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::get('/job-listings',        [JobListingController::class, 'index']);
Route::get('/job-listings/search', [JobListingController::class, 'search']);
Route::get('/job-listings/{id}',   [JobListingController::class, 'show']);

Route::get('/users',      [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/job-seeker/profile',    [JobSeekerController::class, 'show']);
    Route::put('/job-seeker/profile',    [JobSeekerController::class, 'update']);
    Route::delete('/job-seeker/profile', [JobSeekerController::class, 'destroy']);

    Route::get('/company/profile',    [CompanyController::class, 'show']);
    Route::put('/company/profile',    [CompanyController::class, 'update']);
    Route::delete('/company/profile', [CompanyController::class, 'destroy']);

    Route::resource('job-listings', JobListingController::class)
         ->only(['store', 'update', 'destroy']);

    Route::resource('applications', ApplicationController::class);
});

Route::fallback(function () {
    return response()->json([
        'message' => 'Stranica nije pronadjena'
    ], 404);
});