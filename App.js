import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home'
import Contactos from './src/screens/contacts'
import TemperaturaHora from './src/screens/temperaturaHora'
import QRScanner from './src/screens/QRScanner'

export default function App() {
  const Stack = createNativeStackNavigator();
  
  function HomeScreen() {
    return (
      <Home />
    );
  }
  function ContactosScreen() {
    return (
      <Contactos />
    );
  }
  function TemperaturaHoraScreen() {
    return (
      <TemperaturaHora />
    );
  }
  function QRScannerScreen() {
    return (
      <QRScanner />
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Contactos" component={ContactosScreen} />
        <Stack.Screen name="TemperaturaHora" component={TemperaturaHoraScreen} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
