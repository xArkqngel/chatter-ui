import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { API_URL, WS_URL } from "./urls";
import { onError } from "@apollo/client/link/error";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../utils/token";

/**
 * This link is used to intercept the errors that come from the server.
 * If the error is a 401, it means that the user is not authenticated, so we redirect the user to the login page.
 */
const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getToken(),
    },
  };
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`, // This is the URL of the GraphQL server
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${WS_URL}/graphql`, // This is the URL of the WebSocket server
    connectionParams: {
      token: getToken(),
    }
  })
);

/**
 * This link is used to split the requests between the HTTP and WebSocket links.
 * If the request is a subscription, it will be sent to the WebSocket server, otherwise, it will be sent to the HTTP server.
 */
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition?.kind === "OperationDefinition" &&
      definition?.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            keyArgs: false,
            merge,
          },
          messages: {
            keyArgs: ["chatId"],
            merge,
          },
        },
      },
    },
  }), // This is the cache that Apollo uses to store the data, it is used to avoid making the same request multiple times
  link: logoutLink.concat(authLink).concat(splitLink), // This makes the client to connect first to the backend, and then to the logoutLink
});

function merge(existing: any, incoming: any, { args }: any) {
  const merged = existing ? existing.slice(0) : [];
  for (let i = 0; i < incoming.length; ++i) {
    merged[args.skip + i] = incoming[i];
  }
  return merged;
}

export default client;
