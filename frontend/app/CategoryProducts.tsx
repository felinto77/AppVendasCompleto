import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';

type Product = {
  id: number;
  name: string;
  price: number;
  category_id: number;
}

const CategoryProductsScreen = () => {
  const { categoryId, categoryName } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://192.168.8.91:14000/AppVendasApi/public/api/products?category_id=${categoryId}`
        );
        const json = await response.json();
        setProducts(json);
      } catch(error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Link href="/(tabs)/homescreen" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.title}>Produtos: {categoryName}</Text>

      {products.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum produto encontrado nesta categoria</Text>
      ) : (
        products.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productItem}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  backButton: {
    padding: 8,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  productItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  productName: {
    fontSize: 16,
    color: '#34495e',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 20,
  },
});

export default CategoryProductsScreen;