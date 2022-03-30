import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'

function CameraPreview({ photo }) {
    console.log('sdsfds', photo)
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: 'transparent', flex: 1, width: '100%', height: '100%' },
})

export default CameraPreview
