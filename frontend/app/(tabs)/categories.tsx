import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';



// const categories = [
//   { id: 1, name: 'Bebidas', icon: '🥤' },
//   { id: 2, name: 'Snacks', icon: '🍿' },
//   { id: 3, name: 'Cafés', icon: '☕' },
//   { id: 4, name: 'Biscoitos', icon: '🍪' },
//   { id: 5, name: 'Chocolates', icon: '🍫' },
//   { id: 6, name: 'Orgânicos', icon: '🌱' },
//   { id: 7, name: 'Importados', icon: '🌎' },
//   { id: 8, name: 'Promoções', icon: '🏷️' },
// ];

type Category = {
  id: number,
  name: string,
  icon: string
}

const CategoriesScreen = ({ onBack }: { onBack: () => void }) => {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    
    listarcategorias();
    
  }, []);

  async function listarcategorias() {
    try {
      const response = await fetch(
        'http://192.168.8.91:14000/AppVendasApi/public/api/categories',
      );
      const json = await response.json();
      setCategories(json);
    } catch(error) {
      console.error(error)
    }
  };

  console.log(categories);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <Link href="/(tabs)/homescreen" asChild>
    <TouchableOpacity style={styles.backButtonContainer}>
      <Text style={styles.backButtonText}>← Voltar</Text>
    </TouchableOpacity>
  </Link>
        <Text style={styles.title}>Categorias</Text>
      </View>

      {/* Lista de categorias */}
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={styles.categoryCard}
            onPress={() => console.log('Categoria selecionada:', category.name)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 55,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonContainer: {
    padding: 8, 
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF', 
  },

});

export default CategoriesScreen;