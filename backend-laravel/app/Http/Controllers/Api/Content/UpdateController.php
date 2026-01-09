<?php

namespace App\Http\Controllers\Api\Content;

use App\Http\Controllers\Controller;
use App\Models\DisplayContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UpdateController extends Controller
{
    /**
     * Handle the incoming request.
     * Expects section_key to identify content.
     */
    public function __invoke(Request $request, $section_key)
    {
        $content = DisplayContent::firstOrNew(['section_key' => $section_key]);

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($content->image_path) {
                Storage::disk('public')->delete($content->image_path);
            }
            
            $path = $request->file('image')->store('content_images', 'public');
            $content->image_path = $path;
        }

        if ($request->has('title')) {
            $content->title = $validated['title'];
        }
        
        if ($request->has('content')) {
            $content->content = $validated['content'];
        }

        $content->save();

        return response()->json($content);
    }
}
