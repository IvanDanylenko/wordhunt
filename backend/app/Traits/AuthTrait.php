<?php

namespace App\Traits;

use App\Models\Users\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Token;

trait AuthTrait
{

    public function __construct()
    {
        /**
         * Set the default guard to use
         */
        auth()->shouldUse($this->guard);
    }

    /**
     * Generate JWT tokens for user
     */
    public function login(Request $request): JsonResponse
    {
        $this->validateRequest($request);

        $credentials = request(['email', 'password']);
        $token = auth()->attempt($credentials);

        if (!$token) {
            return response()->json([
                'message' => 'These credentials do not match our records.',
            ], 422);
        }

        /** @var User */
        $user = auth()->user();

        return $this->respondWithToken($token, $user->generateRefreshToken());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refreshToken(): JsonResponse
    {
        $refreshToken = request()->input('refresh_token');
        if (!$refreshToken) {
            abort(401, 'Refresh token not provided');
        }
        // validate refresh token if not expired etc.
        $payload = JWTAuth::manager()->decode(new Token($refreshToken));

        try {
            //invalidate access token
            if (auth()->hasUser()) {
                /** @var JWTAuth */
                $auth = auth();
                $auth->invalidate();
            }
        } catch (TokenExpiredException $ex) {
            // Token already expired
        }

        $userId = $payload->get('sub');
        $userType = $payload->get('user');

        /** @var User $user */
        $user = ('App\\Models\\Users\\' . $userType)::findOrFail($userId);

        JWTAuth::manager()->invalidate(new Token($refreshToken));

        return $this->respondWithToken($user->generateAccessToken(), $user->generateRefreshToken());
    }

    protected function validateRequest(Request $request): void
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:8'],
        ]);
    }

    protected function respondWithToken(string $accessToken, string $refreshToken): JsonResponse
    {
        return response()->json([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ]);
    }
}
