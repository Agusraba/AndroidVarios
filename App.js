import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home'
import NumeroEmergencia from './/src/screens/emergencyNum'
import Contactos from './src/screens/contacts'
import TemperaturaHora from './src/screens/temperaturaHora'
import QRScanner from './src/screens/QRScanner'
import Vibrator from './src/components/vibration'
export default function App() {
  const Stack = createNativeStackNavigator();
  
  function HomeScreen() {
    return (
      <Home />
    );
  }
  function EmergencyNumScreen() {
    return (
      <NumeroEmergencia />
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
 
  function Vibrate() {
    return (
      <Vibrator />
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NumeroEmergencia" component={EmergencyNumScreen} />
        <Stack.Screen name="Contactos" component={ContactosScreen} />
        <Stack.Screen name="TemperaturaHora" component={TemperaturaHoraScreen} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} />
        <Stack.Screen name="vibrar" component={Vibrate} />
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
