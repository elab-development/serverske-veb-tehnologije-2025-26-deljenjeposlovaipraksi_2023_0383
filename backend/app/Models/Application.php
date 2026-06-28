<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
    protected $fillable = [
        'job_seeker_id',
        'job_listing_id',
        'status',
        'applied_at'
    ];

    public function jobSeeker(){
        return $this->belongsTo(JobSeeker::class);
    }

    public function jobListing(){
        return $this->belongsTo(JobListing::class);
    }
}
