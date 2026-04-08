import { Redirect, useRouter } from 'expo-router';
import { useSession } from '@/src/contexts/SessionContext';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';

function FeatureChip({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon} size={20} color="#FF6B4A" />
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

export default function SplashScreen() {
  // TODOS os hooks DEVEM vir primeiro - antes de qualquer return condicional
  const router = useRouter();
  const { completeSplash, hasSeenSplash, isAuthenticated } = useSession();

  // Handlers de navegação (useCallback é um hook, então vem antes dos returns)
  const handleStart = useCallback(() => {
    router.push('/pets');
  }, [router]);

  const handleLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  const handleSignup = useCallback(() => {
    router.push('/signup');
  }, [router]);

  // Agora sim, verificações condicionais que retornam early
  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  if (hasSeenSplash) {
    return <Redirect href="/pets" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={styles.hero}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800' }}
          style={styles.heroImage}
          imageStyle={styles.heroImageStyle}
        >
          <View style={styles.heroOverlay} />

          <View style={styles.badge}>
            <Ionicons name="paw" size={20} color="#FF6B4A" />
            <Text style={styles.badgeText}>Pet Adopt</Text>
          </View>

          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>
              Encontre seu novo melhor amigo
            </Text>
            <Text style={styles.heroSubtitle}>
              Adote um pet e transforme uma vida. Milhares de animais esperam por um lar amoroso.
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Text style={styles.sheetTitle}>Comece sua jornada</Text>
        <Text style={styles.sheetSubtitle}>
          Explore, favorite e adote seu companheiro perfeito
        </Text>

        <View style={styles.chipsContainer}>
          <FeatureChip icon="heart-outline" label="Favoritos" />
          <FeatureChip icon="search-outline" label="Explorar" />
          <FeatureChip icon="options-outline" label="Filtros" />
        </View>

        {/* Botão Principal - Começar Agora */}
        <Pressable
          onPress={handleStart}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>Começar Agora</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>

        {/* Botão de Login */}
        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.secondaryButtonText}>Entrar</Text>
        </Pressable>

        {/* Botão de Cadastro */}
        <Pressable
          onPress={handleSignup}
          style={({ pressed }) => [
            styles.textButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.textButtonText}>
            Não tem conta? <Text style={styles.textButtonHighlight}>Cadastre-se</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },
  hero: {
    flex: 0.6,
  },
  heroImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  heroImageStyle: {
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 11, 4, 0.40)',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginTop: 8,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B1716',
  },
  heroCopy: {
    gap: 12,
    paddingBottom: 32,
    zIndex: 1,
  },
  heroTitle: {
    maxWidth: '85%',
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    maxWidth: '90%',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  sheet: {
    flex: 0.5,
    marginTop: -28,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#FFF8F3',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  handle: {
    alignSelf: 'center',
    width: 72,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#DFD5CF',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B1716',
    marginBottom: 8,
  },
  sheetSubtitle: {
    fontSize: 15,
    color: '#7D7672',
    textAlign: 'center',
    marginBottom: 24,
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E0DA',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B1716',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: '#FF6B4A',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FF6B4A',
    marginBottom: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B4A',
    textAlign: 'center',
  },
  textButton: {
    paddingVertical: 8,
  },
  textButtonText: {
    fontSize: 14,
    color: '#7D7672',
  },
  textButtonHighlight: {
    color: '#FF6B4A',
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
