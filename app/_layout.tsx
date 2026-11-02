import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="splashScreen" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </SafeAreaProvider>
  );
}
