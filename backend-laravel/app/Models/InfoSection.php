<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfoSection extends Model
{
    protected $fillable = [
        'title',
        'content',
        'image_path',
        'position',
        'order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer'
    ];
}
