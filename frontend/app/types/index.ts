export interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  export interface Brand {
    id: number;
    name: string;
    products: Product[];
  }