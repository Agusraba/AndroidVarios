import { React, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Accelerometer } from 'expo-sensors';

export default function llamado() {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);

    const _slow = () => {
        Accelerometer.setUpdateInterval(1000);
    };

    const _fast = () => {
        Accelerometer.setUpdateInterval(16);
    };

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                setData(accelerometerData);
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
        <View style={styles.container}>
            <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
            <Text style={styles.text}>
                x: {x} y: {y} z: {z}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                    <Text>{subscription ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={styles.button}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
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