import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import storage from './utils/localStorage';
import backendUrl from './backendUrl';

const httpLink = new HttpLink({
    uri: backendUrl,
});

const authLink = setContext(() => {
    const loggedUser = storage.loadUser();

    return {
        headers: {
            authorization: loggedUser ? loggedUser.token : null,
        },
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

export default client;
