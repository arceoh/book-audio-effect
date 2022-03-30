import { create } from 'apisauce'

const baseUrl = 'https://www.googleapis.com'

const api = create({
    baseUrl,
})

const getBookFromBarcode = (barcode) =>
    api.get(`https://www.googleapis.com/books/v1/volumes?q=${barcode}`)

export default getBookFromBarcode
