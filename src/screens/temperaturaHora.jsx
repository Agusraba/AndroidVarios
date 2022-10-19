import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from "react";
import { getClima } from '../services/clima'
import GetLocation from 'react-native-get-location'
//import TemperaturaHora from '../components/temperaturaHora'

export default function TemperaturaHora() {

    const [clima, setClima] = useState({
        latitude: 0,
        longitude: 0,
        temperatura: 0,
        hora: 0
    });
    /*
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos) {
      var crd = pos.coords;
      
      setClima({
        latitude: crd.latitude,
        longitude: crd.longitude
      })
    };
    
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    
    navigator?.geolocation?.getCurrentPosition(success, error, options);
    */

    const temperatura = () => {
        getClima(clima.latitude, clima.longitude)
            .then((res) => {
                console.log(res.main.temp)
                setClima({
                    temperatura: res.main.temp
                })
            })
            .catch(() => {
                Alert.alert("Falló request a temperatura")
            })
    }
    
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 150000,
    })
        .then(location => {
            console.log(location)
            setClima({
                latitude: crd.latitude,
                longitude: crd.longitude
            })
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

    if (clima.latitude && clima.longitude) { temperatura() }

    var today = new Date();
    var now = today.toLocaleTimeString('es-AR')

    console.log(clima.temperatura);

    return (
        <View styles={styles.container}>
            <Text>Temperatura:{clima.temperatura}°</Text>
            <Text>Hora:{now}</Text>
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