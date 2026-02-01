import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Screen({ children }) {
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 20,
        paddingHorizontal: 15,
        paddingBottom: bottom,
      }}
    >
      {children}
    </ScrollView>
  );
}
