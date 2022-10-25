import React from 'react';
import {  Vibration, Alert } from 'react-native';


export default function Vibrator(mensaje) {
    console.log(mensaje)
    Vibration.vibrate()
    Alert.alert(mensaje)
};

