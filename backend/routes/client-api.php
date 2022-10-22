<?php

use App\Http\Controllers\Client\AuthController;
use App\Http\Controllers\Client\WordController;
use Illuminate\Support\Facades\Route;

/*
 |--------------------------------------------------------------------------
 | Client API Routes
 |--------------------------------------------------------------------------
 |
 | Here is where you can register API routes for your application. These
 | routes are loaded by the RouteServiceProvider within a group which
 | is assigned the "api" middleware group. Enjoy building your API!
 |
 */

// Health check
Route::get('/client-health-check', function () {
    return response()->json(['success' => true], 200);
})->name('client-health-check');

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::post('/auth/refresh-token', [AuthController::class, 'refreshToken'])->name('refreshToken');

Route::middleware(['auth:client'])->group(function () {
    Route::get('/me', [AuthController::class, 'me'])->name('me');

    Route::get('/words', [WordController::class, 'index'])->name('words.index');

    Route::get('/words/{id}', [WordController::class, 'show'])->name('words.show');

    Route::post('/words/{id}/increase-level', [WordController::class, 'increaseLevel'])->name('words.increaseLevel');

    Route::post('/words/change-status/new', [WordController::class, 'changeStatusNew'])->name('words.changeStatusNew');

    Route::post('/words/change-status/in-progress', [WordController::class, 'changeStatusInProgress'])->name('words.changeStatusInProgress');

    Route::post('/words/change-status/skipped', [WordController::class, 'changeStatusSkipped'])->name('words.changeStatusSkipped');
});

// TODO: Implement password management endpoints
// Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
//     ->middleware('guest')
//     ->name('password.email');

// Route::post('/reset-password', [NewPasswordController::class, 'store'])
//     ->middleware('guest')
//     ->name('password.update');

// Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
//     ->middleware(['auth', 'signed', 'throttle:6,1'])
//     ->name('verification.verify');

// Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
//     ->middleware(['auth', 'throttle:6,1'])
//     ->name('verification.send');

// Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
//     ->middleware('auth')
//     ->name('logout');