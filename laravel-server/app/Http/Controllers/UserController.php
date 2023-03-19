<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class UserController extends Controller
{

    public function index()
    {
        return User::select('id', 'title', 'first', 'last', 'gender', 'street_number', 'street_name', 'city', 'state', 'country', 'postcode', 'email', 'phone', 'picture')->orderBy('id', 'DESC')->paginate(10);
    }

	 
    public function store(Request $request)
    {
        $request->validate([
			'title' =>'required|min:2|max:5',
			'first' =>'required|min:2|max:30',
			'last' =>'required|min:2|max:30',
			'gender' =>'required|min:1|max:10',
			'street_number' =>'required|numeric|min:1|max:999999',
			'street_name' =>'required|min:2|max:30',
			'city' =>'required|min:2|max:30',
			'state' =>'required|min:2|max:20',
			'country' =>'required|min:2|max:20',
			'postcode' =>'required|min:1|max:20',
			'email' =>'required|email|min:5|max:40',
			'phone' =>'required|min:5|max:15',
			'picture' =>'required|min:5|max:255'
        ]);

        try{
            User::create($request->post());

            return response()->json([
                'message'=>'User Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a user!!'
            ],500);
        }
    }

    public function show(User $user)
    {
        return response()->json([
            'user'=>$user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
			'title' =>'required|min:2|max:5',
			'first' =>'required|min:2|max:30',
			'last' =>'required|min:2|max:30',
			'gender' =>'required|min:1|max:10',
			'street_number' =>'required|numeric|min:1|max:999999',
			'street_name' =>'required|min:2|max:20',
			'city' =>'required|min:2|max:20',
			'state' =>'required|min:2|max:20',
			'country' =>'required|min:2|max:20',
			'postcode' =>'required|min:1|max:20',
			'email' =>'required|email|min:5|max:40',
			'phone' =>'required|min:5|max:15',
        ]);

        try{

            $user->fill($request->post())->update();

            return response()->json([
                'message'=>'User Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a user!!'
            ],500);
        }
    }

    public function destroy(User $user)
    {
        try {

            if($user->image){
                $exists = Storage::disk('public')->exists("user/image/{$user->image}");
                if($exists){
                    Storage::disk('public')->delete("user/image/{$user->image}");
                }
            }

            $user->delete();

            return response()->json([
                'message'=>'User Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a user!!'
            ]);
        }
    }
	
	public function export()
    {
        try {
			return response()->json([
                'message'=>'Something goes wrong while exporting users!!'
            ]);
            return User::select('id', 'title', 'first', 'last', 'gender', 'street_number', 'street_name', 'city', 'state', 'country', 'postcode', 'email', 'phone', 'picture')->orderBy('id', 'DESC')->get();
     
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while exporting users!!'
            ]);
        }
    }
	
}