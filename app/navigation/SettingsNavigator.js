import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Search from '../screens/Search'
import { DrawerActions } from '@react-navigation/native'

import { useRoute } from '@react-navigation/native'

import Settings from '../screens/Settings'

const Stack = createStackNavigator()

const Drawer = createDrawerNavigator()

const SettingsNavigator = ({ navigation }) => {
    useEffect(() => {
        const toggleSettings = navigation.addListener('tabPress', (e) => {
            console.log('Clicked Settings')

            navigation.dispatch(DrawerActions.openDrawer())
        })
        return toggleSettings
    }, [navigation])

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="SettingsMenu" component={Settings} />
        </Drawer.Navigator>
    )
}

export default SettingsNavigator
