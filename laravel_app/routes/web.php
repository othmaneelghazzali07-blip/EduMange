<?php

use App\Http\Controllers\actionController;
use App\Http\Controllers\CalculatriceController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\formController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Tp4Controller;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;






Route::get('/recherche',[Tp4Controller::class,'index'])->name('form_get');

Route::post('/recherche',[Tp4Controller::class,'find'])->name('form_post');



Route::get('/',function(){
    return view('welcome');
});
Route::get('/test/{param?}', function($n) {
    return view('test',['n'=>$n]);
});