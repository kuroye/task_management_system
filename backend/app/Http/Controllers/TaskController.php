<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Task;
use App\Models\User;
use App\Models\Enrollment;
use App\Enums\ServerStatus;
use App\Models\TaskStatus;
use App\Http\Controllers\TaskStatusController;
use Illuminate\Support\Facades\Crypt;



class TaskController extends Controller
{


    public function store(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);
        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);
        
        //add new task
        $fields = $request->validate([
            'title' => 'required|max:50|string',
            'description' => 'max:200|string',
            'group_id' => 'required|int',
            'difficulty' => 'int'
        ]);

        switch ($fields['difficulty']) {

            case 1:
                $xp = rand(10, 50);
                break;
            case 2:
                $xp = rand(50, 300);
                break;
            case 3:
                $xp = rand(300, 600);
                break;
        }



        $task = Task::create([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'group_id' => $fields['group_id'],
            'difficulty' => $fields['difficulty'],
            'xp' => $xp,
        ]);

        $task['sumbitted']=0;
        $task['creator']=$id;

        $users = Enrollment::where('group_id', $fields['group_id'])->get();

        foreach ($users as $user) {

            TaskStatus::create([
                'task_id' => $task['id'],
                'user_id' => $user['user_id']
            ]);
        }

        return response()->json(['task' => $task]);
    }


    public function group_task_user(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);
        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);

        $group_id = $request->query('group_id');

        $tasks =  Task::where('group_id', $group_id)->get();

        $task_arr = [];
        $check_obj = new TaskStatusController;

        for ($i = 0; $i < count($tasks); $i++) {

            if ($check_obj->check_has_task($tasks[$i], $id)) {

                $tasks[$i]['submitted'] = boolval(TaskStatus::where('task_id', $tasks[$i]['id'])
                ->where('user_id', $id)->get('submitted')[0]['submitted']);
                array_push($task_arr, $tasks[$i]);
            }
        }


        $creator_id = Group::where('id', $group_id)->get('creator');
        $creator = User::find($creator_id)[0];



        return response()->json(
            [
                'creator' => $creator,
                'task_arr' => $task_arr
            ]
        );
    }

    public function all_task_user(Request $request)
    {
        $object = new TokenController;
        $token = $object->get_token($request);
        $decrypted_token = Crypt::decryptString($token);

        list($id, $time) = explode(',', $decrypted_token);
        $id = intval($id);

        $tasks_id =  TaskStatus::where('user_id', $id)->orderBy('created_at', 'desc')->get('task_id');

        $task_arr = [];

       
        for ($i = 0; $i < count($tasks_id); $i++) {
            $task_arr[$i] = Task::find($tasks_id[$i])[0];
        }

        $n = $request->query('limit');
        $res = [];

        if (!$n) {
            $n = count($task_arr);
        }

        for ($i = 0; $i < $n; $i++) {

            try {
                $res[$i] = $task_arr[$i];
            } catch (\Throwable $th) {
                break;
            }
            
            // $tasks[$i]['submitted'] = boolval(TaskStatus::where('task_id', $tasks[$i]['id'])
            // ->where('user_id', $id)->get('submitted')[0]['submitted']

            $submitted = TaskStatus::where('task_id', $res[$i]['id'])
            ->where('user_id', $id)->get('submitted');
            $creator = Group::where('id', $res[$i]['group_id'])->get('creator');
            $res[$i]['creator'] = User::find($creator)[0];
            $res[$i]['submitted'] = boolval($submitted[0]['submitted']) ;
        }

        return response()->json(
            $res
        );
    }
}
