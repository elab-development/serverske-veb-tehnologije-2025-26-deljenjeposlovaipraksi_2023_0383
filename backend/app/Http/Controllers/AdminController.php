<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\JobListing;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    private function isAdmin(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Nemate pristup.');
        }
    }

    public function index(Request $request)
    {
        $this->isAdmin($request);
        return response()->json(User::all());
    }

    public function destroy(Request $request, $id)
    {
        $this->isAdmin($request);
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Korisnik obrisan.']);
    }

    public function jobListings(Request $request)
    {
        $this->isAdmin($request);
        return response()->json(JobListing::with('company')->get());
    }

    public function deleteJobListing(Request $request, $id)
    {
        $this->isAdmin($request);
        $listing = JobListing::findOrFail($id);
        $listing->delete();
        return response()->json(['message' => 'Oglas obrisan.']);
    }

    public function applications(Request $request)
    {
        $this->isAdmin($request);
        return response()->json(Application::with(['jobSeeker', 'jobListing'])->get());
    }
}