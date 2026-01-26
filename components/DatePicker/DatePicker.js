import { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../theme/colors';

export default function DatePicker({ selectedDate, onSelectDate }) {
  function getWeekDates(baseDate) {
    const jsDay = baseDate.getDay() === 0 ? 7 : baseDate.getDay();

    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() - (jsDay - 1));

    const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      return {
        label: labels[i],
        dateNumber: date.getDate(),
        fullDate: date,
      };
    });
  }

  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates(getWeekDates(selectedDate));
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      {dates.map((item) => {
        const active =
          item.fullDate.toDateString() === selectedDate.toDateString();

        return (
          <Pressable
            key={item.fullDate.toISOString()}
            style={styles.pressable}
            onPress={() => onSelectDate(item.fullDate)}
          >
            <View style={[styles.card, active && styles.cardActive]}>
              <Text style={[styles.day, active && styles.dayActive]}>
                {item.label}
              </Text>
              <Text style={[styles.date, active && styles.dateActive]}>
                {item.dateNumber}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: 72,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardActive: {
    backgroundColor: colors.primary,
  },
  day: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: colors.muted,
  },
  dayActive: {
    color: '#ffffffcc',
  },
  date: {
    fontSize: 18,
    fontWeight: '700',
  },
  dateActive: {
    color: '#fff',
  },
});
