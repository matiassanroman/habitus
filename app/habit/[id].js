import { Stack } from 'expo-router';
import EditHabitScreen from '../../screens/EditHabitScreen';

export default function EditHabit() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Editar o Borrar Hábito',
        }}
      />
      <EditHabitScreen />
    </>
  );
}
