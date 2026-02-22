import {
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  View,
  LayoutAnimation,
} from 'react-native';
import { useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { saveHabit } from '../helper/storage/habitsStorage';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

import FrequencyPicker from '../components/picker/FrequencyPicker';
import CategoryGridPicker from '../components/picker/CategoryPicker';
import { getCategoryById } from '../constants/categories';
import Screen from './Screen';

export default function CreateHabitWizardScreen() {
  const TITLE_MAX = 40;
  const DESCRIPTION_MAX = 120;

  const [step, setStep] = useState(1);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [frequencyMode, setFrequencyMode] = useState('daily');
  const [frequency, setFrequency] = useState(Array(7).fill(true));
  const [isSaving, setIsSaving] = useState(false);

  const { label } = getCategoryById(category);

  const canContinueStep1 = title.trim().length > 3;

  useFocusEffect(
    useCallback(() => {
      setStep(1);
      setTitle('');
      setDescription('');
      setCategory('other');
      setFrequencyMode('daily');
      setFrequency(Array(7).fill(true));
      setIsSaving(false);
    }, []),
  );

  function nextStep() {
    if (step === 1 && !canContinueStep1) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep((prev) => prev + 1);
  }

  function prevStep() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep((prev) => prev - 1);
  }

  async function handleSave() {
    if (isSaving) return;

    setIsSaving(true);

    const habit = {
      id: Date.now(),
      title: title.trim() || description.slice(0, 25),
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

      //setTimeout(() => router.back(), 3000);
      setTimeout(() => router.replace('/'), 3000);
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
      <ProgressIndicator step={step} />

      {/* STEP 1 */}
      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.title}>¿Qué hábito quieres construir?</Text>

          <Text style={styles.subtitle}>
            Sé específico. Los hábitos claros se cumplen más.
          </Text>

          <TextInput
            placeholder="Ej: Leer 10 páginas por día"
            value={title}
            onChangeText={(text) => setTitle(text.slice(0, TITLE_MAX))}
            maxLength={TITLE_MAX}
            style={styles.input}
          />

          <Text style={styles.counter}>
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

          <Text style={styles.counter}>
            {description.length}/{DESCRIPTION_MAX}
          </Text>

          <Pressable
            onPress={nextStep}
            disabled={!canContinueStep1}
            style={[
              styles.primaryButton,
              !canContinueStep1 && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.primaryText}>Continuar</Text>
          </Pressable>
        </View>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.title}>Elige una categoría</Text>

          <Text style={styles.subtitle}>
            Esto te ayudará a organizar mejor tus hábitos.
          </Text>

          <CategoryGridPicker value={category} onChange={setCategory} />

          <WizardNavigation onBack={prevStep} onNext={nextStep} />
        </View>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <View style={styles.card}>
          <Text style={styles.title}>¿Con qué frecuencia?</Text>

          <Text style={styles.subtitle}>
            Define cuándo quieres realizar este hábito.
          </Text>

          <FrequencyPicker
            mode={frequencyMode}
            onModeChange={setFrequencyMode}
            value={frequency}
            onChange={setFrequency}
          />

          {/* RESUMEN */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumen del hábito</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Hábito</Text>
              <Text style={styles.summaryValue}>{title || description}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Categoría</Text>
              <Text style={styles.summaryValue}>{label}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frecuencia</Text>
              <Text style={styles.summaryValue}>
                {frequencyMode === 'daily' ? 'Todos los días' : 'Personalizada'}
              </Text>
            </View>
          </View>

          <WizardNavigation
            onBack={prevStep}
            onNext={handleSave}
            nextLabel={isSaving ? 'Guardando...' : 'Crear hábito'}
          />
        </View>
      )}
    </Screen>
  );
}

function ProgressIndicator({ step }) {
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>Paso {step} de 3</Text>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]}
        />
      </View>
    </View>
  );
}

function WizardNavigation({ onBack, onNext, nextLabel = 'Continuar' }) {
  return (
    <View style={styles.navContainer}>
      <Pressable onPress={onBack} style={styles.secondaryButton}>
        <Text style={styles.secondaryText}>Atrás</Text>
      </Pressable>

      <Pressable onPress={onNext} style={styles.primaryButtonSmall}>
        <Text style={styles.primaryText}>{nextLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
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
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
  },

  secondaryText: {
    color: '#334155',
    fontWeight: '600',
  },

  primaryButtonSmall: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 14,
    backgroundColor: '#2563eb',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    alignItems: 'center',
  },
  backText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressText: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#2563eb',
    borderRadius: 10,
  },
  summaryCard: {
    marginTop: 28,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  summaryTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 14,
  },

  summaryRow: {
    marginBottom: 10,
  },

  summaryLabel: {
    fontSize: 12,
    color: '#64748b',
  },

  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
  },
});
