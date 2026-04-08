import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const PETS_DATA = [
  {
    id: '1',
    name: 'Luna',
    breed: 'Golden Retriever',
    age: '2 anos',
    gender: 'Fêmea',
    size: 'Grande',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600',
    location: 'São Paulo, SP',
    distance: '3 km',
    description: 'Luna é uma cachorra muito carinhosa e brincalhona. Adora crianças e outros animais.',
    vaccinated: true,
    neutered: true,
  },
  {
    id: '2',
    name: 'Thor',
    breed: 'Bulldog Francês',
    age: '1 ano',
    gender: 'Macho',
    size: 'Pequeno',
    image: 'https://images.unsplash.com/photo-1583511655857-d19bc40da7e7?w=600',
    location: 'São Paulo, SP',
    distance: '5 km',
    description: 'Thor é cheio de energia e adora passear. Muito sociável e obediente.',
    vaccinated: true,
    neutered: false,
  },
  {
    id: '3',
    name: 'Mia',
    breed: 'Siamês',
    age: '8 meses',
    gender: 'Fêmea',
    size: 'Pequeno',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600',
    location: 'São Paulo, SP',
    distance: '2 km',
    description: 'Mia é uma gatinha muito meiga e calma. Adora dormir no colo.',
    vaccinated: true,
    neutered: true,
  },
  {
    id: '4',
    name: 'Max',
    breed: 'Labrador',
    age: '3 anos',
    gender: 'Macho',
    size: 'Grande',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?w=600',
    location: 'São Paulo, SP',
    distance: '7 km',
    description: 'Max é super protetor e leal. Ideal para quem busca um companheiro fiel.',
    vaccinated: true,
    neutered: true,
  },
  {
    id: '5',
    name: 'Nina',
    breed: 'Vira-lata (SRD)',
    age: '1 ano',
    gender: 'Fêmea',
    size: 'Médio',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600',
    location: 'São Paulo, SP',
    distance: '4 km',
    description: 'Nina foi resgatada das ruas e é extremamente grata. Muito amorosa!',
    vaccinated: true,
    neutered: true,
  },
  {
    id: '6',
    name: 'Simba',
    breed: 'Maine Coon',
    age: '2 anos',
    gender: 'Macho',
    size: 'Grande',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600',
    location: 'São Paulo, SP',
    distance: '6 km',
    description: 'Simba é um gatão majestoso e independente. Adora observar pela janela.',
    vaccinated: true,
    neutered: true,
  },
  {
    id: '7',
    name: 'Bella',
    breed: 'Beagle',
    age: '4 anos',
    gender: 'Fêmea',
    size: 'Médio',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600',
    location: 'São Paulo, SP',
    distance: '8 km',
    description: 'Bella adora farejar e explorar. Muito inteligente e fácil de treinar.',
    vaccinated: true,
    neutered: true,
  },
  {
    id: '8',
    name: 'Oliver',
    breed: 'Persa',
    age: '3 anos',
    gender: 'Macho',
    size: 'Médio',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
    location: 'São Paulo, SP',
    distance: '3 km',
    description: 'Oliver é um príncipe. Muito calmo e adora ser escovado.',
    vaccinated: true,
    neutered: true,
  },
  {
    id: '9',
    name: 'Rocky',
    breed: 'Pastor Alemão',
    age: '2 anos',
    gender: 'Macho',
    size: 'Grande',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600',
    location: 'São Paulo, SP',
    distance: '10 km',
    description: 'Rocky é super protetor e inteligente. Precisa de espaço para correr.',
    vaccinated: true,
    neutered: true,
  },
  {
    id: '10',
    name: 'Chloe',
    breed: 'Poodle',
    age: '1 ano',
    gender: 'Fêmea',
    size: 'Pequeno',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
    location: 'São Paulo, SP',
    distance: '2 km',
    description: 'Chloe é uma gracinha! Muito inteligente e adora aprender truques.',
    vaccinated: true,
    neutered: false,
  },
  {
    id: '11',
    name: 'Felix',
    breed: 'Vira-lata (SRD)',
    age: '6 meses',
    gender: 'Macho',
    size: 'Pequeno',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
    location: 'São Paulo, SP',
    distance: '5 km',
    description: 'Felix é um filhote cheio de energia! Adora brincar de esconde-esconde.',
    vaccinated: true,
    neutered: false,
  },
  {
    id: '12',
    name: 'Daisy',
    breed: 'Cocker Spaniel',
    age: '2 anos',
    gender: 'Fêmea',
    size: 'Médio',
    image: 'https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=600',
    location: 'São Paulo, SP',
    distance: '6 km',
    description: 'Daisy é super meiga e adora água! Sempre pronta para um banho de mangueira.',
    vaccinated: true,
    neutered: true,
  },
];

