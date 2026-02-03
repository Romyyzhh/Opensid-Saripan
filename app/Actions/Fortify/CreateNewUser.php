<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $this->ensureIsNotRateLimited();

        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);
    }

    /**
     * Ensure the registration request is not rate limited.
     */
    protected function ensureIsNotRateLimited(): void
    {
        if (RateLimiter::tooManyAttempts('register:'.request()->ip(), 5)) {
            $seconds = RateLimiter::availableIn('register:'.request()->ip());

            throw ValidationException::withMessages([
                'email' => [__('Terlalu banyak percobaan pendaftaran. Silakan coba lagi dalam :seconds detik.', ['seconds' => $seconds])],
            ]);
        }

        RateLimiter::hit('register:'.request()->ip(), 3600); // 1 hour decay
    }
}
