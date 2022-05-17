<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Task;
use App\Models\User;
use App\Models\Enrollment;
use App\Enums\ServerStatus;
use App\Models\TaskStatus;

use Illuminate\Support\Facades\Crypt;
use phpDocumentor\Reflection\PseudoTypes\True_;

class TaskStatusController extends Controller
{
    //

    public function check_has_task($task, $user_id)
    {
        if (TaskStatus::where('task_id', $task['id'])
            ->where('user_id', $user_id)
            ->exists()
        ) {
            return True;
        }

        return False;
    }

    // public function is_submited($task, $user_id)
    // {
    //     if (TaskStatus::where('task_id', $task['id'])
    //         ->where('user_id', $user_id)->get('submitted')
    //     ) {
    //         return True;
    //     }

    //     return False;
    // }

    public function finish(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);
        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);
        
        // $status_id = $request->input('status_id');

        $status_id = $request->input('status_id');

        $task_status = TaskStatus::where('id', $status_id)->get();
        
        $task = Task::where('id', $task_status[0]['task_id'])->get()[0];
        $user = User::where('id', $task_status[0]['user_id'])->get()[0];

        $user['xp'] = $user['xp'] + $task['xp'];
        
        $max_xp = pow($user['level'], 2) * 100;

        while ($user['xp'] >= $max_xp) {
            $user['level'] = $user['level'] + 1;
            if ($user['xp'] >= $max_xp) {
                $user['xp'] = $user['xp'] - $max_xp;
            }
            $max_xp = pow($user['level'], 2) * 100;
        }

        $user['max_xp'] = $max_xp;

        $task_status[0]->update([
            'finished' => TRUE
        ]);

        return response()->json([
            $user
        ]);
    }

    public function upload(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);

        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);

        // $task_id = $request->input('task_id');
        $task_status = TaskStatus::where('user_id', $id)->get()[0];
        // ->where('task_id', $task_id)->get()[0];
        // ->where('task_id', $task_id)->first();

        
        $request->validate([
            'file' => 'mimes:jpg,png,jpge,txt,docx,pdf,pptx,zip'
        ]);

        $newFileName = time() . $id . '-' . $request->file->extension();

        $request->file->move(public_path('files'), $newFileName);

        $host = $request->getSchemeAndHttpHost();
        $pathToFile = $host . '/files/' . $newFileName;

        $task_status->update([
            'file_path' => $pathToFile,
            'submitted' => TRUE
        ]);
        // $task_status['file_path'] = $pathToFile;
        // $task_status['submitted'] = TRUE;

        return response()->json();
    }

    public function all_submitted_work(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);

        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);

        $task_id = intval($request->query('task_id'));


        $group_id = Task::where('id',$task_id)->get('group_id')[0]['group_id'];
        $creator = Group::where('id',$group_id)->get('creator')[0]['creator'];

        if($creator == $id)  
        {
            $task_statuses = TaskStatus::where('task_id', $task_id)
            ->where('submitted',TRUE)
            ->get();
            
            for ($i=0; $i < count($task_statuses); $i++) { 
                $user_id = $task_statuses[$i]['user_id'];
                $task_statuses[$i]['user'] = User::where('id',$user_id)->get()[0];
                $task_statuses[$i]['finished'] = boolval($task_statuses[$i]['finished']);
                $task_statuses[$i]['submitted'] = boolval($task_statuses[$i]['submitted']);
            }
        }
        else
        {
            $task_statuses = [];
        }



        return response()->json($task_statuses);


    }
}
