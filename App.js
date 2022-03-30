import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TabNavigater from './app/navigation/TabNavigater'
// import client from './app/api/getAudioFiles'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: 'https://scweb.dev/graphql',
    cache,
    defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

const Drawer = createDrawerNavigator()

export default function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Drawer.Navigator useLegacyImplementation={true}>
                    <Drawer.Screen
                        name="App Navigation"
                        component={TabNavigater}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    )
}
