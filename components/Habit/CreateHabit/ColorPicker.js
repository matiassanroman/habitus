import { View, Pressable, StyleSheet } from 'react-native';

const COLORS = [
  '#2563eb',
  '#16a34a',
  '#dc2626',
  '#f59e0b',
  '#7c3aed',
  '#0f766e',
];

export default function ColorPicker({ selected, onSelect }) {
  return (
    <View style={styles.row}>
      {COLORS.map((color) => (
        <Pressable
          key={color}
          onPress={() => onSelect(color)}
          style={[
            styles.color,
            { backgroundColor: color },
            selected === color && styles.active,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  color: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  active: {
    borderWidth: 3,
    borderColor: '#000',
  },
});
