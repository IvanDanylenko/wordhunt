<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\WordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
 |--------------------------------------------------------------------------
 | Admin API Routes
 |--------------------------------------------------------------------------
 |
 | Here is where you can register API routes for your application. These
 | routes are loaded by the RouteServiceProvider within a group which
 | is assigned the "api" middleware group. Enjoy building your API!
 |
 */

// Health check
Route::get('/admin-health-check', function () {
    return response()->json(['success' => true], 200);
})->name('admin-health-check');

Route::post('/login', [AuthController::class , 'login'])->name('login');

Route::post('/auth/refresh-token', [AuthController::class , 'refreshToken'])->name('refreshToken');

Route::middleware(['auth:admin'])->group(function () {
    Route::get('/me', function (Request $request) {
            return $request->user();
        }
        )->name('me');

        Route::get('/words/smallest-score', [WordController::class , 'getSmallestScore']);
        Route::apiResource('/words', WordController::class);

        Route::apiResource('/clients', ClientController::class)->only('index', 'show');
    });