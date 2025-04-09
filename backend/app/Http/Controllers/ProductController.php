<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
  public function listar(Request $request)
  {
    $query = $request->query();

    $produtos = DB::table("products")->select(['name', 'price'])->where( $query)->get();

    return response($produtos);
  }
  public function cadastrar(Request $request)
  {
    $name = $request->input("name");
    $price = $request->input("price");

    DB::table("products")->insert(["name" => $name, "price" => $price, "created_at" => now(), "updated_at" => now()]);


    return response("", 201);
  }
  public function atualizar(Request $request, $id)
  {
    $produto_atualizado = $request->only(["name", "price"]);

    DB::table("products")->where("id", $id)->update($produto_atualizado);
  }

  public function deletar($id)
  {
    $quantosdeletados = DB::table("products")->where("id", $id)->delete();
    if ($quantosdeletados > 0) {
      return response("", 200);
    }

    return response("", 404);
  }
}