import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";

const Contacto = ({ data, emergency }) => {
    if (data?.phoneNumbers && data?.phoneNumbers[0]?.number == emergency) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.emergency}>{data.name} / {data?.phoneNumbers[0]?.number}🚨🚨</Text>
            </SafeAreaView >
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <Text>{data.name} / {data?.phoneNumbers && data?.phoneNumbers[0]?.number}</Text>
            </SafeAreaView >
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emergency: {
        color: 'green',
    },

});

export default Contacto