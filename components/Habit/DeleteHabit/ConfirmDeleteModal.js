import { Modal, Pressable, View, Text, StyleSheet } from 'react-native';

export default function ConfirmDeleteModal({
  visible,
  title = 'Eliminar',
  message = '¿Seguro que quieres eliminar esto?',
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actionsRow}>
            <Pressable
              style={[styles.actionButton, styles.deleteButton]}
              onPress={onConfirm}
            >
              <Text style={styles.deleteText}>Eliminar</Text>
            </Pressable>

            <Pressable
              style={[styles.actionButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#4b5563',
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

  cancelButton: {
    backgroundColor: '#e0e7ff',
    marginLeft: 8,
  },

  deleteButton: {
    backgroundColor: '#fee2e2',
    marginRight: 8,
  },

  cancelText: {
    color: '#2563eb',
    fontWeight: '700',
  },

  deleteText: {
    color: '#dc2626',
    fontWeight: '700',
  },
});
