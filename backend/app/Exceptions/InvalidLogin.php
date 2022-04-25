<?php

namespace App\Exceptions;

use Exception;

class InvalidLogin extends Exception
{
    //
    public function render()
    {
        return Response([
            'message' => 'invalid login details',
        ], 400);
    }
}
