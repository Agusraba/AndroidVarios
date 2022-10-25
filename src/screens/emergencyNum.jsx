import React, { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableHighlight } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from "react-native-phone-input";
import Vibrator from '../components/vibration'

export default function NumeroEmergencia() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const phoneInput = useRef<PhoneInput>(null);


    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@emergency_number', value)
        } catch (e) {
            // saving error
        }
    }

    const handleSubmit = (phoneNumber) => {
        const isValid = phoneInput.current?.isValidNumber(phoneNumber);
        if (isValid) {
            console.log("SUBMITTED! ", phoneNumber)
            storeData(phoneNumber)
        } else {
            console.log("INVALID NUMBER.")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Hola</Text>
            <PhoneInput
                style={styles.phoneInput}
                initialValue={phoneNumber}
                initialCountry="ar"
                onChangeText={(text) => {
                    setPhoneNumber(text);
                }}
                onChangeFormattedText={(text) => {
                    isValidNumber(text) ? updateNumber('phoneNumber', text) : text
                    setFormattedText(text);
                    console.log(text);
                }}
                withShadow
                autoFocus
            />
            <TouchableHighlight onPress={handleSubmit}>
                <Text>Submit</Text>
            </TouchableHighlight>
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