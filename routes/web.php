<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/{any?}', 'app')
    ->where('any', '.*')
    ->name('app');

Route::get('email/verify/{id}', 'Auth\VerificationController@verify')
    ->name('verification.verify');

Route::view('password/reset/{token?}', 'app')
    ->name('password.reset');

Route::view('login', 'app')
    ->name('login');
