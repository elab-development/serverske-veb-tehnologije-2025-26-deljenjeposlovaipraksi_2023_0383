<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobListingController;
use App\Http\Controllers\JobSeekerController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Javne rute
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Javne rute za pregled i pretragu oglasa
Route::get('/job-listings',        [JobListingController::class, 'index']);
Route::get('/job-listings/search', [JobListingController::class, 'search']);
Route::get('/job-listings/{id}',   [JobListingController::class, 'show']);

// Javne rute za korisnike
Route::get('/users',      [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

// Zaštićene rute
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // Job Seeker profil
    Route::get('/job-seeker/profile',    [JobSeekerController::class, 'show']);
    Route::put('/job-seeker/profile',    [JobSeekerController::class, 'update']);
    Route::delete('/job-seeker/profile', [JobSeekerController::class, 'destroy']);

    // Company profil
    Route::get('/company/profile',    [CompanyController::class, 'show']);
    Route::put('/company/profile',    [CompanyController::class, 'update']);
    Route::delete('/company/profile', [CompanyController::class, 'destroy']);

    // Job Listings — resource ruta samo za store, update, destroy
    Route::resource('job-listings', JobListingController::class)
         ->only(['store', 'update', 'destroy']);

    // Applications
    Route::resource('applications', ApplicationController::class);
});