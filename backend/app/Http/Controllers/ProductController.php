<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function listar()
    {
        return response([
            [
                "id" => 1,
                "name" => "Café",
                "products" => [
                  [ "id" => 1, "name" => "Café São Braz Tradicional 500g", "price" => 12.90 ],
                  [ "id" => 2, "name" => "Café São Braz Extra Forte 500g", "price" => 14.50 ],
                  [ "id" => 3, "name" => "Café São Braz Descafeinado 250g", "price" => 16.90 ],
                  [ "id" => 4, "name" => "Café São Braz Gourmet 250g", "price" => 18.90 ],
                  [ "id" => 5, "name" => "Café São Braz Orgânico 500g", "price" => 20.50 ]
                ]
              ],
              [
                "id" => 2,
                "name" => "PIPPOS",
                "products" => [
                  [ "id" => 6, "name" => "Pippos Queijo 200g", "price" => 3.90 ],
                  [ "id" => 7, "name" => "Pippos Churrasco 200g", "price" => 4.50 ],
                  [ "id" => 8, "name" => "Pippos Bacon 200g", "price" => 4.20 ],
                  [ "id" => 9, "name" => "Pippos Pizza 200g", "price" => 5.10 ],
                  [ "id" => 10, "name" => "Pippos Cheddar 200g", "price" => 3.80 ]
                ]
              ],
              [
                "id" => 3,
                "name" => "Novomilho",
                "products" => [
                  [ "id" => 11, "name" => "Fubá Novomilho Pacote 1kg", "price" => 5.90 ],
                  [ "id" => 12, "name" => "Canjica Novomilho 500g", "price" => 6.50 ],
                  [ "id" => 13, "name" => "Farinha de Milho Amarela 1kg", "price" => 7.20 ],
                  [ "id" => 14, "name" => "Polenta Instantânea 500g", "price" => 8.10 ],
                  [ "id" => 15, "name" => "Creme de Milho 200g", "price" => 4.80 ]
                ]
              ],
              [
                "id" => 4,
                "name" => "Blend 53",
                "products" => [
                  [ "id" => 16, "name" => "Café Blend 53 Tradicional 250g", "price" => 15.90 ],
                  [ "id" => 17, "name" => "Café Blend 53 Extra Forte 500g", "price" => 28.50 ],
                  [ "id" => 18, "name" => "Café Blend 53 Gourmet 250g", "price" => 22.90 ],
                  [ "id" => 19, "name" => "Café Blend 53 Descafeinado 250g", "price" => 24.90 ],
                  [ "id" => 20, "name" => "Café Blend 53 Orgânico 500g", "price" => 32.50 ]
                ]
              ],
              [
                "id" => 5,
                "name" => "GOSTOSIN",
                "products" => [
                  [ "id" => 21, "name" => "GOSTOSIN Chocolate 150g", "price" => 4.90 ],
                  [ "id" => 22, "name" => "GOSTOSIN Morango 150g", "price" => 4.90 ],
                  [ "id" => 23, "name" => "GOSTOSIN Baunilha 150g", "price" => 4.50 ],
                  [ "id" => 24, "name" => "GOSTOSIN Limão 150g", "price" => 4.50 ],
                  [ "id" => 25, "name" => "GOSTOSIN Integral 200g", "price" => 5.80 ]
                ]
              ],
              [
                "id" => 6,
                "name" => "Nordestino",
                "products" => [
                  [ "id" => 26, "name" => "Sei lá Nordestino 250g", "price" => 7.90 ],
                  [ "id" => 27, "name" => "Não sei Nordestino 400g", "price" => 18.50 ],
                  [ "id" => 28, "name" => "novo nordestino 200ml", "price" => 22.90 ],
                  [ "id" => 29, "name" => "Nordestino velho 300g", "price" => 14.90 ],
                  [ "id" => 30, "name" => "Farofa Nordestina 500g", "price" => 12.50 ]
                ]
              ],
              [
                "id" => 7,
                "name" => "Brazitos",
                "products" => [
                  [ "id" => 31, "name" => "Salgadinho Brazitos Queijo 100g", "price" => 3.90 ],
                  [ "id" => 32, "name" => "Salgadinho Brazitos Bacon 100g", "price" => 3.90 ],
                  [ "id" => 33, "name" => "Salgadinho Brazitos Churrasco 100g", "price" => 3.90 ],
                  [ "id" => 34, "name" => "Salgadinho Brazitos Cebola 100g", "price" => 3.90 ],
                  [ "id" => 35, "name" => "Salgadinho Brazitos Pimenta 100g", "price" => 3.90 ]
                ]
              ],
              [
                "id" => 8,
                "name" => "Scrusch",
                "products" => [
                  [ "id" => 36, "name" => "Batata Scrusch Tradicional 180g", "price" => 6.90 ],
                  [ "id" => 37, "name" => "Batata Scrusch Churrasco 180g", "price" => 6.90 ],
                  [ "id" => 38, "name" => "Batata Scrusch Cebola e salsa 180g", "price" => 6.90 ],
                  [ "id" => 39, "name" => "Batata Scrusch Pimenta 180g", "price" => 6.90 ],
                  [ "id" => 40, "name" => "Batata Scrusch Edição de colecionador limitada 180g", "price" => 6.90 ]
                ]
              ],
              [
                "id" => 9,
                "name" => "Torraditos",
                "products" => [
                  [ "id" => 41, "name" => "Torrada Torraditos Tradicional 200g", "price" => 5.90 ],
                  [ "id" => 42, "name" => "Torrada Torraditos Integral 200g", "price" => 6.50 ],
                  [ "id" => 43, "name" => "Torrada Torraditos Gergelim 200g", "price" => 7.20 ],
                  [ "id" => 44, "name" => "Torrada Torraditos Alho 200g", "price" => 6.80 ],
                  [ "id" => 45, "name" => "Torrada Torraditos Torrado 200g", "price" => 7.50 ]
                ]
              ],
              [
                "id" => 10,
                "name" => "Powerlate",
                "products" => [
                  [ "id" => 46, "name" => "Achocolatado Powerlate 400g", "price" => 9.90 ],
                  [ "id" => 47, "name" => "Achocolatado Powerlate Zero 400g", "price" => 12.50 ],
                ]
              ],
              [
                "id" => 11,
                "name" => "Tuffit",
                "products" => [
                  [ "id" => 48, "name" => "Biscoito Tuffit Chocolate 150g", "price" => 5.90 ],
                  [ "id" => 49, "name" => "Biscoito Tuffit Chocolate branco 150g", "price" => 5.90 ],
                ]
              ],
              [
                "id" => 12,
                "name" => "Gold Flakes",
                "products" => [
                  [ "id" => 50, "name" => "Cereal Gold Flakes Chocolate 300g", "price" => 14.90 ],
                  [ "id" => 51, "name" => "Cereal Gold Flakes Integral 300g", "price" => 15.50 ],
                ]
              ]
        ]);
    }
}
