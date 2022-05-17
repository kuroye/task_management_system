<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;
use App\Models\Group;
use Illuminate\Support\Facades\Crypt;


class GroupController extends Controller
{

    public function store(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);

        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);
        
        //create a group
        $fields = $request->validate([
            'name' => 'required|max:50|string',
            'description' => 'max:200|string'
        ]);

        $group = Group::create([
            'name' => $fields['name'],
            'description' => $fields['description'],
            'creator' => $id
        ]);

        Enrollment::create([
            'group_id' => $group['id'],
            'user_id' => $group['creator']
        ]);

        return response()->json($group);
    }
}
