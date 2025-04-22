import React from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";


interface Product {
  id: number;
  name: string;
  price: number;
}

interface Brand {
  id: number;
  name: string;
  products: Product[];
}

interface ExploreScreenProps {
  brand: Brand;
  onBack: () => void;
}

const ExploreScreen: React.FC<ExploreScreenProps> = ({ brand, onBack }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar para marcas</Text>
      </TouchableOpacity>

      <Text style={styles.brandTitle}>{brand.name}</Text>

      {brand.products.map((product) => (
        <TouchableOpacity key={product.id} style={styles.productItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.productName}>{product.name}</Text>
          </View>
          <Text style={styles.productPrice}>R$ {formatPrice(product.price)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};




const formatPrice = (price?: number) => {
  return (price ?? 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  backButton: {
    paddingVertical: 10,
    marginBottom: 15,
  },
  backButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
    flexShrink: 1,
    marginRight: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
});

export default ExploreScreen;