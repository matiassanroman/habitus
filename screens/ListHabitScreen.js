import { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getHabits } from '../helper/storage/habitsStorage';
import Screen from '../screens/Screen';
import HabitCard from '../components/habit/list/HabitCard';

export default function ListHabitScreen() {
  const [habits, setHabits] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getHabits().then(setHabits);
    }, []),
  );

  const habitsForCategory = habits.sort((a, b) =>
    a.category.localeCompare(b.category, 'es'),
  );

  return (
    <Screen>
      <View>
        <View>
          {habitsForCategory.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No tienes hábitos creados.</Text>
              <Text style={styles.emptyText}>
                Puedes descansar o crear uno nuevo desde la pestaña Crear
                Hábito.
              </Text>
            </View>
          ) : (
            habitsForCategory.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 8,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
  },

  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b7280',
    lineHeight: 20,
  },
});
