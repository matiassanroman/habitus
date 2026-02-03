import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCategoryById } from '../../../constants/categories';
import { MaterialIcons } from '@expo/vector-icons';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function HabitCard({ habit }) {
  //const [selectedDate] = useState(new Date());
  const selectedDate = new Date();
  const { icon, color } = getCategoryById(habit.category);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const isCompletedForDate = (date) =>
    habit.completedDates.includes(formatDate(date));

  const isEveryday = habit.frequency.every(Boolean);

  const activeDays = habit.frequency
    .map((active, index) => (active ? DAYS[index] : null))
    .filter(Boolean)
    .join(' · ');

  // ✅ Semana correctamente anclada a lunes
  const getDateForDay = (index) => {
    const date = new Date(selectedDate);
    const day = selectedDate.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    date.setDate(selectedDate.getDate() + mondayOffset + index);
    return date;
  };

  const getLongestStreak = () => {
    if (!habit.completedDates.length) return 0;

    const dates = habit.completedDates
      .map((d) => new Date(d))
      .sort((a, b) => a - b);

    let max = 1;
    let current = 1;

    for (let i = 1; i < dates.length; i++) {
      const diff = (dates[i] - dates[i - 1]) / 86400000;
      diff === 1 ? current++ : (current = 1);
      max = Math.max(max, current);
    }

    return max;
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{habit.title}</Text>
        <View style={styles.rightHeader}>
          <View>
            <MaterialIcons name={icon} size={24} color={color} />
          </View>
        </View>
      </View>

      {/* Frecuencia */}
      <View
        style={[
          styles.frequencyBadge,
          isEveryday ? styles.frequencyEveryday : styles.frequencySpecific,
        ]}
      >
        <Text
          style={[
            styles.frequencyText,
            isEveryday ? styles.frequencyTextGreen : styles.frequencyTextBlue,
          ]}
        >
          {isEveryday ? 'Todos los días' : activeDays}
        </Text>
      </View>

      {/* Descripción */}
      {habit.description ? (
        <Text style={styles.description}>{habit.description}</Text>
      ) : null}

      {/* Semana */}
      <View style={styles.weekRow}>
        {DAYS.map((day, index) => {
          const date = getDateForDay(index);
          const completed = isCompletedForDate(date);

          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const dayDate = new Date(date);
          dayDate.setHours(0, 0, 0, 0);

          let dayStyle = styles.dayFuture;
          let textStyle = styles.dayFutureText;

          if (dayDate < today) {
            // Pasado
            if (completed) {
              dayStyle = styles.dayCompleted;
              textStyle = styles.dayCompletedText;
            } else {
              dayStyle = styles.dayMissed;
              textStyle = styles.dayMissedText;
            }
          } else if (dayDate.getTime() === today.getTime()) {
            // Hoy
            if (completed) {
              dayStyle = styles.dayCompleted;
              textStyle = styles.dayCompletedText;
            } else {
              dayStyle = styles.dayToday;
              textStyle = styles.dayTodayText;
            }
          } else {
            // Futuro

            dayStyle = styles.dayFuture;
            textStyle = styles.dayFutureText;
          }

          return (
            <View
              //key={`${habit.id}-${formatDate(date)}`}
              key={day}
              style={[styles.dayBox, dayStyle]}
            >
              <Text style={[styles.dayText, textStyle]}>{day}</Text>
              <Text style={[styles.dateText, textStyle]}>{date.getDate()}</Text>
            </View>
          );
        })}
      </View>

      {/* Racha */}
      <Text style={styles.streak}>
        🔥 Racha más larga: {getLongestStreak()} días
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  /* Frequency */
  frequencyBadge: {
    marginTop: 10,
    alignSelf: 'flex-start', // que se ajuste al contenido
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  frequencyEveryday: {
    backgroundColor: '#DCFCE7', // verde pastel
  },
  frequencySpecific: {
    backgroundColor: '#DBEAFE', // azul pastel
  },
  frequencyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  frequencyTextGreen: {
    color: '#166534', // verde oscuro
  },
  frequencyTextBlue: {
    color: '#1E40AF', // azul oscuro
  },
  /* Text */
  frequency: {
    marginTop: 10,
    fontSize: 13,
    color: '#64748B',
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    color: '#475569',
  },
  /* Semana */
  weekRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayBox: {
    width: 40,
    height: 55,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
  },
  // Estados
  dayCompleted: {
    backgroundColor: 'rgba(220, 252, 231, 1)',
    borderColor: '#166534',
  },
  dayCompletedText: {
    color: '#166534',
  },
  dayToday: {
    //backgroundColor: '#E2E8F0',
    borderColor: '#94A3B8',
  },
  dayTodayText: {
    color: '#64748B', // gris oscuro
  },
  dayFuture: {
    backgroundColor: '#F1F5F9', // gris
    borderColor: 'transparent',
  },
  dayFutureText: {
    color: '#64748B',
  },
  dayMissed: {
    backgroundColor: '#FEE2E2', // rojo pastel
    borderColor: '#991B1B', // rojo fuerte
  },
  dayMissedText: {
    color: '#991B1B', // texto blanco
  },
  /* Streak */
  streak: {
    marginTop: 18,
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
});
