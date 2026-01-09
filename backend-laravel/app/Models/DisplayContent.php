<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisplayContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_key',
        'title',
        'content',
        'image_path',
    ];
}
