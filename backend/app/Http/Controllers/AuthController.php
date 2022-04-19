<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request){

        $username = $request->input('username');
        $password = $request->input('password');


        return response()->json([
            'message' => 'Post successfully',
            'username' => $username,
            'password' => $password
        ]);
    }
    public function register(Request $request){
        $username = $request->input('username');
        $fullname = $request->input('fullname');
        $email = $request->input('email');
        $avatar = $request->input('avatar');
        $password = $request->input('password'); 



        return response()->json([
            'message' => 'Post successfully',
            'username' => $username,
            'password' => $password
        ]);
    }
}
