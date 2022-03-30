import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FlatList } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
]

function CameraButton() {
    const [selectedId, setSelectedId] = useState(null)
    const [imageList, setImageList] = useState([])

    const renderItem = ({ item }) => <Text>{item.title}</Text>

    selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync()
            if (!result.cancelled) {
                setCoverImage(result.uri)
            }
        } catch (error) {
            console.log('Error reading an image')
        }
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={selectImage}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name={'camera'} color={'#303030'} size={35} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        alignSelf: 'center',
    },
    container: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
        backgroundColor: '#efefef',
    },
})

export default CameraButton
