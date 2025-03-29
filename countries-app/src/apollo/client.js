import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const apolloClient = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

export default apolloClient;
