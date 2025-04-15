<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        
        if ($request->user()->cannot('viewAny', User::class)) {
            return response()->json([
                'success' => false,
                'message' => 'Acesso não autorizado'
            ], 403);
        }

        
        $users = User::select(['id', 'name', 'email', 'cpf', 'birthdate', 'created_at'])
                    ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }
}