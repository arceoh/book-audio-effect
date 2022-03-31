import React, { useState, useEffect } from 'react'
import {
    Button,
    Image,
    FlatList,
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import { Formik } from 'formik'
import * as Firebase from '../api/firebase'
import RNBounceable from '@freakycoder/react-native-bounceable'

import getBookFromBarcode from '../api/getBookFromBarCode'
import Screen from '../components/Screen'
import TextInput from '../components/TextInput'
import routes from '../navigation/routes'
import colors from '../config/colors'

const testData = [
    [
        {
            id: 'cG9zdDo3NQ==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/hippo.mp3',
            title: 'hippo',
        },
        {
            id: 'cG9zdDo3Mw==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/cat.mp3',
            title: 'cat',
        },
        {
            id: 'cG9zdDo3Ng==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/mouse.mp3',
            title: 'mouse',
        },
        {
            id: 'cG9zdDo3Nw==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/lion.mp3',
            title: 'lion',
        },
    ],
    [
        {
            id: 'cG9zdDo3NQ==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/hippo.mp3',
            title: 'hippo',
        },
        {
            id: 'cG9zdDo3Mw==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/cat.mp3',
            title: 'cat',
        },
        {
            id: 'cG9zdDo3Ng==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/mouse.mp3',
            title: 'mouse',
        },
        {
            id: 'cG9zdDo3Nw==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/lion.mp3',
            title: 'lion',
        },
    ],
    [
        {
            id: 'cG9zdDo3NQ==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/hippo.mp3',
            title: 'hippo',
        },
        {
            id: 'cG9zdDo3Mw==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/cat.mp3',
            title: 'cat',
        },
        {
            id: 'cG9zdDo3Ng==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/mouse.mp3',
            title: 'mouse',
        },
        {
            id: 'cG9zdDo3Nw==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/lion.mp3',
            title: 'lion',
        },
    ],
    [
        {
            id: 'cG9zdDo3NQ==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/hippo.mp3',
            title: 'hippo',
        },
        {
            id: 'cG9zdDo3Mw==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/cat.mp3',
            title: 'cat',
        },
        {
            id: 'cG9zdDo3Ng==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/mouse.mp3',
            title: 'mouse',
        },
        {
            id: 'cG9zdDo3Nw==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/lion.mp3',
            title: 'lion',
        },
    ],
    [
        {
            id: 'cG9zdDo3NQ==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/hippo.mp3',
            title: 'hippo',
        },
        {
            id: 'cG9zdDo3Mw==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/cat.mp3',
            title: 'cat',
        },
        {
            id: 'cG9zdDo3Ng==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/mouse.mp3',
            title: 'mouse',
        },
        {
            id: 'cG9zdDo3Nw==',
            mediaItemUrl: 'https://scweb.dev/wp-content/uploads/2022/03/lion.mp3',
            title: 'lion',
        },
    ],
]

function AddBook({ navigation, route }) {
    const [coverImage, setCoverImage] = useState(null)
    const [bookData, setBookData] = useState({ title: '', authors: [], imageSrc: '' })
    const [scannedBarCode, setScannedBarCode] = useState('')
    const [pageList, setPageList] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(1)
    const isFocused = useIsFocused()

    useEffect(() => {
        if (typeof route.params !== 'undefined') {
            console.log(route.params)
        }

        requestPermission()
        if (isFocused) {
            loadBarCode()
            updatePageList()
            console.log('PageList:', pageList)
        }
    }, [isFocused])

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true

            const loadBook = async () => {
                try {
                    const response = await getBookFromBarcode(scannedBarCode)
                    if (isActive) {
                        setBookData({
                            ...bookData,
                            title: response.data.items[0].volumeInfo.title,
                            authors: response.data.items[0].volumeInfo.authors,
                            imageSrc: response.data.items[0].volumeInfo.imageLinks.smallThumbnail,
                        })
                    }
                } catch (e) {}
            }
            setTimeout(() => loadBook(), 1000)

            return () => {
                isActive = false
            }
        }, [scannedBarCode])
    )

    const loadBarCode = () => {
        if (typeof route.params !== 'undefined') {
            if (typeof route.params.barCodeData !== 'undefined') {
                setScannedBarCode(route.params.barCodeData)
            }
        }
    }

    const updatePageList = () => {
        if (typeof route.params !== 'undefined') {
            if (typeof route.params.audioFilesList !== 'undefined') {
                console.log('Updating Page List')
                const newPageList = [...pageList]

                newPageList[route.params.pageNumber - 1] = route.params.audioFilesList

                setPageList(newPageList)
                setNumberOfPages(pageList.length)
            } else {
                console.log('No update needed')
            }
        }
    }

    const requestPermission = async () => {
        const resultsCamera = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!resultsCamera) {
            alert('You need to enable Camera permission take photos of book covers')
        }

        // const resultsMediaFolder = await MediaLibrary.usePermissions()
        // if (!resultsMediaFolder) {
        //     console.log(resultsMediaFolder)
        //     alert('You need to enable Media Folder permission take select book cover art')
        // }

        // const resultsUseCamera = await Camera.requestCameraPermissionsAsync()
        // if (!resultsUseCamera) {
        //     console.log(resultsUseCamera)
        //     alert('You need to enable Camera permission scan for barcodes')
        // }

        // const resultsBarCode = await BarCodeScanner.requestPermissionsAsync()
        // if (!resultsBarCode) {
        //     console.log(resultsBarCode)
        //     alert('You need to enable Camera permission scan for barcodes')
        // }
    }

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync()
            if (!result.cancelled) {
                setCoverImage(result.uri)
            }
        } catch (error) {
            console.log('Error reading an image')
        }
    }

    const takePhoto = async () => {
        let image = await ImagePicker.launchCameraAsync().catch((error) => console.log({ error }))
    }

    const submitForm = (book) => {
        console.log('Submiting Book: ', book)
        // Firebase.saveBook(book.BarCode, book.title, book.author)
    }

    const clearForm = () => {
        setBookData({
            ...bookData,
            title: '',
            authors: [],
            imageSrc: '',
        })
        setScannedBarCode('')
    }

    const renderPages = ({ item, index }) => {
        return (
            <RNBounceable
                onPress={() =>
                    navigation.navigate(routes.PAGE_BUILDER, {
                        goBack: route.name,
                        pageNumber: index,
                        audioFilesList: pageList[index],
                    })
                }
            >
                <View style={[styles.coverImageContainer, { marginHorizontal: 5 }]}>
                    <View style={styles.cameraIcon}>
                        <Text
                            style={{
                                fontSize: 12,
                                color: colors.medium,
                                textAlign: 'center',
                                paddingBottom: 0,
                                marginBottom: 0,
                                lineHeight: 12,
                            }}
                        >
                            PAGE #
                        </Text>
                        <Text
                            style={{
                                paddingTop: 0,
                                marginTop: 0,
                                fontSize: 40,
                                fontFamily: 'sans-serif-medium',
                                color: colors.medium,
                                textAlign: 'center',
                            }}
                        >
                            {index}
                        </Text>
                        <Text
                            style={{
                                fontSize: 9,
                                color: colors.medium,
                                textAlign: 'center',
                                paddingBottom: 0,
                                marginBottom: 0,
                                lineHeight: 12,
                            }}
                        >
                            Click to Edit
                        </Text>
                    </View>
                </View>
            </RNBounceable>
        )
    }

    return (
        <Screen style={styles.container}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* Book Cover */}
                    <View>
                        <Text>Title: {bookData.title}</Text>
                    </View>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            navigation.navigate(routes.BARCODE_SCANNER, {
                                goBack: route.name,
                            })
                        }
                    >
                        <View style={styles.autoScanButton}>
                            {coverImage === null && (
                                <View style={styles.cameraIcon}>
                                    <Text>Scan a Barcode</Text>
                                    <MaterialCommunityIcons
                                        name={'barcode-scan'}
                                        color={'#005b5b'}
                                        size={45}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={selectImage}>
                        <View style={styles.coverImageContainer}>
                            {coverImage === null && (
                                <View style={styles.cameraIcon}>
                                    <MaterialCommunityIcons
                                        name={'file-image'}
                                        color={'#303030'}
                                        size={45}
                                    />
                                </View>
                            )}
                            {coverImage && (
                                <Image style={styles.coverImage} source={{ uri: coverImage }} />
                            )}
                        </View>
                    </TouchableWithoutFeedback>

                    <Formik
                        initialValues={{
                            title: bookData.title,
                            author: bookData.authors.join(', '),
                            BarCode: scannedBarCode,
                            numberOfPages: `${numberOfPages}`,
                        }}
                        onSubmit={(values) => submitForm(values)}
                        enableReinitialize={true}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View>
                                <TextInput
                                    onChangeText={handleChange('title')}
                                    placeholder="Title"
                                    onBlur={handleBlur('title')}
                                    value={values.title}
                                />
                                <TextInput
                                    onChangeText={handleChange('author')}
                                    onBlur={handleBlur('author')}
                                    placeholder="Author"
                                    value={values.author}
                                />
                                <TextInput
                                    onChangeText={handleChange('BarCode')}
                                    onBlur={handleBlur('BarCode')}
                                    placeholder="BarCode"
                                    value={values.BarCode}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    {/* ADD PAGE AUDIO */}
                                    <View
                                        style={{
                                            backgroundColor: colors.white,
                                            paddingRight: 5,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <RNBounceable
                                            onPress={() =>
                                                navigation.navigate(routes.PAGE_BUILDER, {
                                                    goBack: route.name,
                                                    pageNumber: pageList.length + 1,
                                                })
                                            }
                                        >
                                            <View style={styles.coverImageContainer}>
                                                <View style={styles.cameraIcon}>
                                                    <MaterialCommunityIcons
                                                        name={'plus-box'}
                                                        color={'#303030'}
                                                        size={45}
                                                    />
                                                </View>
                                            </View>
                                        </RNBounceable>
                                    </View>
                                    <FlatList
                                        data={pageList}
                                        renderItem={renderPages}
                                        keyExtractor={(item, index) => index}
                                        horizontal={true}
                                    />
                                    {/* Add Flatlist with pages */}
                                    {/* <TouchableWithoutFeedback
                                        onPress={() => console.log('Adding page')}
                                    >
                                        <View style={styles.coverImageContainer}>
                                            <View style={styles.cameraIcon}>
                                                <MaterialCommunityIcons
                                                    name={'plus-box'}
                                                    color={'#303030'}
                                                    size={45}
                                                />
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback> */}
                                </View>
                                {/* TODO: Add Pages Icon */}
                                <View style={styles.submitContainer}>
                                    <Button onPress={handleSubmit} title="Submit" />
                                </View>
                            </View>
                        )}
                    </Formik>

                    <View style={{ marginTop: 20 }}>
                        <Button onPress={() => clearForm()} title="Clear" />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            onPress={() => console.log('PageList:', pageList)}
                            title="Log Page List"
                        />
                    </View>
                </View>
            </ScrollView>
        </Screen>
    )
}

const styles = StyleSheet.create({
    autoScanButton: {
        width: '100%',
        backgroundColor: colors.primary,
        borderRadius: 15,
        padding: 5,
    },
    buttonBarCodeScanner: {
        fontSize: 12,
        paddingVertical: 12,
        backgroundColor: '#efefef',
    },
    buttonBarCodeScannerText: { textAlign: 'center' },
    container: {
        backgroundColor: '#fff',
    },

    coverImage: { flex: 1, borderRadius: 10 },
    cameraIcon: {
        alignSelf: 'center',
    },
    coverImageContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
        backgroundColor: '#efefef',
        marginVertical: 10,
    },
    innerContainer: {
        paddingHorizontal: 10,
        paddingBottom: 50,
        paddingTop: 10,
    },
    submitContainer: {
        marginTop: 18,
    },
})

export default AddBook
