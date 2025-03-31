import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import ExploreScreen from "../ExploreScreen";


// Dados completos das marcas
type Brand = {
  id: number,
  name: string,
  price: number,
}


const HomeScreen = () => {
  const [currentScreen, setCurrentScreen] = useState<"home" | "categories">("home");
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBrandPress = (brand: any) => {
    setSelectedBrand(brand);
    setCurrentScreen("categories");
  };

  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    
    listarbrands();
    
  }, []);

  async function listarbrands() {
    try {
      const response = await fetch(
        'http://192.168.8.91:14000/AppVendasApi/public/api/products',
      );
      const json = await response.json();
      setBrands(json);
    } catch(error) {
      console.error(error)
    }
  };

  console.log(brands);
  
  // Filtra marcas baseado na busca
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (currentScreen === "categories" && selectedBrand) {
    return <ExploreScreen brand={selectedBrand} onBack={() => setCurrentScreen("home")} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SB Solutions</Text>
      </View>

      {/* Barra de pesquisa */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar marcas..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Banner promocional */}
      <Image
        source={{ uri: 'https://via.placeholder.com/300x150' }}
        style={styles.banner}
      />

      {/* Botões principais */}
      <View style={styles.buttonRow}>
        <Link href="/(tabs)/categories" asChild>
          <TouchableOpacity style={styles.primaryButton}>
             <Text style={styles.buttonText1}>Categories</Text>
          </TouchableOpacity>
         </Link>
        
        <Link href="/+not-found" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.buttonText2}>Login</Text>
          </TouchableOpacity>
         </Link>

    </View>

      {/* Lista de marcas */}
      <Text style={styles.sectionTitle}>Nossas Marcas</Text>
      
      <View style={styles.grid}>
        {filteredBrands.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            style={styles.brandCard}
            onPress={() => handleBrandPress(brand)}
          >
            <View style={styles.brandLogo}>
              <Text style={styles.brandInitial}>{brand.name.charAt(0)}</Text>
            </View>
            <Text style={styles.brandName} numberOfLines={2}>{brand.name}</Text>
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
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  searchBar: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3498db',
    marginRight: 8,
    borderRadius: 15
  },
  secondaryButton: {
    backgroundColor: '#7f8c8d',
    marginLeft: 8,
    borderRadius: 15
  },
  buttonText1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 53,
    paddingVertical: 30,
  },
  buttonText2: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 75,
    paddingVertical: 30
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  brandCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  brandLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  brandInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  brandName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'center',
  },
});

export default HomeScreen;