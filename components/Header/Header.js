import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Hoy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: colors.backgroundLight,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textLight,
  },
});
