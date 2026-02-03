import { Stack } from 'expo-router';
import ListHabitScreen from '../../screens/ListHabitScreen';

export default function ListHabit() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Hábitos Creados',
        }}
      />
      <ListHabitScreen />
    </>
  );
}
