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
    const [clikScan, setClikScan] = useState(false);
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        alert(` ${data} `);
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
            <Button  disabled={clikScan} onPress={() => { setClikScan(true) }} title="Clickea para escanear un QR">
                
            </Button>
            {clikScan &&
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.scanner}
                />}
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
    scanner: {
        height: "70%",
        width: "50%"
    }
});