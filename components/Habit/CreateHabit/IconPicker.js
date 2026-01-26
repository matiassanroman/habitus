import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ICONS = [
  'water-drop',
  'fitness-center',
  'self-improvement',
  'directions-run',
  'bedtime',
  'school',
  'menu-book',
  'work',
  'check-circle',
  'smoke-free',
  'no-food',
  'phone-disabled',
  'favorite',
  'spa',
];

export default function IconPicker({ selected, color, onSelect }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {ICONS.map((icon) => {
          const active = selected === icon;
          return (
            <Pressable
              key={icon}
              onPress={() => onSelect(icon)}
              style={[
                styles.iconWrapper,
                active && { backgroundColor: `${color}22` },
              ]}
            >
              <MaterialIcons
                name={icon}
                size={28}
                color={active ? color : '#94a3b8'}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
