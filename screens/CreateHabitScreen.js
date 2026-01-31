import { Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { saveHabit } from '../helper/storage/habitsStorage';
import { router, useFocusEffect } from 'expo-router';

import Toast from 'react-native-toast-message';
import FrequencyPicker from '../components/Habit/CreateHabit/FrequencyPicker';
import CategoryGridPicker from '../components/Habit/CreateHabit/CategoryGridPicker';
import Screen from './Screen';

export default function CreateHabitScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [frequencyMode, setFrequencyMode] = useState('daily');
  const [frequency, setFrequency] = useState(Array(7).fill(true));
  const [isSaving, setIsSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setTitle('');
      setDescription('');
      setCategory('other');
      setFrequencyMode('daily');
      setFrequency(Array(7).fill(true));
    }, []),
  );

  async function handleSave() {
    if (isSaving) return;

    if (!title.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El título es obligatorio',
        position: 'bottom',
        visibilityTime: 4000,
      });
      return;
    }

    setIsSaving(true);

    const habit = {
      id: Date.now(),
      title,
      description,
      category,
      frequency,
      start_date: new Date().toISOString().slice(0, 10),
      completedDates: [],
    };

    try {
      await saveHabit(habit);
      Toast.show({
        type: 'success',
        text1: 'Hábito creado',
        text2: '¡Tu hábito se ha guardado correctamente!',
        position: 'bottom',
        visibilityTime: 3000,
      });

      setTimeout(() => router.back(), 3000);
    } catch (e) {
      setIsSaving(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo guardar el hábito',
      });
    }
  }

  return (
    <Screen>
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

      <CategoryGridPicker value={category} onChange={setCategory} />

      <FrequencyPicker
        mode={frequencyMode}
        onModeChange={setFrequencyMode}
        value={frequency}
        onChange={setFrequency}
      />

      <Pressable
        onPress={handleSave}
        disabled={isSaving}
        style={styles.saveButton}
      >
        <Text style={styles.saveText}>
          {isSaving ? 'Guardando...' : 'Crear hábito'}
        </Text>
      </Pressable>
    </Screen>
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
  saveButtonDisabled: {
    opacity: 0.6,
  },
});
