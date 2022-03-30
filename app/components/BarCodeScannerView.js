import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import routes from '../navigation/routes'
import Screen from './Screen'

const opacityCover = 0.5

function BarCodeScannerView({ navigation, route }) {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    // console.log(route)

    useEffect(() => {
        ;(async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true)
        navigation.navigate(route.params.goBack, { barCodeData: data })
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <Screen style={styles.container}>
            <View style={styles.barCodeWrapperTop}></View>
            <View style={styles.barCodeWrapperBottom}></View>

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                // style={StyleSheet.absoluteFillObject}
                style={[styles.barCodeScannerWindow]}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
            />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    barCodeWrapperTop: {
        backgroundColor: 'black',
        width: '100%',
        height: '25%',
        position: 'absolute',
        top: 0,
        zIndex: 1,
        opacity: opacityCover,
    },
    barCodeWrapperBottom: {
        backgroundColor: 'black',
        width: '100%',
        height: '25%',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        opacity: opacityCover,
    },
    barCodeWrapperIcon: {
        width: '90%',
        height: 100,
        position: 'absolute',
        bottom: '35%',
        zIndex: 1,
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        marginLeft: 20,
    },
    Icon: {
        alignSelf: 'center',
    },
    text: {
        fontSize: 40,
        color: 'blue',
    },
    barCodeScannerWindow: {
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundColor: 'black',
    },
})

export default BarCodeScannerView
