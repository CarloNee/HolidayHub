// MY CODE HERE
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { useFonts, Courgette_400Regular } from '@expo-google-fonts/courgette';

export default function App() {
  // Let the app load fonts before rendering
  let [fontsLoaded] = useFonts({
    Courgette_400Regular,
  });

  // if fonts are not loaded, return null
  if (!fontsLoaded) {
    return null;
  }

  return (
    // Adjacent JSX elements must be wrapped in an enclosing tag otherwise SyntaxErrors will be thrown. Error from expo when not using it
    <>
    <StackNavigator />
    </>
  );
}

// stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// MY CODE ENDS HERE
