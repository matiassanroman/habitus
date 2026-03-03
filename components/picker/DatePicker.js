import { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 7;

export default function DatePicker({ selectedDate, onSelectDate }) {
  const scrollRef = useRef(null);

  function createLocalDate(ymd) {
    const [y, m, d] = ymd.split('-');
    return new Date(y, m - 1, d);
  }

  function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getMonday(date) {
    const jsDay = date.getDay() === 0 ? 7 : date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - (jsDay - 1));
    return monday;
  }

  const [days] = useState(() => {
    const baseDate = createLocalDate(selectedDate);
    const currentMonday = getMonday(baseDate);

    const startDate = new Date(currentMonday);
    startDate.setDate(currentMonday.getDate() - 7);

    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);

      const labels = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

      return {
        label: labels[d.getDay()],
        dateNumber: d.getDate(),
        ymd: formatLocalDate(d),
      };
    });
  });

  useEffect(() => {
    const index = days.findIndex((d) => d.ymd === selectedDate);

    if (index !== -1) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          x: index * ITEM_WIDTH - (width / 2 - ITEM_WIDTH / 2),
          animated: false,
        });
      });
    }
  }, []);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {days.map((item) => {
        const active = item.ymd === selectedDate;

        return (
          <Pressable
            key={item.ymd}
            style={styles.pressable}
            onPress={() => onSelectDate(item.ymd)}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  pressable: {
    width: ITEM_WIDTH,
    alignItems: 'center',
  },

  card: {
    width: '85%',
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
