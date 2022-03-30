import { gql } from '@apollo/client'

const LOAD_AUDIO = gql`
    query getAudioByCategory($seachByCategoryName: String!) {
        mediaItems(where: { mimeType: AUDIO_MPEG, categoryName: $seachByCategoryName }) {
            edges {
                cursor
                node {
                    id
                    title
                    mediaItemUrl
                    categories {
                        nodes {
                            name
                            id
                        }
                    }
                }
            }
        }
    }
`
// TODO: load categories.
// TODO: Load images by categories

const LOAD_CATEGORIES = gql`
    query getAudioByCategory {
        categories {
            edges {
                node {
                    id
                    name
                    count
                }
            }
        }
    }
`

export { LOAD_AUDIO, LOAD_CATEGORIES }
