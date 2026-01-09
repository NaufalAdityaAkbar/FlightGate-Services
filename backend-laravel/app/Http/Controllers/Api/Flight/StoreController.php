<?php

namespace App\Http\Controllers\Api\Flight;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'airline' => 'required|string|max:255',
            'flight_code' => 'required|string|max:20',
            'destination' => 'required|string|max:255',
            'gate' => 'required|string|max:10',
            'scheduled_time' => 'required|date_format:H:i',
            'status' => 'required|string',
        ]);

        $flight = Flight::create($validated);

        return response()->json($flight, 201);
    }
}
