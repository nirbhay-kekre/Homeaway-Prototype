import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// apollo client setup
const access_token = localStorage.getItem("jwtToken");
const headers = {
    authorization: access_token ? access_token : null
};
const httpLink = new createHttpLink({
    uri: 'http://localhost:3001/homeaway_api',
    headers
});
export const ApolloService = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});