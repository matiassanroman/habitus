import { Stack } from 'expo-router';
import HomeScreen from '../../screens/HomeScreen';

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Dashboard De Hoy',
        }}
      />
      <HomeScreen />
    </>
  );
}
