import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import ConfirmDeleteModal from '../../components/Habit/DeleteHabit/ConfirmDeleteModal';
import Toast from 'react-native-toast-message';

import {
  getHabits,
  updateHabit,
  deleteHabit,
} from '../../helper/storage/habitsStorage';

import ColorPicker from '../../components/Habit/CreateHabit/ColorPicker';
import IconPicker from '../../components/Habit/CreateHabit/IconPicker';
import FrequencyPicker from '../../components/Habit/CreateHabit/FrequencyPicker';

export default function EditHabitScreen() {
  const { id } = useLocalSearchParams();

  const [loaded, setLoaded] = useState(false);
  const [habitId, setHabitId] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState('');
  const [frequencyMode, setFrequencyMode] = useState('daily');
  const [frequency, setFrequency] = useState(Array(7).fill(true));
  const [completedDates, setCompletedDates] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const loadHabit = async () => {
      const habits = await getHabits();
      const habit = habits.find((h) => String(h.id) === String(id));

      if (!habit) {
        router.back();
        return;
      }

      setHabitId(habit.id);
      setTitle(habit.title);
      setDescription(habit.description);
      setIcon(habit.icon);
      setColor(habit.color);
      setFrequency(habit.frequency);
      setCompletedDates(habit.completedDates);

      setLoaded(true);
    };

    loadHabit();
  }, [id]);

  async function handleSave() {
    const updatedHabit = {
      id: habitId,
      title,
      description,
      icon,
      color,
      frequency,
      completedDates,
    };

    await updateHabit(updatedHabit);
    router.back();
  }

  async function handleDelete() {
    await deleteHabit(habitId);
    Toast.show({
      type: 'info',
      text1: 'Hábito eliminado',
      text2: 'Se ha eliminado correctamente',
      position: 'bottom',
      visibilityTime: 4000,
    });

    router.back();
  }

  if (!loaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar hábito</Text>

      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <IconPicker selected={icon} color={color} onSelect={setIcon} />
      <ColorPicker selected={color} onSelect={setColor} />

      <FrequencyPicker
        mode={frequencyMode}
        onModeChange={setFrequencyMode}
        value={frequency}
        onChange={setFrequency}
      />

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Guardar cambios</Text>
      </Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={() => setConfirmDelete(true)}
      >
        <Text style={styles.deleteText}>Eliminar hábito</Text>
      </Pressable>
      <ConfirmDeleteModal
        visible={confirmDelete}
        title="Eliminar hábito"
        message="¿Seguro que quieres borrar este hábito?"
        onCancel={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await deleteHabit(habitId);
          setConfirmDelete(false);

          Toast.show({
            type: 'info',
            text1: 'Hábito eliminado',
            text2: 'Se ha eliminado correctamente',
            position: 'bottom',
          });

          router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 12,
    padding: 14,
    borderRadius: 18,
    alignItems: 'center',
  },
  deleteText: {
    color: '#dc2626',
    fontWeight: '700',
  },
  deleteButton: {
    padding: 14,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    marginTop: 12,
  },
  deleteText: {
    color: '#dc2626',
    fontWeight: '700',
    fontSize: 16,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#4b5563',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
