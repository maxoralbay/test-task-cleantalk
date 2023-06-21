<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('/user', 'AuthController@user');
    $router->get('/map/info', 'MapController@info');
    $router->post('/map/calc/triangulate', 'MapController@calcTriangulate');
    $router->post('/map/calc/distance', 'MapController@calcDistance');
});
