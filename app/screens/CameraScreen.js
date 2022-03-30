import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import CameraPreview from '../components/CameraPreview'
import routes from '../navigation/routes'

function CameraScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    useEffect(() => {
        ;(async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    const handleCameraType = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        )
    }

    const takePicture = async () => {
        console.log('Taking photo')
        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log(photo)
        // setPreviewVisible(true)
        setCapturedImage(photo)
        navigation.navigate(routes.ADD_NEW_BOOK, capturedImage)
    }

    const pickImage = async () => {
        console.log('Selecting Image')
    }

    let camera = Camera

    return (
        <View style={styles.container}>
            {previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} />
            ) : (
                <Camera
                    style={styles.camera}
                    type={type}
                    ref={(r) => {
                        camera = r
                    }}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonImagePicker}
                            onPress={() => pickImage}
                        >
                            <MaterialCommunityIcons name="image-multiple" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonCameraIcon}
                            onPress={() => takePicture()}
                        >
                            <MaterialCommunityIcons name="camera" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonCameraFlip}
                            onPress={() => handleCameraType()}
                        >
                            <MaterialCommunityIcons name="camera-switch" size={30} />
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    button: {},
    buttonCameraIcon: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    buttonCameraFlip: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    buttonImagePicker: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    buttonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 30 },
})

export default CameraScreen
