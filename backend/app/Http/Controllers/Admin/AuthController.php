<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Traits\AuthTrait;

class AuthController extends Controller
{
    use AuthTrait;

    /**
     * The guard to be used during authentication.
     */
    protected $guard = 'admin';
}
