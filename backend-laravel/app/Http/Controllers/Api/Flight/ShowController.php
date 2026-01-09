<?php

namespace App\Http\Controllers\Api\Flight;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use Illuminate\Http\Request;

class ShowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($id)
    {
        $flight = Flight::find($id);
        if (!$flight) {
            return response()->json(['message' => 'Flight not found'], 404);
        }
        return response()->json($flight);
    }
}
