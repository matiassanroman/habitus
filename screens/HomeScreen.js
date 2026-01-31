import Screen from '../screens/Screen';
import DatePicker from '../components/DatePicker/DatePicker';
import HabitList from '../components/Habit/HabitList';
import { useState } from 'react';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Screen>
      <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      <HabitList selectedDate={selectedDate} />
    </Screen>
  );
}
