import { ScrollView } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function Screen({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
