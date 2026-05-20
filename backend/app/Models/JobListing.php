<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobListing extends Model
{
    use HasFactory;
    protected $fillable = [
        'company_id',
        'title',
        'description',
        'location',
        'type',
        'experience_level',
        'slary_min',
        'salary_max',
        'is_active'
    ];

    public function company(){
        return $this->belongsTo(Company::class);
    }

    public function application(){
        return $this->hasMany(Application::class);
    }
}
