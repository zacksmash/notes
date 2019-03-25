<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('login', 'Auth\LoginController@login')
        ->name('login');

    Route::post('register', 'Auth\RegisterController@register')
        ->name('register');

    Route::post('password/remind', 'Auth\ForgotPasswordController@sendResetLinkEmail')
        ->name('password.email');

    Route::post('password/reset', 'Auth\ResetPasswordController@reset')
        ->name('password.update');

    Route::post('email/verify/{id}', 'Auth\VerificationController@verify')
        ->name('verification.verify');

    Route::post('email/resend', 'Auth\VerificationController@resend')
        ->name('verification.resend');

    Route::middleware('auth')->group(function () {
        Route::post('logout', 'Auth\LoginController@logout')
            ->name('logout');

        Route::get('refresh', 'Auth\LoginController@refresh')
            ->name('refresh');

        Route::get('user', 'Auth\LoginController@user')
            ->name('user');
    });
});

Route::middleware('auth')->group(function () {
    Route::apiResource('notes', 'NoteController');
});
