import { View, Text, Pressable, StyleSheet } from 'react-native';

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export default function FrequencyPicker({
  mode,
  onModeChange,
  value,
  onChange,
}) {
  function toggleDay(index) {
    const copy = [...value];
    copy[index] = !copy[index];
    onChange(copy);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Frecuencia</Text>

      <View style={styles.radioRow}>
        {['daily', 'custom'].map((m) => (
          <Pressable
            key={m}
            onPress={() => onModeChange(m)}
            style={[styles.radio, mode === m && styles.radioActive]}
          >
            <Text style={mode === m && styles.radioTextActive}>
              {m === 'daily' ? 'Todos los días' : 'Especificar días'}
            </Text>
          </Pressable>
        ))}
      </View>

      {mode === 'custom' && (
        <View style={styles.daysRow}>
          {DAYS.map((day, i) => (
            <Pressable
              key={day}
              onPress={() => toggleDay(i)}
              style={[styles.day, value[i] && styles.dayActive]}
            >
              <Text style={value[i] && styles.dayTextActive}>{day}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  label: {
    fontWeight: '700',
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  radio: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cbd5f5',
  },
  radioActive: {
    backgroundColor: '#2563eb',
  },
  radioTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  daysRow: {
    flexDirection: 'row',
    gap: 8,
  },
  day: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayActive: {
    backgroundColor: '#2563eb',
  },
  dayTextActive: {
    color: '#fff',
  },
});
