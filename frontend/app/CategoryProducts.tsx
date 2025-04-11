import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

type Product = {
  id: number;
  name: string;
  price?: number; 
  category_id: number;
  brand_id?: number;
}

const CategoryProductsScreen = () => {
  const { categoryId, categoryName } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://192.168.8.91:14000/AppVendasApi/public/api/products?category_id=${categoryId}`
        );
        let productsJson = await response.json();
        

        // Se os produtos vierem dentro de marcas
        // if (productsJson[0]?.products) {
        //   productsJson = productsJson.flatMap((brand: any) => 
        //     brand.products.map((product: any) => ({
        //       ...product,
        //       brand_id: brand.id,
        //       // Garantir que price seja número 
        //       price: product.price ? Number(product.price) : 0
        //     }))
        //   );
        // }

        // Filtrar por categoria 
        const filteredProducts = productsJson
          .filter((product: any) => 
            product.category_id && product.category_id.toString() === categoryId
          )

        console.log(filteredProducts);
          // .map((product: any) => ({
          //   ...product,
          //   price: product.price ? Number(product.price) : 0
          // }));

        setProducts(filteredProducts);
      } catch(error) {
        console.error('Erro ao carregar produtos:', error);
        setError('Erro ao carregar produtos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  // Função segura para formatar preço
  const formatPrice = (price?: number) => {
    return price?.toFixed(2) ?? '0.00';
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.retryText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Produtos: {categoryName}</Text>

      {products.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum produto encontrado nesta categoria</Text>
      ) : (
        products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>
              R$ {formatPrice(product.price)}
            </Text>
          </View>
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 10,
  },
  retryText: {
    color: '#007AFF',
    fontWeight: 'bold',
  }
});

export default CategoryProductsScreen;