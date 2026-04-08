import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="alert-circle-outline" size={80} color="#FF6B4A" />
        </View>
        <Text style={styles.title}>Página não encontrada</Text>
        <Text style={styles.subtitle}>
          A tela que você está procurando não existe.
        </Text>

        <Link href="/" asChild>
          <Pressable style={styles.button}>
            <Ionicons name="home-outline" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Voltar para Home</Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFF8F3',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#E8E0DA',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B1716',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#7D7672',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FF6B4A',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
