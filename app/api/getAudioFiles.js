import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client'

const client = new ApolloClient({
    // uri: 'https://48p1r2roz4.sse.codesandbox.io',
    uri: 'https://scweb.dev/graphql',

    cache: new InMemoryCache(),
})

const getAudioFiles = (categoryName = '') => {
    client
        .query({
            query: gql`
                query getAudio {
                    mediaItems(where: { categoryName: "" }) {
                        edges {
                            cursor
                            node {
                                id
                                title
                                mediaItemUrl
                            }
                        }
                    }
                }
            `,
        })

        .then((result) => console.log(result))
}
const getCategories = () => {
    client
        .query({
            query: gql`
                query getCategories {
                    categories {
                        edges {
                            node {
                                id
                                name
                            }
                        }
                    }
                }
            `,
        })

        .then((result) => console.log(result))
}

export { client, getAudioFiles, getCategories }
