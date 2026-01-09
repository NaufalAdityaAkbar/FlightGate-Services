<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('display_contents', function (Blueprint $table) {
            $table->id();
            $table->string('section_key')->unique(); // e.g., 'header', 'announcement', 'footer'
            $table->string('title')->nullable();
            $table->text('content')->nullable();
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('display_contents');
    }
};
