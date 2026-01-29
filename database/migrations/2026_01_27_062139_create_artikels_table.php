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
        // Deprecated: schema consolidated into 2026_01_28_043339_create_admin_web_schema.php
        // Keep as no-op to avoid creating duplicate/overlapping tables. If 'artikels'
        // table already exists, skip.
        if (Schema::hasTable('artikels')) {
            return;
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artikels');
    }
};
