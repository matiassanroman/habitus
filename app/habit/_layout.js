import { Stack } from 'expo-router';

export default function HabitsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f8fafc',
        },
        headerTintColor: '#0f172a',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    />
  );
}
