import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Screen from '../components/Screen'

function Settings(props) {
    return (
        <Screen>
            <View style={styles.container}>
                <Text>Settings</Text>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {},
})

export default Settings
