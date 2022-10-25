import React from "react";
import { Text, SafeAreaView , StyleSheet } from "react-native";

const Contacto = ({data}) =>{
    return(
        <SafeAreaView >
            <Text>{data.name} - {data.phoneNumbers[0].number}</Text>
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

export default Contacto