export default function PetsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedPet, setSelectedPet] = useState<typeof PETS_DATA[0] | null>(null);

  const filters = ['Todos', 'Cachorros', 'Gatos', 'Pequenos', 'Médios', 'Grandes'];

  const filteredPets = PETS_DATA.filter((pet) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        pet.name.toLowerCase().includes(query) ||
        pet.breed.toLowerCase().includes(query)
      );
    }

    if (selectedFilter === 'Todos') return true;
    if (selectedFilter === 'Cachorros') return !pet.breed.toLowerCase().includes('siames') && !pet.breed.toLowerCase().includes('maine') && !pet.breed.toLowerCase().includes('persa');
    if (selectedFilter === 'Gatos') return pet.breed.toLowerCase().includes('siames') || pet.breed.toLowerCase().includes('maine') || pet.breed.toLowerCase().includes('persa');
    if (selectedFilter === 'Pequenos') return pet.size === 'Pequeno';
    if (selectedFilter === 'Médios') return pet.size === 'Médio';
    if (selectedFilter === 'Grandes') return pet.size === 'Grande';
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F3" />

      <View style={styles.header}>
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/splash')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1B1716" />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Pets para Adoção</Text>
          <Text style={styles.subtitle}>{filteredPets.length} amigos esperando um lar</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7D7672" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome ou raça..."
          placeholderTextColor="#7D7672"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#7D7672" />
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <Pressable 
            key={filter}
            style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]} 
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterChipText, selectedFilter === filter && styles.filterChipTextActive]}>
              {filter}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        <View style={styles.grid}>
          {filteredPets.map((pet) => (
            <Pressable key={pet.id} style={styles.card} onPress={() => setSelectedPet(pet)}>
              <Image source={{ uri: pet.image }} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <View style={styles.genderBadge}>
                      <Ionicons
                        name={pet.gender === 'Fêmea' ? 'female' : 'male'}
                        size={14}
                        color={pet.gender === 'Fêmea' ? '#FF6B9D' : '#4A90E2'}
                      />
                    </View>
                  </View>
                  <Text style={styles.petBreed}>{pet.breed}</Text>
                  <View style={styles.petDetails}>
                    <View style={styles.detailItem}>
                      <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                      <Text style={styles.detailText}>{pet.age}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Ionicons name="resize-outline" size={14} color="#FFFFFF" />
                      <Text style={styles.detailText}>{pet.size}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Ionicons name="location-outline" size={14} color="#FFFFFF" />
                      <Text style={styles.detailText}>{pet.distance}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Pressable style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
              </Pressable>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {selectedPet && (
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackground} onPress={() => setSelectedPet(null)} />
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={{ uri: selectedPet.image }} style={styles.modalImage} />
              <Pressable 
                style={styles.closeButton} 
                onPress={() => setSelectedPet(null)}
              >
                <Ionicons name="close" size={24} color="#1B1716" />
              </Pressable>

              <View style={styles.modalBody}>
                <View style={styles.modalHeader}>
                  <View>
                    <Text style={styles.modalPetName}>{selectedPet.name}</Text>
                    <Text style={styles.modalPetBreed}>{selectedPet.breed}</Text>
                  </View>
                  <View style={styles.genderBadgeLarge}>
                    <Ionicons
                      name={selectedPet.gender === 'Fêmea' ? 'female' : 'male'}
                      size={20}
                      color={selectedPet.gender === 'Fêmea' ? '#FF6B9D' : '#4A90E2'}
                    />
                  </View>
                </View>

                <View style={styles.infoGrid}>
                  <View style={styles.infoItem}>
                    <Ionicons name="time-outline" size={20} color="#FF6B4A" />
                    <Text style={styles.infoLabel}>Idade</Text>
                    <Text style={styles.infoValue}>{selectedPet.age}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="resize-outline" size={20} color="#FF6B4A" />
                    <Text style={styles.infoLabel}>Porte</Text>
                    <Text style={styles.infoValue}>{selectedPet.size}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="location-outline" size={20} color="#FF6B4A" />
                    <Text style={styles.infoLabel}>Distância</Text>
                    <Text style={styles.infoValue}>{selectedPet.distance}</Text>
                  </View>
                </View>

                <View style={styles.badgesContainer}>
                  {selectedPet.vaccinated && (
                    <View style={styles.badge}>
                      <Ionicons name="medical-outline" size={16} color="#22C55E" />
                      <Text style={styles.badgeText}>Vacinado</Text>
                    </View>
                  )}
                  {selectedPet.neutered && (
                    <View style={styles.badge}>
                      <Ionicons name="checkmark-circle-outline" size={16} color="#22C55E" />
                      <Text style={styles.badgeText}>Castrado</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.sectionTitle}>Sobre</Text>
                <Text style={styles.description}>{selectedPet.description}</Text>

                <Text style={styles.sectionTitle}>Localização</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={20} color="#FF6B4A" />
                  <Text style={styles.locationText}>{selectedPet.location}</Text>
                </View>

                <Pressable style={styles.adoptButton}>
                  <Text style={styles.adoptButtonText}>Quero Adotar</Text>
                  <Ionicons name="heart" size={20} color="#FFFFFF" />
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8E0DA',
  },
  headerTitle: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1716',
  },
  subtitle: {
    fontSize: 13,
    color: '#7D7672',
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#E8E0DA',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1B1716',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E0DA',
  },
  filterChipActive: {
    backgroundColor: '#FF6B4A',
    borderColor: '#FF6B4A',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1716',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  gridContainer: {
    padding: 20,
    paddingTop: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: (width - 56) / 2,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  petName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  genderBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petBreed: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  petDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '85%',
    backgroundColor: '#FFF8F3',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: 300,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalPetName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1716',
  },
  modalPetBreed: {
    fontSize: 16,
    color: '#7D7672',
    marginTop: 4,
  },
  genderBadgeLarge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF8F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8E0DA',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8E0DA',
  },
  infoLabel: {
    fontSize: 12,
    color: '#7D7672',
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1716',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#166534',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1716',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#7D7672',
    lineHeight: 22,
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E8E0DA',
    marginBottom: 24,
  },
  locationText: {
    fontSize: 15,
    color: '#1B1716',
  },
  adoptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF6B4A',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  adoptButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
