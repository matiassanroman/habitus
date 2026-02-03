import { useState, useCallback } from 'react';
import { Pressable, View, Text, Modal, StyleSheet } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { getHabits, saveHabits } from '../../../helper/storage/habitsStorage';
import { getWeekDayIndex, formatDate } from '../../../helper/habitFunctions';
import Toast from 'react-native-toast-message';
import HabitCard from './HabitCard';
import ConfirmDeleteModal from '../../modal/ConfirmDeleteModal';

export default function HabitList({ selectedDate }) {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const weekdayIndex = getWeekDayIndex(selectedDate);
  const dateKey = formatDate(selectedDate);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      getHabits().then(setHabits);
    }, []),
  );

  const habitsForSelectedDay = habits
    .filter((h) => h.frequency?.[weekdayIndex])
    .map((h) => ({
      ...h,
      completed: h.completedDates?.includes(dateKey) ?? false,
    }))
    .sort((a, b) => a.category.localeCompare(b.category, 'es'));
  {
  }
  const onToggleHabit = async (id) => {
    const updated = habits.map((habit) => {
      if (habit.id !== id) return habit;

      const completed = habit.completedDates.includes(dateKey);

      return {
        ...habit,
        completedDates: completed
          ? habit.completedDates.filter((d) => d !== dateKey)
          : [...habit.completedDates, dateKey].sort(),
      };
    });

    setHabits(updated);
    await saveHabits(updated);
  };

  const onDeleteHabit = async (id) => {
    const filtered = habits.filter((h) => h.id !== id);
    setHabits(filtered);
    await saveHabits(filtered);

    Toast.show({
      type: 'info',
      text1: 'Hábito eliminado',
      text2: 'Se ha eliminado correctamente',
      position: 'bottom',
    });
    setConfirmDelete(false);
    setSelectedHabit(null);
  };

  const handleLongPress = (habit) => {
    setSelectedHabit(habit);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hábitos</Text>

      <View style={styles.list}>
        {habitsForSelectedDay.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Hoy no tienes hábitos 🌱</Text>
            <Text style={styles.emptyText}>
              Puedes descansar o crear uno nuevo desde la pestaña Crear Hábito.
            </Text>
          </View>
        ) : (
          habitsForSelectedDay.map((habit) => (
            <HabitCard
              key={habit.id}
              {...habit}
              selectedDate={selectedDate}
              onToggle={() => onToggleHabit(habit.id)}
              onLongPress={() => handleLongPress(habit)}
            />
          ))
        )}
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={!!selectedHabit}
        onRequestClose={() => setSelectedHabit(null)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setSelectedHabit(null)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              Hábito: {selectedHabit?.title}
            </Text>
            <Text style={styles.message}>¿Que acción deseas hacer?</Text>
            <View style={styles.actionsRow}>
              {/* EDITAR */}
              <Pressable
                style={[styles.actionButton, styles.editButton]}
                onPress={() => {
                  const id = selectedHabit.id;
                  setSelectedHabit(null);
                  router.push(`/habit/${id}`);
                }}
              >
                <Text style={styles.editText}>Editar</Text>
              </Pressable>

              {/* BORRAR */}
              <Pressable
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => {
                  setConfirmDelete(true);
                }}
              >
                <Text style={styles.deleteText}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
      {/* Modal acciones */}
      <ConfirmDeleteModal
        visible={confirmDelete}
        title="Eliminar hábito"
        message={`¿Seguro que quieres eliminar "${selectedHabit?.title}"?`}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          onDeleteHabit(selectedHabit.id);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { /* paddingHorizontal: 24, */ marginTop: 24 },
  title: { fontSize: 18, fontWeight: '800', marginBottom: 16 },
  list: { gap: 12 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: 280,
    gap: 14,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  message: {
    textAlign: 'center',
    color: '#4b5563',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },

  editButton: {
    backgroundColor: '#e0e7ff',
    marginRight: 8,
  },

  deleteButton: {
    backgroundColor: '#fee2e2',
    marginLeft: 8,
  },

  editText: {
    color: '#2563eb',
    fontWeight: '700',
  },

  deleteText: {
    color: '#dc2626',
    fontWeight: '700',
  },
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
