import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

function ToastWithInsets() {
  const insets = useSafeAreaInsets();
  return <Toast bottomOffset={insets.bottom + 10} />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>

      <ToastWithInsets />
    </SafeAreaProvider>
  );
}
