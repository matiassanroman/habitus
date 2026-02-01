import { useState } from 'react';
import Screen from '../screens/Screen';
import DatePicker from '../components/picker/DatePicker';
import HabitList from '../components/habit/HabitList';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Screen>
      <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <HabitList selectedDate={selectedDate} />
    </Screen>
  );
}
