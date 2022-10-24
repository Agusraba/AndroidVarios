import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState, useEffect } from "react";
import QRCode from 'react-native-qrcode-svg';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScanner() {
    const navigation = useNavigation()
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requeriendo permiso a la camara</Text>;
    }
    if (hasPermission === false) {
        return <Text>No pemiso concedido a la camara</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>QRScanner</Text>
            <QRCode
                value="Proyecto realizado por Agustin Rabinowicz & Fausto Oliva"
            />
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Clickea para escanear de nuevo'} onPress={() => setScanned(false)} />}
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