import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AddBookNavigator from './AddBookNavigator'
import BookNavigator from './BookNavigator'
import routes from './routes'

const Tab = createBottomTabNavigator()

const SettingsButton = () => {
    return <></>
}

function TabNavigater() {
    return (
        <Tab.Navigator initialRouteName={routes.HOME_PAGE} screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Settings"
                component={SettingsButton}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="menu" color={color} size={size} />
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault()
                        navigation.openDrawer()
                    },
                })}
            />
            <Tab.Screen
                name={routes.HOME_PAGE}
                component={BookNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="book-search" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Add"
                component={AddBookNavigator}
                options={({ route }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus" color={color} size={size} />
                    ),
                    tabBarStyle: (() => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ''
                        if (routeName === routes.CAMERA_VIEW) {
                            return { display: 'none' }
                        }
                        return { display: 'flex' }
                    })(route),
                })}
            />
        </Tab.Navigator>
    )
}

export default TabNavigater
