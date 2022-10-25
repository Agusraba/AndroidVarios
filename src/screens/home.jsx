import { StyleSheet, Text, SafeAreaView , Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
export default function Home() {
   const navigation = useNavigation()
    
   return (
        <SafeAreaView  styles={styles.container}>
            <Button  title='Nro. de Emergencia' onPress={()=>{navigation.navigate("NumeroEmergencia")}}></Button>
            <Button title='Contactos 💯' onPress={()=>{navigation.navigate("Contactos")}}></Button>
            <Button title='Temperatura-Hora 💯' onPress={()=>{navigation.navigate("TemperaturaHora")}}></Button>
            <Button title='Llamada de emergencia' onPress={()=>{navigation.navigate("LlamadoEmergencia")}}></Button>
            <Button disabled title='Elegir fondo imagen🔒' ></Button>
            <Button disabled title='Video favorito🔒' ></Button>
            <Button title='Identificador QR 💯' onPress={()=>{navigation.navigate("QRScanner")}}></Button>
        </SafeAreaView >
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