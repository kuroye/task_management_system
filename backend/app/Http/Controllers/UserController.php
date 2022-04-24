<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\InvalidLogin;
use Illuminate\Http\Request;
use App\Models\User; 

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get all user
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //create a user
        $user = $request->validate([
            'username' => 'required|unique:users|min:3|max:20|string',
            'email' => 'required|unique:users|email',
            'password' => 'required|confirmed|min:6|string'
        ]);

        $user['password'] = Hash::make($user['password']);
        
        return User::create($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //show a user
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //update a user
        $user = User::find($id);
        $user->update($request->all());
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //delete a user
        return User::destroy($id);
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
        }else
        {
            $request->session()->regenerate();
            return response()->json(['message'=>'login successful'],
            200);
        }

    }

}
