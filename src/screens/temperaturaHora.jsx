import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import { getClima } from '../services/clima'
import * as Location from 'expo-location';
import Vibrator from '../components/vibration'

//import TemperaturaHora from '../components/temperaturaHora'

export default function TemperaturaHora() {
    const [clima, setClima] = useState({
        temperatura: 0,
        hora: 0
    });

    var today = new Date();
    var now = today.toLocaleTimeString('es-AR')

    const temperatura = (lat, long) => {
        getClima(lat, long)
            .then((res) => {
                console.log(res.main.temp)
                setClima({
                    temperatura: res.main.temp
                })
            })
            .catch(() => {
                Vibrator("Falló request a temperatura");
            })
    }
  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status == 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            temperatura(location.coords.latitude, location.coords.longitude)
        }else{
            Vibrator("Permisos no concedidos para ubicación");
        }
      })();
    }, []);

    return (
        <SafeAreaView styles={styles.container}>
            <Text>Temperatura:{clima.temperatura ? clima.temperatura + "°" : "Waiting..."}</Text>
            <Text>Hora:{now}</Text>
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