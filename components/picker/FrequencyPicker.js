import { useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const EMPTY = Array(7).fill(false);
const DAILY = Array(7).fill(true);

export default function FrequencyPicker({
  mode,
  onModeChange,
  value,
  onChange,
  isSaving,
}) {
  const lastCustom = useRef(EMPTY);

  function handleModeChange(newMode) {
    if (newMode === 'daily') {
      if (mode === 'custom') {
        lastCustom.current = value;
      }

      onChange(DAILY);
    }

    if (newMode === 'custom') {
      onChange(lastCustom.current);
    }

    onModeChange(newMode);
  }

  function toggleDay(index) {
    const copy = [...value];
    copy[index] = !copy[index];
    onChange(copy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.modeContainer}>
        <Pressable
          onPress={() => handleModeChange('daily')}
          style={[styles.modeButton, mode === 'daily' && styles.modeSelected]}
          disabled={isSaving}
        >
          <Text
            style={[
              styles.modeText,
              mode === 'daily' && styles.modeTextSelected,
            ]}
          >
            Todos los días
          </Text>
        </Pressable>

        <Pressable
          onPress={() => handleModeChange('custom')}
          style={[styles.modeButton, mode === 'custom' && styles.modeSelected]}
          disabled={isSaving}
        >
          <Text
            style={[
              styles.modeText,
              mode === 'custom' && styles.modeTextSelected,
            ]}
          >
            Especificar días
          </Text>
        </Pressable>
      </View>

      {/* DÍAS */}
      {mode === 'custom' && (
        <View style={styles.daysContainer}>
          {DAYS.map((day, i) => (
            <Pressable
              key={day}
              onPress={() => toggleDay(i)}
              style={[styles.dayButton, value[i] && styles.daySelected]}
              disabled={isSaving}
            >
              <Text
                style={[styles.dayText, value[i] && styles.dayTextSelected]}
              >
                {day}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  modeContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeSelected: {
    backgroundColor: '#2563eb',
  },
  modeText: {
    fontWeight: '600',
    color: '#475569',
  },
  modeTextSelected: {
    color: '#fff',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dayButton: {
    width: 35,
    height: 35,
    borderRadius: 12,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
  },
  daySelected: {
    backgroundColor: '#2563eb',
  },
  dayText: {
    fontWeight: '600',
    color: '#475569',
  },
  dayTextSelected: {
    color: '#fff',
  },
});
