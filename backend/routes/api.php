<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskStatusController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;


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

// login register
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);

//user
Route::get('/all_users', [UserController::class, 'all_users']);
Route::get('/user', [UserController::class, 'show']);
Route::put('/user_update', [UserController::class, 'update']);
//image
Route::post('/upload_avatar', [UserController::class, 'image']);

Route::get('/user2', [UserController::class, 'get_user']);
//add a member to the group
Route::post('/add_member', [EnrollmentController::class, 'add_member']);
//create a new group
Route::post('/groups', [GroupController::class, 'store']);

//get all group which that user enrolled
Route::get('/enrolled_groups', [EnrollmentController::class, 'enrolled_groups']);
//get all user who enrolled in that group
Route::get('/exist_users', [EnrollmentController::class, 'exist_users']);
//get all user who did not enroll in that group
Route::get('/outsider_users', [EnrollmentController::class, 'outsider_users']);


//task
Route::post('/add_task', [TaskController::class, 'store']);

Route::get('/all_task_user', [TaskController::class, 'all_task_user']);
Route::get('/group_task_user', [TaskController::class, 'group_task_user']);




//file
Route::post('/upload_file', [TaskStatusController::class, 'upload']);
Route::post('/mark_done', [TaskStatusController::class, 'finish']);
Route::get('/get_submissions', [TaskStatusController::class, 'all_submitted_work']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
