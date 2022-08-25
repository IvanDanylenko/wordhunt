<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Users\Client;
use App\Traits\AuthTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use AuthTrait;

    /**
     * The guard to be used during authentication.
     */
    protected $guard = 'client';

    public function register(Request $request): JsonResponse
    {
        $this->validateRequest($request);

        // Additional validation on unique email
        $request->validate(['email' => 'unique:clients']);

        $attributes = request(['name', 'email']);
        $password = request('password');
        $client = new Client($attributes);
        $client->password = Hash::make($password);
        $client->save();

        return $this->respondWithToken($client->generateAccessToken(), $client->generateRefreshToken());
    }
}
