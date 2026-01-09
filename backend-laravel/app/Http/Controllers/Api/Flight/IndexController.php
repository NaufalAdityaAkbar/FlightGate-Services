<?php

namespace App\Http\Controllers\Api\Flight;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $flights = Flight::orderBy('scheduled_time', 'asc')->get();
        return response()->json($flights);
    }
}
