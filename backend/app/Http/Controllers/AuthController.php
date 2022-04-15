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
        $name = $request->input('name');
        $lastname = $request->input('lastname');
        $email = $request->input('email');
        $image_path = $request->input('image_path');
        $password = $request->input('password');
        

        return response()->json([
            'message' => 'Post successfully',
            'username' => $username,
            'password' => $password
        ]);
    }
}
