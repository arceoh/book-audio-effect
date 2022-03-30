import React from 'react'
import { FlatList, View, SafeAreaView, StyleSheet, Text } from 'react-native'

import Data from '../assets/dataBooks.json'
import { ListItem } from '../components/lists'
import SearchBar from '../components/searchBar'
import routes from '../navigation/routes'
import Screen from '../components/Screen'

function Search({ navigation }) {
    return (
        <Screen style={styles.container}>
            <SearchBar />
            <FlatList
                data={Data}
                // renderItem={(renderItem)}
                renderItem={({ item }) => {
                    return (
                        <ListItem
                            title={item.title}
                            image={item.cover}
                            onPress={() => {
                                navigation.navigate(routes.BOOK_DETAILS, item)
                            }}
                        />
                    )
                }}
                keyExtractor={(item) => item.isbn}
                horizontal={false}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {},
})

export default Search
