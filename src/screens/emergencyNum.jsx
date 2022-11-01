import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from "react-native-phone-number-input";
import Vibrator from '../components/vibration'

export default function NumeroEmergencia() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [formattedText, setFormattedText] = useState("");
    const [storedPhone, setStoredPhone] = useState()
    const phoneInput = useRef<PhoneInput>(null);


    const storeData = async (value) => {
        try {
            console.log(value)
            await AsyncStorage.setItem('@emergency_number', value)
        } catch (e) {
            Vibrator("No se pudo guardar en Local Storage")
        }
    }

    const bringData = async () => {
        try {
          const value = await AsyncStorage.getItem('@emergency_number');
          if (value !== null) {
            // We have data!!
            setStoredPhone(value);
          }
        } catch (error) {
          // Error retrieving data
          Vibrator("No se pudo obtener del Local Storage")

        }
    }

    useEffect (() => {
        (async() => {
            bringData()
        })()
    })

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.message}>
              <Text>Formatted Value : {storedPhone}</Text>
            </View>
            <PhoneInput
                ref={useRef(phoneInput)}
                defaultValue={phoneNumber}
                defaultCode="AR"
                layout="first"
                onChangeText={(text) => {
                    setPhoneNumber(text);
                }}
                onChangeFormattedText={(text) => {
                    setFormattedText(text);
                }}
                withDarkTheme
                withShadow
                autoFocus
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                   console.log(formattedText)
                   storeData(formattedText)
                }} >
                <Text>Check</Text>
            </TouchableOpacity>
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
    phoneInput: {
        borderWidth: 1,
        borderRadius: 25,
        width: 250,
        height: 50,
        padding: 5,
    },
    button: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 15,
        marginTop: 25,
        padding: 10,
        alignItems: 'center'
    },
});