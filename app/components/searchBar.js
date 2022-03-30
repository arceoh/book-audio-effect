import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors';

function SearchBar(props) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="magnify" size={24} color="black" />
            <TextInput style={styles.textInput} placeholder="Search" />
            <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    cameraButton: {
        paddingRight: 2
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: colors.light.primary
    },
    icons: {
        paddingRight: 2
    },
    textInput: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingVertical: 2,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 2
    }
})

export default SearchBar