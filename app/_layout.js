import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen
        name="habit/[id]"
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Editar hábito',
        }}
      /> */}
      </Stack>
      <Toast />
    </>
  );
}
