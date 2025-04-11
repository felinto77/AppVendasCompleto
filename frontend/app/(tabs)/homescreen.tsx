import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Link, useRouter } from 'expo-router';

type Category = {
  id: number;
  name: string;
  icon: string;
}

type Brand = {
  id: number;
  name: string;
  price?: number;
  category_id?: number;
  brand_id?: number;
}

const brandContainers = [
  { id: 1, name: 'Pippos', color: '#e74c3c' },
  { id: 2, name: 'Tuffit', color: '#3498db' },
  { id: 3, name: 'Café São Braz', color: '#2ecc71' },
  { id: 4, name: 'Café Blend 53', color: '#f39c12' },
  { id: 5, name: 'Salgadinho Brazitos', color: '#9b59b6' },
  { id: 6, name: 'Batata Scrush', color: '#1abc9c' },
  { id: 7, name: 'GOSTOSIN', color: '#d35400' },
  { id: 8, name: 'Torrada Torraditos', color: '#34495e' },
  { id: 9, name: 'Achocolatado Powerlate', color: '#27ae60' },
  { id: 10, name: 'Nordestino', color: '#e67e22' },
  { id: 11, name: 'Novomilho', color: '#16a085' },
  { id: 12, name: 'Cereal Gold Flakes', color: '#8e44ad' },
];

const HomeScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL || 'http://192.168.8.91:14000'}/AppVendasApi/public/api/products`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setError("Não foi possível carregar as marcas. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Filtra containers baseado na busca
  const filteredContainers = brandContainers.filter(container =>
    container.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
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
        accessibilityLabel="Banner promocional"
      />

      {/* Botões principais */}
      <View style={styles.buttonRow}>
        <Link href="/(tabs)/categories" asChild>
          <TouchableOpacity 
            style={styles.primaryButton}
            accessibilityLabel="Ver categorias"
          >
            <Text style={styles.buttonText}>Categorias</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/LoginScreen" asChild>
          <TouchableOpacity 
            style={styles.secondaryButton}
            accessibilityLabel="Fazer login"
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Lista de marcas em grid 2 colunas */}
      <Text style={styles.sectionTitle}>Nossas Marcas</Text>
      
      {filteredContainers.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhuma marca encontrada</Text>
      ) : (
        <View style={styles.gridContainer}>
          {filteredContainers.map((container) => (
            <TouchableOpacity
              key={container.id}
              style={[styles.brandCard, { backgroundColor: container.color + '20', borderColor: container.color }]}
              onPress={() => router.push(``)}  //FALTA O CAMINHO PARA OS PRODUTOS
            >
              <View style={[styles.brandLogo, { backgroundColor: container.color }]}>
                <Text style={styles.brandInitial}>{container.name.charAt(0).toUpperCase()}</Text>
              </View>
              <Text style={[styles.brandName, { color: container.color }]} numberOfLines={2}>{container.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  primaryButton: {
    flex: 1,
    backgroundColor: '#3498db',
    marginRight: 8,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#7f8c8d',
    marginLeft: 8,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  brandCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  brandLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  retryText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 20,
  }
});

export default HomeScreen;