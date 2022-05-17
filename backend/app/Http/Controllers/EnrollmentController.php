<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\TokenController;
use App\Models\Enrollment;
use App\Models\User;
use App\Models\Group;
use Illuminate\Support\Facades\Crypt;

class EnrollmentController extends Controller
{
    //
    public function add_member(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);
        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);
        
        $data = $request->validate([
            'group_id' => 'required|int',
            'username' => 'required|string',
        ]);

        $user_id = User::where('username',$data['username'])->first()->id;
        
        if(!$user_id)
        {
            return response()->json(['message' => 'User does not exist'], 400);
        }elseif($user_id==$id)
        {
            return response()->json(['message' => 'You are the owner'], 400);
        }

        $exist =  Enrollment::where('group_id', '=', $data['group_id'])
            ->where('user_id', '=', $user_id)
            ->exists();

        if ($exist) {
            return response()->json(['message' => 'User exists in this group'], 400);
        }


        Enrollment::create(
            [
                'group_id' => $data['group_id'],
                'user_id' => $user_id
            ]
        );


        return User::find($user_id);
    }

    public function enrolled_groups(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);

        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);
        
        $groups_id =  Enrollment::where('user_id', $id)->get('group_id');

        $group_arr = [];

        for ($i=0; $i < count($groups_id); $i++) { 

            $group_arr[$i]= Group::find($groups_id[$i])[0];
        }
        
        return response()->json(
            $group_arr    
        );
    }

    public function exist_users(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);

        $group_id = $request->query('group_id');

        $users =  Enrollment::where('group_id', $group_id)->get();

        $user_arr = [];
        
        for ($i=0; $i < count($users); $i++) { 
            $user_arr[$i]= User::find($users[$i])[0];
        }
        return response()->json(
            $user_arr
        );
    }


    // public function outsider_users(Request $request)
    // {
    //     $object = new TokenController;
    //     $token = $object->get_token($request);

    //     $group_id = $request->query('group_id');

    //     //get all user_id who enrolled group
    //     $exist_users_id = Enrollment::where('group_id', $group_id)->get('user_id');
    //     return $exist_users_id;


    //     $user_arr=[];

    //     $num = count(User::all()) - count($exist_users_id);
    //     for ($i=0; $i < $num; $i++) { 
    //         $user_arr[$i] = User::where('id','!=',$exist_users_id)->get();
    //     }
   
        
    //     return response()->json(
    //         $users
    //     );
    // }
}
