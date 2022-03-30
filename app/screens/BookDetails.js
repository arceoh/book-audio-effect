import React, { useState, useEffect } from 'react'
import {
    FlatList,
    Image,
    View,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'
import { Audio } from 'expo-av'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ListItem } from '../components/lists'
import DataAudio from '../assets/dataAudio.json'
import Screen from '../components/Screen'

const coverHeight = 150

function BookDetails({ route }) {
    const [audioFiles, setAudioFiles] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedId, setSelectedId] = useState(null)
    const [sound, setSound] = useState()

    const book = route.params

    const pages = book.pages
    const totalPages = book.pages.length

    function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const pageList = []
    Array.from(Array(totalPages).keys())
    for (let i = 0; i < totalPages; i++) {
        pageList.push({
            id: getRandomInt(10000, 99999),
            page: i,
        })
    }

    const playSound = async (e, name) => {
        setSelectedId(name)
        // // Match key to name
        const soundCreator = DataAudio[0][name]
        // // Get first value
        const audioFile = soundCreator[Object.keys(soundCreator)[0]].audio
        const audioSrc = `https://scweb.dev/wp-content/uploads/audioBookApp/audio/${audioFile}`

        const { sound, status } = await Audio.Sound.createAsync({ uri: audioSrc })

        setSound(sound)
        await sound.playAsync()
    }

    useEffect(() => {
        handAudioFiles()
        return sound
            ? () => {
                  sound.unloadAsync()
              }
            : undefined
    }, [currentPage, sound])

    const handAudioFiles = () => {
        setAudioFiles(pages[currentPage - 1])
    }

    const goToPage = (value) => {
        let newPage = currentPage

        if (value === 'prev') {
            newPage -= 1
        } else if (value === 'next') {
            newPage += 1
        } else {
            newPage = value
        }

        if (newPage <= 1) {
            newPage = 1
        }
        if (newPage >= totalPages) {
            newPage = totalPages
        }
        setCurrentPage(newPage)
    }

    const renderAudioItem = ({ item }) => {
        // TODO Check if media is playing.
        const icon = item === selectedId ? 'stop' : 'play'
        const defaultAnimalImage = DataAudio[0][item].default.image
        const animalImageSrc = `https://scweb.dev/wp-content/uploads/audioBookApp/images/${defaultAnimalImage}`

        return (
            <ListItem
                title={item}
                image={animalImageSrc}
                onPress={(e) => playSound(e, item)}
                icon={icon}
            />
        )
    }

    const renderPageList = (item) => {
        const pageNumberInt = item.item.page + 1

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    setCurrentPage(pageNumberInt)
                }}
            >
                <View style={styles.pageNumberPill}>
                    <Text style={styles.pageNumberPillText}>{pageNumberInt}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const renderHeader = () => {
        return (
            <Screen>
                <View>
                    <Image
                        style={styles.image}
                        source={{ uri: book.cover }}
                        width="100%"
                        height={300}
                    />
                </View>
                <View>
                    <Text>{book.title}</Text>
                </View>
                <View>
                    <Text>
                        Page: {currentPage} of {totalPages}
                    </Text>
                </View>
            </Screen>
        )
    }

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={renderHeader}
                    // ListHeaderComponentStyle={ }

                    data={audioFiles}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={renderAudioItem}
                    extraData={selectedId}
                    horizontal={false}
                />
            </View>
            <View style={styles.paginationContainer}>
                <View style={{ width: '15%' }}>
                    <TouchableWithoutFeedback
                        style={styles.button}
                        onPress={() => goToPage('prev')}
                    >
                        <View style={styles.button}>
                            <MaterialCommunityIcons
                                color={'gray'}
                                name={'chevron-left'}
                                size={25}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ width: '70%' }}>
                    <FlatList
                        data={pageList}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => renderPageList(item)}
                        horizontal={true}
                    />
                </View>
                <View style={{ width: '15%' }}>
                    <TouchableWithoutFeedback onPress={() => goToPage('next')}>
                        <View style={styles.button}>
                            <MaterialCommunityIcons
                                color={'gray'}
                                name={'chevron-right'}
                                size={25}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        backgroundColor: '#cccccc',
    },
    container: {
        flex: 1,
    },
    fadeContainer: {
        paddingBottom: 20,
        zIndex: 2,
        height: coverHeight,
        width: '100%',
    },
    fadeGradient: {
        height: coverHeight,
        width: '100%',
    },
    image: {
        width: '100%',
        height: coverHeight,
    },
    imageContainer: {
        height: coverHeight,
        width: '100%',
        zIndex: 0,
        position: 'absolute',
        top: 0,
    },
    paginationContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    pageNumberPill: {
        backgroundColor: '#cccccc',
        height: 40,
        width: 50,
        borderRadius: 10,
        marginHorizontal: 5,
        flex: 1,
        justifyContent: 'center',
    },
    pageNumberPillText: {
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

export default BookDetails
