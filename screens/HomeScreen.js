import { useState } from 'react';
import Screen from '../screens/Screen';
import DatePicker from '../components/picker/DatePicker';
import HabitList from '../components/habit/home/HabitList';

export default function HomeScreen() {
  function getLocalDateString(date = new Date()) {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const [selectedDate, setSelectedDate] = useState(getLocalDateString());

  return (
    <Screen>
      <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <HabitList selectedDate={selectedDate} />
    </Screen>
  );
}
