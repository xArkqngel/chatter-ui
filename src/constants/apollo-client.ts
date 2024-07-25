import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from "./urls";
import { onError } from "@apollo/client/link/error";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";

/**
 * This link is used to intercept the errors that come from the server.
 * If the error is a 401, it means that the user is not authenticated, so we redirect the user to the login page.
 */
const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions.originalError as any).statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`, // This is the URL of the GraphQL server
});

const client = new ApolloClient({
  cache: new InMemoryCache(), // This is the cache that Apollo uses to store the data, it is used to avoid making the same request multiple times
  link: logoutLink.concat(httpLink), // This makes the client to connect first to the backend, and then to the logoutLink
});

export default client;
