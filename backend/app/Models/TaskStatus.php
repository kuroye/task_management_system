<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskStatus extends Model
{
    use HasFactory;

    protected $table = 'statuses';
    
    protected $fillable = [
        'task_id',
        'user_id',
        'mark',
        'finished',
        'file_path'
    ];
}
