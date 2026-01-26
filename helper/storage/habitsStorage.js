import AsyncStorage from '@react-native-async-storage/async-storage';

const HABITS_KEY = '@habits';

export async function getHabits() {
  const data = await AsyncStorage.getItem(HABITS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveHabit(habit) {
  const habits = await getHabits();
  const updated = [...habits, habit];
  await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
}

export async function saveHabits(habits) {
  await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}

export async function updateHabit(updatedHabit) {
  const habits = await getHabits();
  const updated = habits.map((h) =>
    h.id === updatedHabit.id ? updatedHabit : h,
  );
  await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
}

export async function deleteHabit(id) {
  const habits = await getHabits();
  const filtered = habits.filter((h) => h.id !== id);
  await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(filtered));
}
