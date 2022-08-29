<?php

namespace App\Models\Base;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;

class Model extends BaseModel
{
    use UsesUuid, HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $perPage = 10;
}
