<?php

namespace App\Http\Controllers\Api\Content;

use App\Http\Controllers\Controller;
use App\Models\DisplayContent;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $contents = DisplayContent::all();
        // Return as key-value pair for easy frontend consumption
        $formatted = $contents->mapWithKeys(function ($item) {
            return [$item->section_key => $item];
        });
        
        return response()->json($formatted);
    }
}
