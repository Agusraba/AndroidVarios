import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { axiosClima } from './src/services/clima'
import GetLocation from 'react-native-get-location'

export default function App() {
  const [clima, setClima] = useState();
  /* 
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
    
    setClima(crd.latitude)
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  };
  
  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
  
  navigator?.geolocation?.getCurrentPosition(success, error, options);
  */
  // crea un nuevo objeto `Date`
  var today = new Date();
  
  // obtener la hora en la configuración regional de EE. UU.
  var now = today.toLocaleTimeString('es-AR');
  console.log(now);

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 150000,
  })
    .then(location => {
      console.log(location)
      setClima(location)
    })
    .catch(ex => {
      const { code, message } = ex;
      console.warn(code, message);
      if (code === 'CANCELLED') {
        Alert.alert('Location cancelled by user or by another request');
      }
      if (code === 'UNAVAILABLE') {
        Alert.alert('Location service is disabled or unavailable');
      }
      if (code === 'TIMEOUT') {
        Alert.alert('Location request timed out');
      }
      if (code === 'UNAUTHORIZED') {
        Alert.alert('Authorization denied');
      }
    });



  return (
    <View style={styles.container}>
      <Text>Nce {clima}</Text>
      <StatusBar style="auto" />
    </View>
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
