import { Stack } from 'expo-router';
//import CreateHabitScreen from '../../screens/CreateHabitScreen';
import CreateHabitWizardScreen from '../../screens/CreateHabitWizardScreen';

export default function CreateHabit() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Nuevo Hábito',
        }}
      />
      <CreateHabitWizardScreen />
    </>
  );
}
