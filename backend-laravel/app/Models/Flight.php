<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'airline',
        'flight_code',
        'destination',
        'gate',
        'terminal',
        'check_in_counter',
        'scheduled_time',
        'status',
        'remarks',
    ];
}
