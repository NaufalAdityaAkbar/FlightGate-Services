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
            'type' => 'required|in:DEPARTURE,ARRIVAL',
            'airline' => 'required|string|max:255',
            'flight_code' => 'required|string|max:20',
            'destination' => 'required|string|max:255',
            'terminal' => 'required|string|max:50',
            'gate' => 'required|string|max:10',
            'check_in_counter' => 'nullable|string|max:20',
            'scheduled_time' => 'required', // Allowing standard time formats
            'status' => 'required|string',
            'remarks' => 'nullable|string|max:255',
        ]);

        $flight = Flight::create($validated);

        return response()->json($flight, 201);
    }
}
