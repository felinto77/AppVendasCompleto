import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";

interface Product {
  id: number;
  name: string;
  price: number;
  brand_id: number;
  brand_name?: string; 
}

interface Brand {
  id: number;
  name: string;
  products: Product[];
}

const EstoqueScreen = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarBrands();
  }, []);

  async function listarBrands() {
    try {
      const response = await fetch(
        'http://192.168.8.91:14000/AppVendasApi/public/api/products',
      );
      const json = await response.json();
      setBrands(json);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  };

  const allProducts: Product[] = brands.flatMap(brand => 
    brand.products.map(product => ({
      ...product,
      brand_name: brand.name
    }))
  );

  // Filtra produtos baseado na busca (nome do produto ou marca)
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.brand_name && product.brand_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Estoque de Produtos</Text>
      
      {/* Campo de busca */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar produto ou marca..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Contador de produtos */}
      <Text style={styles.productCount}>
        {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'} encontrados
      </Text>

      {/* Lista de produtos */}
      {filteredProducts.map((product) => (
        <TouchableOpacity key={product.id} style={styles.productItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.brandName}>{product.brand_name}</Text>
          </View>
          <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
  },
  productCount: {
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  productName: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
    marginBottom: 3,
  },
  brandName: {
    fontSize: 14,
    color: '#888',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
});

export default EstoqueScreen;