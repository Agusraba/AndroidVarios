import React from "react";
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import { useState, useEffect } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';


export default function Scanner() {
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
        <SafeAreaView>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Clickea para escanear de nuevo'} onPress={() => setScanned(false)} />}
        </SafeAreaView>
    );
}