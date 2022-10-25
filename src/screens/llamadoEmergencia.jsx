import { React, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Accelerometer } from 'expo-sensors';
import * as SMS from 'expo-sms';

export default function llamado() {
    const [subscription, setSubscription] = useState(null);
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
   const[acceleration, setAcceleration] = useState(0)
   const sendSMS = async () => {
    const { result } = await SMS.sendSMSAsync(
        ['0123456789', '9876543210'],
        'My sample HelloWorld message'
      );
    }

    const onUpdate = ({ x, y, z }) => {

        // compute a total acceleration value, here with a square sum
        // you can eventually change the formula
        // if you want to prioritize an axis
        const acceleration2 = Math.sqrt(x * x + y * y + z * z);
    
        // Adjust sensibility, because it can depend of usage (& devices)
        const sensibility = 1.8;
        if (acceleration2 >= sensibility) {
            onShake(acceleration2)
            setAcceleration(acceleration2);
        }
      };

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                setData(accelerometerData);
                onUpdate(accelerometerData)
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const { x, y, z } = data;
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