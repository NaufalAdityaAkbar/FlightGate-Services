<?php

namespace App\Http\Controllers;

use App\Models\InfoSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InfoSectionController extends Controller
{
    public function index()
    {
        $sections = InfoSection::where('is_active', true)
            ->orderBy('order')
            ->get();
        return response()->json($sections);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'position' => 'required|in:left,right',
            'order' => 'sometimes|integer',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = $validated;
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('info_sections', 'public');
            $data['image_path'] = $path;
        }

        $section = InfoSection::create($data);
        return response()->json($section, 201);
    }

    public function update(Request $request, InfoSection $infoSection)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'position' => 'sometimes|in:left,right',
            'order' => 'sometimes|integer',
            'is_active' => 'sometimes|boolean',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($infoSection->image_path) {
                Storage::disk('public')->delete($infoSection->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('info_sections', 'public');
        }

        $infoSection->update($validated);
        return response()->json($infoSection);
    }

    public function destroy(InfoSection $infoSection)
    {
        if ($infoSection->image_path) {
            Storage::disk('public')->delete($infoSection->image_path);
        }
        $infoSection->delete();
        return response()->json(null, 204);
    }
}
