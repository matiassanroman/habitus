import { View, Text, Pressable, StyleSheet, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CATEGORIES } from '../../../constants/categories';

export default function CategoryGridPicker({ value, onChange }) {
  function handleSelect(id) {
    Keyboard.dismiss();
    onChange(id);
  }

  return (
    <View>
      <Text style={styles.label}>Categoría</Text>

      <View style={styles.grid}>
        {CATEGORIES.map((cat) => {
          const selected = value === cat.id;
          return (
            <Pressable
              key={cat.id}
              onPress={() => handleSelect(cat.id)}
              style={[
                styles.card,
                selected && {
                  borderColor: cat.color,
                  backgroundColor: `${cat.color}20`,
                },
              ]}
            >
              <MaterialIcons
                name={cat.icon}
                size={20}
                color={selected ? cat.color : '#475569'}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.text,
                  selected && { color: cat.color, fontWeight: '600' },
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f8fafc',
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    color: '#475569',
  },
});
