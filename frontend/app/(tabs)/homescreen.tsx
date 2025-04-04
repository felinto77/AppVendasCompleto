import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Link, useRouter } from 'expo-router';

// Tipagem completa dos dados
type Brand = {
  id: number;
  name: string;
  price?: number;
  category_id?: number;
  brand_id?: number;
}

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

  // Filtra marcas baseado na busca
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        
        <Link href="/+not-found" asChild>
          <TouchableOpacity 
            style={styles.secondaryButton}
            accessibilityLabel="Fazer login"
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Lista de marcas */}
      <Text style={styles.sectionTitle}>Nossas Marcas</Text>
      
      {filteredBrands.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhuma marca encontrada</Text>
      ) : (
        <View style={styles.grid}>
          {filteredBrands.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              style={styles.brandCard}
              onPress={() => router.push(`/+not-found`)}
              accessibilityLabel={`Marca ${brand.name}`}
            >
              <View style={styles.brandLogo}>
                <Text style={styles.brandInitial}>{brand.name.charAt(0).toUpperCase()}</Text>
              </View>
              <Text style={styles.brandName} numberOfLines={2}>{brand.name}</Text>
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