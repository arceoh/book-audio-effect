import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, set } from 'firebase/database'

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyCaULH9OII0MQZNiid_o1_47B0nLI5GGLk',
    authDomain: 'audiobookeffect.firebaseapp.com',
    projectId: 'audiobookeffect',
    storageBucket: 'audiobookeffect.appspot.com',
    messagingSenderId: '127840140533',
    appId: '1:127840140533:web:9d056a83113dc4bcd619bc',
}

initializeApp(firebaseConfig)

export function saveBook(isbn, title, author) {
    const db = getDatabase()
    const reference = ref(db, 'books/' + isbn)
    set(reference, {
        isbn: isbn,
        title: title,
        author: author,
    })
}

export function getBooks(isbn = null) {
    console.log('Getting Books')
    const db = getDatabase()
    // const reference = ref(db, 'books/' + userId)
    const reference = ref(db, 'books/')
    onValue(reference, (snapshot) => {
        const books = snapshot.val()
        console.log('Books: ', books)
    })
}
