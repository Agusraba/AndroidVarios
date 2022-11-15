import { StyleSheet, Text, SafeAreaView, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState, useEffect } from "react";
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contacto from "../components/contacto.js"
import Vibrator from '../components/vibration'

export default function Contactos() {
    const navigation = useNavigation()
    const [contacts, setContacts] = useState(false)
    const [permissions, setPermission] = useState(false)
    const [storedPhone, setStoredPhone] = useState()

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                setPermission(true);
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContacts(data)

                } else {
                    Vibrator("No tiene contactos")
                }
            } else {
                Vibrator("No se ha concedido los permisos para acceder a los contactos")
            }
        })();
    }, []);
    
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

    const renderItem = ({ item }) => (
        <Contacto data={item} emergency={storedPhone}/>
    )

    return (
        <SafeAreaView style={styles.container}>
            <Text>Contactos</Text>
            {permissions &&
                    <FlatList
                        data={contacts}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}>
                    </FlatList>
            }
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