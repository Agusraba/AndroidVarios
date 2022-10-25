import { React, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Accelerometer } from 'expo-sensors';
import * as SMS from 'expo-sms';
import Vibrator from '../components/vibration'

export default function llamado() {

    const sendSMS = async () => {
        const { result } = await SMS.sendSMSAsync(
            ['0123456789', '9876543210'],
            'My sample HelloWorld message'
        );
    }

    const configureShake = onShake => {
        // update value every 100ms.
        // Adjust this interval to detect
        // faster (20ms) or slower shakes (500ms)
        Accelerometer.setUpdateInterval(100);

        // at each update, we have acceleration registered on 3 axis
        // 1 = no device movement, only acceleration caused by gravity
        const onUpdate = ({ x, y, z }) => {

            // compute a total acceleration value, here with a square sum
            // you can eventually change the formula
            // if you want to prioritize an axis
            const acceleration = Math.sqrt(x * x + y * y + z * z);

            // Adjust sensibility, because it can depend of usage (& devices)
            const sensibility = 1.8;
            if (acceleration >= sensibility) {
                onShake(acceleration);
            }
        };
        Accelerometer.addListener(onUpdate);
    };
    // usage :
    const subscription = configureShake(acceleration => {
        console.log("shake with acceleration " + acceleration);
    });

    // when you're done, don't forget to unsubscribe
    Accelerometer.removeAllListeners();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
            <Text style={styles.text}>
                x: {x} y: {y} z: {z}
            </Text>
            <Text style={styles.text}>
                {acceleration}
            </Text>
            <SafeAreaView style={styles.buttonContainer}>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                    <Text>{subscription ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
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