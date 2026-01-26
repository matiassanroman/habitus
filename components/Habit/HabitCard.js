import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function HabitCard({
  id,
  title,
  description,
  icon,
  color,
  completed,
  selectedDate,
  onToggle,
  onLongPress,
}) {
  function isFutureDate(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate > today;
  }

  const disabled = isFutureDate(selectedDate);

  return (
    <Pressable
      onPress={onToggle}
      onLongPress={onLongPress}
      delayLongPress={400}
      disabled={disabled}
    >
      <View
        style={[
          styles.card,
          completed && styles.completedCard,
          disabled && styles.disabledCard,
        ]}
      >
        <View style={styles.left}>
          {/* ICONO DEL HÁBITO */}
          <View style={styles.iconBox}>
            <MaterialIcons
              name={icon}
              size={24}
              color={color}
              //color={completed ? colors.muted : colors.primary}
            />
          </View>

          <View>
            <Text style={[styles.title, completed && styles.completedTitle]}>
              {title}
            </Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>

        {/* CHECKBOX */}
        <View style={styles.checkboxBox}>
          <MaterialIcons
            name={completed ? 'check-box' : 'check-box-outline-blank'}
            size={28}
            color={completed ? colors.primary : colors.muted}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
  },
  completedCard: {
    backgroundColor: '#f1f5f9',
    opacity: 0.7,
  },
  disabledCard: {
    opacity: 0.4,
  },
  left: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: colors.muted,
  },
  description: {
    fontSize: 12,
    color: colors.muted,
  },
  checkboxBox: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
