<?php

namespace App\Http\Controllers\Api\Flight;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use Illuminate\Http\Request;

class UpdateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $id)
    {
        $flight = Flight::find($id);
        if (!$flight) {
            return response()->json(['message' => 'Flight not found'], 404);
        }

        $validated = $request->validate([
            'airline' => 'sometimes|required|string|max:255',
            'flight_code' => 'sometimes|required|string|max:20',
            'destination' => 'sometimes|required|string|max:255',
            'gate' => 'sometimes|required|string|max:10',
            'scheduled_time' => 'sometimes|required|date_format:H:i',
            'status' => 'sometimes|required|string',
        ]);

        $flight->update($validated);

        return response()->json($flight);
    }
}
