<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Flight\IndexController as FlightIndex;
use App\Http\Controllers\Api\Flight\ShowController as FlightShow;
use App\Http\Controllers\Api\Flight\StoreController as FlightStore;
use App\Http\Controllers\Api\Flight\UpdateController as FlightUpdate;
use App\Http\Controllers\Api\Flight\DestroyController as FlightDestroy;
use App\Http\Controllers\Api\Content\IndexController as ContentIndex;
use App\Http\Controllers\Api\Content\UpdateController as ContentUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public Routes
Route::get('/flights', FlightIndex::class);
Route::get('/flights/{id}', FlightShow::class);
Route::get('/content', ContentIndex::class);
Route::get('/info-sections', [App\Http\Controllers\InfoSectionController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);

// Admin Routes (Protected)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/flights', FlightStore::class);
    Route::put('/flights/{id}', FlightUpdate::class);
    Route::delete('/flights/{id}', FlightDestroy::class);
    
    // Content Management
    // Note: Using POST for update to handle file uploads easier with form-data in some clients, 
    // but standard Laravel resources use PUT/PATCH. 
    // For file uploads in Laravel via PUT, _method=PUT is needed in form-data.
    Route::post('/content/{section_key}', ContentUpdate::class); 

    // Info Sections Management
    Route::post('/info-sections', [App\Http\Controllers\InfoSectionController::class, 'store']);
    Route::post('/info-sections/{infoSection}', [App\Http\Controllers\InfoSectionController::class, 'update']);
    Route::delete('/info-sections/{infoSection}', [App\Http\Controllers\InfoSectionController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
