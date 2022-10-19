import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState, useEffect } from "react";


export default function QRScanner() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text>QRScanner</Text>
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