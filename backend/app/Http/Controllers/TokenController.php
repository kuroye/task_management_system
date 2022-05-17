<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use App\Models\User;


class TokenController extends Controller
{
    // verify token
    public function verify_token($token)
    {
        if (!$token) {
            return response()->json(
                ['message' => 'invalid token'],
                401
            );
        }

        $decrypted_token = Crypt::decryptString($token);

        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);

        // if ($time - Carbon::now(). < 0) {
        //     return FALSE;
        // } else
        if (!User::find($id)) {
            
            return FALSE;
            
        }

        return TRUE;
    }

    public function get_token(Request $request)
    {
        if ($request->hasHeader('Authorization')) {
            //
            $token = $request->header('Authorization');

            $object = new TokenController;

            $token_verify = $object->verify_token($token);
            if(!$token_verify)
            {
                return response()->json(
                        [
                            'message' => 'Token error',
                        ],
                        401
                    );
            }

            return $token;
        }

        return response()->json(
            [
                'message' => 'No token',
            ],
            401
        );
    }

    
}
