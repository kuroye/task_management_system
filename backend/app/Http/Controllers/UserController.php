<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\File;
use App\Models\Enrollment;

use App\Exceptions\InvalidLogin;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;

class UserController extends Controller
{
    public function all_users()
    {

        $users =  User::all();

        $user_arr = [];
        foreach($users as $user)
        {
            $groups_id =  Enrollment::where('user_id', $user['id'])->get('group_id');

            $func = function ($obj)
            {
                return $obj['group_id'];
            };
            $user['enrolled_groups'] = array_map($func, $groups_id->toArray());
           
        }
        
        return $users;
        
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
        $token = Crypt::encryptString($user['id'] . ',' . $current_time);

        $user = User::find($user['id']);
        
        $max_xp = pow($user['level'], 2) * 100;
        $user['max_xp'] = $max_xp;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }



    public function login(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);



        if (!Auth::attempt($data)) {
            throw new InvalidLogin();
        }

        $current_time = Carbon::now();
        $user = Auth::user();

        $token = Crypt::encryptString($user['id'] . ',' . $current_time);

        $max_xp = pow($user['level'], 2) * 100;
        $user['max_xp'] = $max_xp;

        return response()->json(
            [
                'message' => 'login successful',
                'user' => $user,
                'token' => $token
            ],
            200
        );
    }

    public function logout(Request $request)
    {

        return [
            'message' => 'Logged out'
        ];
    }


    public function show(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);

        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);

        $user = User::find($id);

        return response()->json($user);

    }


    public function update(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);

        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);

        $user = User::find($id);

        if ($user['username'] == $request->input('username')) {
            $fields = $request->validate([
                // 'username' => 'min:3|max:20|string|unique:users',
                'fullname' => 'max:100|string'
            ]);

            $user->update([
                'fullname' => $fields['fullname']
            ]);
        } else {
            $fields = $request->validate([
                'username' => 'min:3|max:20|string|unique:users',
                'fullname' => 'max:100|string'
            ]);

            $user->update([
                'username' => $fields['username'],
                'fullname' => $fields['fullname']
            ]);
        }


        return response()->json([
            'message' => 'update successful',
            'user' => $user
        ], 200);
    }


    public function image(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);

        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);

        $user = User::find($id);

        if($user['avatar'])
        {
            $path = '/images/'.$user['avatar'];
            if(File::exists($path))
            {
                File::delete($path);
            }
        }

        $request->validate([
            'avatar' => 'mimes:jpg,png,jpge'
        ]);

        $newImageName = time() .$user['id']. '-' . $request->avatar->extension();

        $request->avatar->move(public_path('images'), $newImageName);


        $host = $request->getSchemeAndHttpHost();
        $pathToFile = $host . '/images/' . $newImageName;

        $user->update([
            'avatar' => $pathToFile
        ]);

        // $host = $request->getSchemeAndHttpHost();
        // $pathToFile = $host . '/images/' . $user['avatar'];

        return response()->json(
            ['avatar' => $pathToFile]
        );
    }

    public function get_user(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);

        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);

        $user = User::find($id);

        return response()->json($user);
    }
}
