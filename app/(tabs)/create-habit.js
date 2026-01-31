import { Stack } from 'expo-router';
import CreateHabitScreen from '../../screens/CreateHabitScreen';

export default function CreateHabit() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Nuevo Hábito',
        }}
      />
      <CreateHabitScreen />
    </>
  );
}
