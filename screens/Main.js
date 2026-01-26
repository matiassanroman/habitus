import { ScrollView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import DatePicker from '../components/DatePicker/DatePicker';
import HabitList from '../components/Habit/HabitList';
import { useState } from 'react';
import CreateHabitScreen from './CreateHabitScreen';

export default function Main() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        <Header />
        <DatePicker
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        <HabitList selectedDate={selectedDate} />
        {/* <CreateHabitScreen /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
