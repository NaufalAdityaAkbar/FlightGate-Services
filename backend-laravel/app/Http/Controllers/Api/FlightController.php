<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource.
     * Public access.
     */
    public function index()
    {
        // Order by scheduled time
        $flights = Flight::orderBy('scheduled_time', 'asc')->get();
        return response()->json($flights);
    }

    /**
     * Store a newly created resource in storage.
     * Admin access only.
     */
    public function store(Request $request)
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

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $flight = Flight::find($id);
        if (!$flight) {
            return response()->json(['message' => 'Flight not found'], 404);
        }
        return response()->json($flight);
    }

    /**
     * Update the specified resource in storage.
     * Admin access only.
     */
    public function update(Request $request, $id)
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

    /**
     * Remove the specified resource from storage.
     * Admin access only.
     */
    public function destroy($id)
    {
        $flight = Flight::find($id);
        if (!$flight) {
            return response()->json(['message' => 'Flight not found'], 404);
        }

        $flight->delete();

        return response()->json(['message' => 'Flight deleted successfully']);
    }
}
