import React from 'react'
import { View, StyleSheet } from 'react-native'

import { createDrawerNavigator } from '@react-navigation/drawer'

import { DrawerActions } from '@react-navigation/native'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import TabNavigater from './TabNavigater'
import Settings from '../screens/Settings'

const Drawer = createDrawerNavigator()

function AppNavigator(props) {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="SettingsMenu"
                component={TabNavigater}
                options={{
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    )
}
const styles = StyleSheet.create({
    container: {},
})

export default AppNavigator
