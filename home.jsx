import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    navigator.geolocation.getCurrentPosition(
        posicion => {
            const ubicacion = JSON.stringify(posicion);

            this.setState({ ubicacion });
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    geolocation.getCurrentPosition(
        geo_success,
        [geo_error],
        [geo_options]
    );
    return (
        <View styles={styles.container}>
            
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