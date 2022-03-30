import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import BookDetails from '../screens/BookDetails'
import routes from './routes'
import Search from '../screens/Search'

const Stack = createStackNavigator()

const BookNavigator = () => {
    return (
        <Stack.Navigator
            presentation="modal"
            initialRouteName={routes.SEARCH_FOR_A_BOOK}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={routes.SEARCH_FOR_A_BOOK} component={Search} />
            <Stack.Screen name={routes.BOOK_DETAILS} component={BookDetails} />
        </Stack.Navigator>
    )
}

export default BookNavigator
