<?php

namespace App\Models\Users;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

abstract class User extends Authenticatable implements JWTSubject
{
    use HasFactory, UsesUuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            // add user type (Admin or Client)
            'user' => class_basename($this->getMorphClass()),
        ];
    }

    /**
     * Generates access token
     */
    public function generateAccessToken(): string
    {
        $token = JWTAuth::fromUser($this);
        auth()->login($this);

        return $token;
    }

    /**
     * Generates refresh token
     */
    public function generateRefreshToken(): string
    {
        $ttl = config('jwt.refresh_ttl');
        $token = JWTAuth::customClaims(['exp' => now()->addMinutes($ttl)->timestamp])->fromUser($this);

        return $token;
    }
}
