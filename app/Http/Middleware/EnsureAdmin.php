<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user || ($user->role ?? 'user') !== 'admin') {
            abort(403, 'Forbidden');
        }

        return $next($request);
    }
}
