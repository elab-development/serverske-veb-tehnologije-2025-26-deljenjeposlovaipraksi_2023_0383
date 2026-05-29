<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ApplicationTestController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobListingController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/jobs', [JobListingController::class, 'store']);
Route::resource('applications',ApplicationController::class);
Route::get('/company',[CompanyController::class, 'index'])->name('company');
Route::get('/users',[UserController::class,'index']);
Route::get('/users/{id}',[UserController::class, 'show']);
Route::post('/login',    [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:job_seeker')->group(function () {
        Route::get('/job-seeker/profile', [JobSeekerController::class, 'show']);
        Route::put('/job-seeker/profile', [JobSeekerController::class, 'update']);
    });

    Route::middleware('role:company')->group(function () {
        Route::get('/company/profile', [CompanyController::class, 'show']);
        Route::put('/company/profile', [CompanyController::class, 'update']);
    });
});