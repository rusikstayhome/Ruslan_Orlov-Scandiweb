import { ApolloClient, HttpLink, from, } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { CustomInMemoryCache } from './cache';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
    uri: "http://localhost:4000"
});

export const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: CustomInMemoryCache
});
