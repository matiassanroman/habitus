import { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { getCategoryById } from '../../../constants/categories';
import { MaterialIcons } from '@expo/vector-icons';
import ConfirmDeleteModal from '../../modal/ConfirmDeleteModal';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function HabitCard({ habit, onDelete }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>{habit.title}</Text>

        <View style={styles.headerRight}>
          <MaterialIcons name={icon} size={22} color={color} />

          <Pressable
            style={styles.menuButton}
            onPress={() => setMenuVisible(true)}
          >
            <MaterialIcons name="more-vert" size={20} color="#64748B" />
          </Pressable>
        </View>
      </View>

      {/* MENU MODAL */}
      <Modal
        transparent
        animationType="fade"
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Hábito: {habit.title}</Text>
            <Text style={styles.message}>¿Que acción deseas hacer?</Text>
            <View style={styles.actionsRow}>
              {/* EDITAR */}
              <Pressable
                style={[styles.actionButton, styles.editButton]}
                onPress={() => {
                  setMenuVisible(false);
                  router.push(`/habit/${habit.id}`);
                }}
              >
                <Text style={styles.editText}>Editar</Text>
              </Pressable>
              {/* BORRAR */}
              <Pressable
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => {
                  setMenuVisible(false);
                  setConfirmDelete(true);
                }}
              >
                <Text style={styles.deleteText}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* CONFIRM DELETE */}
      <ConfirmDeleteModal
        visible={confirmDelete}
        title="Eliminar hábito"
        message={`¿Seguro que quieres eliminar "${habit.title}"?`}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          setConfirmDelete(false);
          onDelete?.(habit.id);
        }}
      />

      {/* FRECUENCIA */}
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

      {/* DESCRIPCIÓN */}
      {habit.description && (
        <Text style={styles.description}>{habit.description}</Text>
      )}

      {/* SEMANA */}
      <View style={styles.weekRow}>
        {DAYS.map((day, index) => {
          const date = getDateForDay(index);
          const completed = isCompletedForDate(date);

          return (
            <View
              key={day}
              style={[styles.dayBox, completed && styles.dayCompleted]}
            >
              <Text
                style={[styles.dayText, completed && styles.dayCompletedText]}
              >
                {day}
              </Text>
              <Text
                style={[styles.dateText, completed && styles.dayCompletedText]}
              >
                {date.getDate()}
              </Text>
            </View>
          );
        })}
      </View>

      {/* RACHA */}
      <Text style={styles.streak}>
        🔥 Racha más larga: {getLongestStreak()} días
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  menuButton: {
    padding: 6,
    borderRadius: 10,
  },

  title: {
    flex: 1,
    marginRight: 10,
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },

  frequencyBadge: {
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },

  frequencyEveryday: {
    backgroundColor: '#DCFCE7',
  },

  frequencySpecific: {
    backgroundColor: '#DBEAFE',
  },

  frequencyText: {
    fontSize: 12,
    fontWeight: '600',
  },

  frequencyTextGreen: {
    color: '#166534',
  },

  frequencyTextBlue: {
    color: '#1E40AF',
  },

  description: {
    marginTop: 14,
    fontSize: 14,
    color: '#475569',
  },

  weekRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dayBox: {
    width: 38,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },

  dayCompleted: {
    backgroundColor: '#DCFCE7',
  },

  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },

  dateText: {
    fontSize: 12,
    color: '#6B7280',
  },

  dayCompletedText: {
    color: '#166534',
  },

  streak: {
    marginTop: 16,
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: 280,
    gap: 14,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  message: {
    textAlign: 'center',
    color: '#4b5563',
  },
  modalItem: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },

  editButton: {
    backgroundColor: '#e0e7ff',
    marginRight: 8,
  },

  deleteButton: {
    backgroundColor: '#fee2e2',
    marginLeft: 8,
  },
  editText: {
    color: '#2563eb',
    fontWeight: '700',
  },

  deleteText: {
    color: '#dc2626',
    fontWeight: '700',
  },
});
