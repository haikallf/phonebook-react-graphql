import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://wpe-hiring.tokopedia.net/graphql",
});

export default client;
