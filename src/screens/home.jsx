import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
export default function Home() {
   const navigation = useNavigation()
    
   return (
        <View styles={styles.container}>
            <Button disabled title='Nro. de Emergencia🔒' ></Button>
            <Button title='Contactos' onPress={()=>{navigation.navigate("Contactos")}}></Button>
            <Button disabled title='Mensaje al usuario🔒' ></Button>
            <Button title='Temperatura-Hora' onPress={()=>{navigation.navigate("TemperaturaHora")}}></Button>
            <Button disabled title='Llamada de emergencia🔒' ></Button>
            <Button disabled title='Elegir fondo imagen🔒' ></Button>
            <Button disabled title='Video favorito🔒' ></Button>
            <Button title='Identificador QR' onPress={()=>{navigation.navigate("QRScanner")}}></Button>
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