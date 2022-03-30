import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AddBook from '../screens/AddBook'
import CameraScreen from '../screens/CameraScreen'

import routes from './routes'
import BarCodeScannerView from '../components/BarCodeScannerView'
import PageBuilder from '../components/PageBuilder'

const Stack = createStackNavigator()

const AddBookNavigator = ({ navigation }) => {
    useEffect(() => {
        const goToAddBookScreen = navigation.addListener('tabPress', (e) => {
            e.preventDefault()
            navigation.navigate(routes.ADD_NEW_BOOK)
        })
        return goToAddBookScreen
    }, [navigation])

    return (
        <Stack.Navigator
            presentation="modal"
            initialRouteName={routes.ADD_NEW_BOOK}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={routes.ADD_NEW_BOOK} component={AddBook} />
            <Stack.Screen name={routes.CAMERA_VIEW} component={CameraScreen} />
            <Stack.Screen name={routes.BARCODE_SCANNER} component={BarCodeScannerView} />
            <Stack.Screen name={routes.PAGE_BUILDER} component={PageBuilder} />
        </Stack.Navigator>
    )
}

export default AddBookNavigator
