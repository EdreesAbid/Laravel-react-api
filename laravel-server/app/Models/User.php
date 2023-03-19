<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
	
	protected $fillable = ['title', 'first', 'last', 'gender', 'street_number', 'street_name', 'city', 'state', 'country', 'postcode', 'email', 'phone', 'picture'];
}
