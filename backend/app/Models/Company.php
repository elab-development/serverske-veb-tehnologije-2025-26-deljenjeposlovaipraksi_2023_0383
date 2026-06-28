<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'company_name',
        'website',
        'location',
        'company_size',
        'description'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function jobListing(){
        return $this->hasMany(JobListing::class);
    }
}
