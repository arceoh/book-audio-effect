import React, { useState, useEffect } from 'react'
import { FlatList, View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { LOAD_AUDIO, LOAD_CATEGORIES } from '../GraphQL/Queries'
import RNBounceable from '@freakycoder/react-native-bounceable'
import { useQuery } from '@apollo/client'

import colors from '../config/colors'
import capitalizeFirstLetter from '../utils/toUpperFist'
import { ListItemSeparator } from './lists'
import routes from '../navigation/routes'
import Screen from './Screen'
import { useIsFocused } from '@react-navigation/native'

function PageBuilder({ navigation, route }) {
    const [seachByCategoryName, setSeachByCategoryName] = useState('')
    const [currentCategoryName, setCurrentCategoryName] = useState('')
    const [audioFilesList, setAudioFilesList] = useState([])
    const [pageNumber, setPageNumber] = useState(null)
    const isFocused = useIsFocused()

    const {
        loading: audioLoading,
        error: audioError,
        data: audioData,
    } = useQuery(LOAD_AUDIO, {
        variables: { seachByCategoryName },
    })

    const {
        loading: categoriesLoading,
        error: categoriesError,
        data: categoriesData,
    } = useQuery(LOAD_CATEGORIES)

    useEffect(() => {
        if (typeof audioError !== 'undefined') {
            console.log('Error: ', audioError)
        }
        if (typeof categoriesError !== 'undefined') {
            console.log('Error: ', categoriesError)
        }

        if (isFocused) {
            loadPassedAudioFilesList()
        }

        // console.log(route.params)
        // console.log(audioData)
        // console.log(audioFilesList)
        // console.log(
        //     'audioFilesList: ',
        //     audioFilesList.map((item) => `${item.title}`)
        // )
        // console.log(categoriesData.categories.edges)
        setSeachByCategoryName(currentCategoryName)
    }, [isFocused, audioData, audioFilesList, categoriesData, currentCategoryName])

    const handleAudioFilesList = (isChecked, item) => {
        let newArray = [...audioFilesList]

        if (isChecked) {
            newArray = [...audioFilesList, item]
        } else {
            newArray = audioFilesList.filter((el) => el.id !== item.id)
        }
        setAudioFilesList(newArray)
    }
    const loadPassedAudioFilesList = () => {
        if (typeof route.params !== 'undefined') {
            if (typeof route.params.pageNumber !== 'undefined') {
                setPageNumber(route.params.pageNumber)
            }
            if (typeof route.params.audioFilesList !== 'undefined') {
                const passedAudioFilesList = route.params.audioFilesList
                console.log('PASSED: ', passedAudioFilesList)
                setAudioFilesList(passedAudioFilesList)
            }
        }
    }
    const renderAudioItems = ({ item, index }) => {
        const id = item.node.id
        const mediaItemUrl = item.node.mediaItemUrl
        const title = item.node.title
        const capTitle = capitalizeFirstLetter(title)
        const audioObj = { id, title, mediaItemUrl }

        // console.log('ID:', id)
        // console.log("ID:", id)

        // console.log(
        //     'audioFilesList: ',
        //     audioFilesList.map((item) => `${item.title}`)
        // )

        const inAudioFilesList = audioFilesList
            .map(function (e) {
                return e.id
            })
            .includes(id)

        return (
            <View style={{ flex: 1 }}>
                {audioLoading && (
                    <View style={[styles.audioListItem, { padding: 20 }]}>
                        <View
                            style={{ backgroundColor: '#efefef', height: 10, borderRadius: 20 }}
                        ></View>
                    </View>
                )}
                {!audioLoading && (
                    <View style={styles.audioListItem}>
                        <BouncyCheckbox
                            size={30}
                            // textComponent={<Text>{item.node.title}</Text>}
                            fillColor={colors.primary}
                            unfillColor="#FFFFFF"
                            textStyle={{
                                textDecorationLine: 'none',
                            }}
                            isChecked={inAudioFilesList}
                            text={`${capTitle}`}
                            iconStyle={{ borderColor: 'black', borderRadius: 10 }}
                            onPress={(isChecked, item) => {
                                handleAudioFilesList(isChecked, audioObj)
                            }}
                        />
                    </View>
                )}
            </View>
        )
    }
    const renderCategoryItems = ({ item, index }) => {
        const name = item.node.name
        const count = item.node.count

        const handleCategoryClick = (name) => {
            if (name === currentCategoryName) {
                setCurrentCategoryName('')
            } else {
                setCurrentCategoryName(name)
            }
        }

        const backgroundColor = name === currentCategoryName ? colors.dark : colors.light
        const color = name === currentCategoryName ? colors.white : colors.dark

        return (
            <>
                {count != null && (
                    <View style={{ paddingBottom: 10 }}>
                        <RNBounceable
                            style={[styles.categoryContainer, { backgroundColor: backgroundColor }]}
                            onPress={() => handleCategoryClick(name)}
                        >
                            <Text style={{ color: color }}>{name}</Text>
                        </RNBounceable>
                    </View>
                )}
            </>
        )
    }

    const renderHeader = () => {
        return (
            <View style={styles.categoriesContainer}>
                <Text
                    style={{ fontSize: 25, padding: 10, fontWeight: 'bold', textAlign: 'center' }}
                >
                    Page {pageNumber}
                </Text>
                {categoriesLoading && (
                    <View style={{ padding: 10, height: 1, backgroundColor: '#efefef' }}></View>
                )}
                {!categoriesLoading && (
                    <FlatList
                        data={categoriesData.categories.edges}
                        renderItem={renderCategoryItems}
                        keyExtractor={(item) => item.node.id.toString()}
                        horizontal={true}
                        extraData={currentCategoryName}
                    />
                )}
            </View>
        )
    }

    return (
        <Screen>
            <View style={{ flex: 1, backgroundColor: '#efefef' }}>
                {!audioLoading && (
                    <FlatList
                        data={audioData.mediaItems.edges}
                        // data={testData}
                        renderItem={renderAudioItems}
                        keyExtractor={(item) => item.node.id.toString()}
                        extraData={audioData}
                        ItemSeparatorComponent={ListItemSeparator}
                        ListHeaderComponent={renderHeader}
                    />
                )}
            </View>
            <View>
                <TouchableWithoutFeedback onPress={() => console.log(audioFilesList)}>
                    <Text
                        style={{
                            padding: 15,
                            margin: 10,
                            backgroundColor: colors.light,
                            textAlign: 'center',
                        }}
                    >
                        Log
                    </Text>
                </TouchableWithoutFeedback>
            </View>
            <View>
                <TouchableWithoutFeedback
                    onPress={() =>
                        navigation.navigate(routes.ADD_NEW_BOOK, {
                            pageNumber,
                            audioFilesList,
                        })
                    }
                >
                    <Text
                        style={{
                            padding: 15,
                            margin: 10,
                            backgroundColor: colors.light,
                            textAlign: 'center',
                        }}
                    >
                        Save
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    ActivityIndicatorContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    audioListItem: { padding: 10, backgroundColor: 'white' },
    categoriesContainer: { paddingVertical: 10 },
    categoryContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 8,
        borderRadius: 20,
        backgroundColor: colors.light,
    },
    container: {},
    item: { backgroundColor: '#f9c2ff', padding: 20, marginVertical: 8, marginHorizontal: 16 },
    seperator: {
        height: 1,
        backgroundColor: '#efefef',
    },
})

export default PageBuilder
