<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    protected $fillable = [
        'airline',
        'flight_code',
        'destination',
        'gate',
        'scheduled_time',
        'status',
    ];
}
