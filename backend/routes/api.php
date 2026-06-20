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

// Javne rute za oglase
Route::get('/job-listings',        [JobListingController::class, 'index']);
Route::get('/job-listings/search', [JobListingController::class, 'search']);
Route::get('/job-listings/{id}',   [JobListingController::class, 'show']);

// Javne rute za korisnike
Route::get('/users',      [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // ─── JOB SEEKER rute ───────────────────────────────────────
    Route::prefix('job-seeker')->group(function () {

        // Profil
        Route::get('/profile',    [JobSeekerController::class, 'show']);
        Route::put('/profile',    [JobSeekerController::class, 'update']);
        Route::delete('/profile', [JobSeekerController::class, 'destroy']);

        // Aplikacije (job seeker podnosi i vidi svoje)
        Route::get('/applications',         [ApplicationController::class, 'index']);
        Route::post('/applications',        [ApplicationController::class, 'store']);
        Route::get('/applications/{id}',    [ApplicationController::class, 'show']);
        Route::delete('/applications/{id}', [ApplicationController::class, 'destroy']);
    });

    // ─── COMPANY rute ──────────────────────────────────────────
    Route::prefix('company')->group(function () {

        // Profil
        Route::get('/profile',    [CompanyController::class, 'show']);
        Route::put('/profile',    [CompanyController::class, 'update']);
        Route::delete('/profile', [CompanyController::class, 'destroy']);

        // Oglasi (company kreira i upravlja)
        Route::post('/job-listings',        [JobListingController::class, 'store']);
        Route::put('/job-listings/{id}',    [JobListingController::class, 'update']);
        Route::delete('/job-listings/{id}', [JobListingController::class, 'destroy']);

        // Aplikacije na oglas (company vidi ko se prijavio)
        Route::get('/job-listings/{id}/applications', [ApplicationController::class, 'index']);
        Route::put('/applications/{id}',              [ApplicationController::class, 'update']);
    });
});

Route::fallback(function () {
    return response()->json([
        'message' => 'Stranica nije pronadjena'
    ], 404);
});