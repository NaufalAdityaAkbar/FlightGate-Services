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
            'type' => 'sometimes|required|in:DEPARTURE,ARRIVAL',
            'airline' => 'sometimes|required|string|max:255',
            'flight_code' => 'sometimes|required|string|max:20',
            'destination' => 'sometimes|required|string|max:255',
            'terminal' => 'sometimes|required|string|max:50',
            'gate' => 'sometimes|required|string|max:10',
            'check_in_counter' => 'nullable|string|max:20',
            'scheduled_time' => 'sometimes|required',
            'status' => 'sometimes|required|string',
            'remarks' => 'nullable|string|max:255',
        ]);

        $flight->update($validated);

        return response()->json($flight);
    }
}
