<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('village_info', function (Blueprint $table) {
            $table->id();
            $table->string('village_name');
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            $table->integer('population')->default(0);
            $table->decimal('area', 8, 2)->nullable();
            $table->text('address')->nullable();
            $table->string('head_name')->nullable();
            $table->string('head_photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('village_info');
    }
};
