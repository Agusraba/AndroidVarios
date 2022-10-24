import { StyleSheet, Text, SafeAreaView , Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState, useEffect } from "react";
import * as Contacts from 'expo-contacts';
import Contacto from "../components/contacto.js"

export default function Contactos() {
    const navigation = useNavigation()
    const [contacts, setContacts] = useState(false)
    const [permissions, setPermission] = useState(false)

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                setPermission(true);
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContacts(data)
                    const contact = data;
                    console.log(contact);
                } 
            }
        })();
    }, []);

    const renderItem = ({ item }) => (
        <Contacto data={item} />
    )

    return (
        <SafeAreaView  style={styles.container}>
            <Text>Contactos</Text>
            {permissions ? 
            <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={item => item.id}>    
            </FlatList>

            :
            
            <Text>Permiso no condedido de acceder a contactos</Text>
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