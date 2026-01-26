import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import {
  saveHabit,
  updateHabit,
  deleteHabit,
} from '../helper/storage/habitsStorage';
import { router, useLocalSearchParams } from 'expo-router';

import Toast from 'react-native-toast-message';
import ColorPicker from '../components/Habit/CreateHabit/ColorPicker';
import IconPicker from '../components/Habit/CreateHabit/IconPicker';
import FrequencyPicker from '../components/Habit/CreateHabit/FrequencyPicker';

export default function CreateHabitScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('water-drop');
  const [color, setColor] = useState('#2563eb');
  const [frequencyMode, setFrequencyMode] = useState('daily');
  const [frequency, setFrequency] = useState(Array(7).fill(true));

  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  async function handleSave() {
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
    const habit = {
      id: Date.now(),
      title,
      description,
      icon,
      color,
      frequency,
      start_date: new Date().toISOString().slice(0, 10),
      completedDates: [],
    };

    await saveHabit(habit);
    Toast.show({
      type: 'success',
      text1: 'Hábito creado',
      text2: '¡Tu hábito se ha guardado correctamente!',
      position: 'bottom',
      visibilityTime: 4000,
    });

    setTitle('');
    setDescription('');
    setIcon('water-drop');
    setColor('#2563eb');
    setFrequencyMode('daily');
    setFrequency(Array(7).fill(true));

    setTimeout(() => router.back(), 3000);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo hábito</Text>

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
        <Text style={styles.saveText}>Crear hábito</Text>
      </Pressable>
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
});
