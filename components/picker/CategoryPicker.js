import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Keyboard,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CATEGORIES } from '../../constants/categories';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 3; // 3 columnas con padding

export default function CategoryGridPicker({ value, onChange }) {
  function handleSelect(id) {
    Keyboard.dismiss();
    onChange(id);
  }

  return (
    <View>
      <View style={styles.grid}>
        {CATEGORIES.map((cat) => {
          const selected = value === cat.id;

          return (
            <Pressable
              key={cat.id}
              onPress={() => handleSelect(cat.id)}
              style={[
                styles.card,
                { width: ITEM_WIDTH },
                selected && {
                  borderColor: cat.color,
                  backgroundColor: `${cat.color}15`,
                },
              ]}
            >
              <MaterialIcons
                name={cat.icon}
                size={18}
                color={selected ? cat.color : '#64748b'}
              />
              <Text
                numberOfLines={1}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f8fafc',
    marginBottom: 12,
  },

  text: {
    marginTop: 6,
    fontSize: 12,
    color: '#64748b',
  },
});
