import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import Toast from 'react-native-toast-message';

import ConfirmDeleteModal from '../components/modal/ConfirmDeleteModal';
import Screen from '../screens/Screen';

import {
  getHabits,
  updateHabit,
  deleteHabit,
} from '../helper/storage/habitsStorage';

import CategoryGridPicker from '../components/picker/CategoryPicker';
import FrequencyPicker from '../components/picker/FrequencyPicker';

export default function EditHabitScreen() {
  const TITLE_MAX = 40;
  const DESCRIPTION_MAX = 120;

  const { id } = useLocalSearchParams();

  const [loaded, setLoaded] = useState(false);
  const [habitId, setHabitId] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [frequencyMode, setFrequencyMode] = useState('daily');
  const [frequency, setFrequency] = useState(Array(7).fill(true));
  const [completedDates, setCompletedDates] = useState([]);

  const [originalHabit, setOriginalHabit] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      setCategory(habit.category);

      setFrequency(habit.frequency);
      const isDaily = habit.frequency.every(Boolean);
      setFrequencyMode(isDaily ? 'daily' : 'custom');

      setCompletedDates(habit.completedDates);
      setOriginalHabit(habit);

      setLoaded(true);
    };

    loadHabit();
  }, [id]);

  const hasChanges =
    originalHabit &&
    (title !== originalHabit.title ||
      description !== originalHabit.description ||
      category !== originalHabit.category ||
      JSON.stringify(frequency) !== JSON.stringify(originalHabit.frequency));

  const titleNearLimit = title.length > TITLE_MAX * 0.8;
  const descriptionNearLimit = description.length > DESCRIPTION_MAX * 0.8;

  async function handleSave() {
    if (isSaving || !hasChanges) return;

    if (!title.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El título es obligatorio',
        position: 'bottom',
      });
      return;
    }

    setIsSaving(true);

    const updatedHabit = {
      id: habitId,
      title: title.trim(),
      description: description.trim(),
      category,
      frequency,
      completedDates,
    };

    try {
      await updateHabit(updatedHabit);

      Toast.show({
        type: 'success',
        text1: 'Cambios guardados',
      });

      router.back();
    } catch (e) {
      setIsSaving(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo modificar el hábito',
      });
    }
  }

  if (!loaded) return null;

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* <Text style={styles.screenTitle}>Editar hábito</Text> */}

          {/* INFORMACIÓN */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Información</Text>

            <TextInput
              placeholder="Ej: Leer 10 páginas por día"
              value={title}
              onChangeText={(text) => setTitle(text.slice(0, TITLE_MAX))}
              maxLength={TITLE_MAX}
              style={styles.input}
              autoFocus
              returnKeyType="done"
            />

            <Text
              style={[styles.counter, titleNearLimit && styles.counterWarning]}
            >
              {title.length}/{TITLE_MAX}
            </Text>

            <TextInput
              placeholder="Descripción corta (opcional)"
              value={description}
              onChangeText={(text) =>
                setDescription(text.slice(0, DESCRIPTION_MAX))
              }
              maxLength={DESCRIPTION_MAX}
              style={[styles.input, styles.textArea]}
              multiline
            />

            <Text
              style={[
                styles.counter,
                descriptionNearLimit && styles.counterWarning,
              ]}
            >
              {description.length}/{DESCRIPTION_MAX}
            </Text>
          </View>

          {/* CATEGORÍA */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Categoría</Text>
            <CategoryGridPicker value={category} onChange={setCategory} />
          </View>

          {/* FRECUENCIA */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Frecuencia</Text>
            <FrequencyPicker
              mode={frequencyMode}
              onModeChange={setFrequencyMode}
              value={frequency}
              onChange={setFrequency}
            />
          </View>

          {/* BOTONES */}
          <View style={styles.actionsRow}>
            <Pressable
              onPress={handleSave}
              disabled={isSaving || !hasChanges}
              style={[
                styles.actionButton,
                styles.editButton,
                (!hasChanges || isSaving) && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.editText}>
                {isSaving
                  ? 'Guardando...'
                  : !hasChanges
                    ? 'Sin cambios'
                    : 'Guardar cambios'}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => setConfirmDelete(true)}
            >
              <Text style={styles.deleteText}>Eliminar hábito</Text>
            </Pressable>
          </View>

          <ConfirmDeleteModal
            visible={confirmDelete}
            title="Eliminar Hábito"
            message={`¿Seguro que quieres eliminar "${title}"?`}
            onCancel={() => setConfirmDelete(false)}
            onConfirm={async () => {
              await deleteHabit(habitId);
              setConfirmDelete(false);

              Toast.show({
                type: 'info',
                text1: 'Hábito eliminado',
              });

              router.replace('/');
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 18,
  },

  sectionTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 14,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  counter: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 6,
    marginBottom: 12,
  },

  counterWarning: {
    color: '#f59e0b',
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  /*  primaryButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
  },

  primaryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  }, */

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

  /*  deleteButton: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#fef2f2',
  },

  deleteText: {
    color: '#dc2626',
    fontWeight: '600',
  }, */

  buttonDisabled: {
    opacity: 0.5,
  },
});
