<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

use App\Exceptions\InvalidLogin;
use Illuminate\Http\Request;
use App\Models\User; 
use Carbon\Carbon;

class UserController extends Controller
{

    public function index()
    {
        //get all user
        return User::all();
    }

 
    public function store(Request $request)
    {
        //create a user
        $fields = $request->validate([
            'username' => 'required|unique:users|min:3|max:20|string',
            'email' => 'required|unique:users|email',
            'password' => 'required|confirmed|min:6|string'
        ]);

        
        $user = User::create([
            'username' => $fields['username'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $current_time = Carbon::now();

        // create a token by encrypt data
        $token = Crypt::encryptString($user['id'].','.$current_time);

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    

    public function login(Request $request)
    {
        $data = $request -> validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        

        if(!Auth::attempt($data))
        {
            throw new InvalidLogin();
        }

        $current_time = Carbon::now();
        $user = Auth::user();
    
        $token = Crypt::encryptString($user['id'].','.$current_time);

       
        //verify token
        // if(!$token)
        // {
        //     return response()->json(['message'=>'invalid token'],
        //     401);
        // }

        // $decrypted_token = Crypt::decryptString($token);
    

        
        
        // list($id, $time) = explode(',', $decrypted_token);
        // return $id;
       

        return response()->json(['message'=>'login successful',
                                    'user'=>$user,
                                    'token'=>$token],
            200);
        

    }

    public function logout(Request $request)
    {

        return [
            'message' => 'Logged out'
        ];
    }


    public function show($id)
    {
        //show a user
        return User::find($id);
    }

    
    public function update(Request $request, $id)
    {
        //update a user
        $user = User::find($id);
        $user->update($request->all());
        return $user;
    }

   
    public function destroy($id)
    {
        //delete a user
        return User::destroy($id);
    }

}
