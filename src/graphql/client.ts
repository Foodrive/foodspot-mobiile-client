import { ApolloClient, createHttpLink } from "@apollo/client";
import cache from "./cache";
import config from "@app/config";
import { setContext } from "@apollo/client/link/context";
import SecureStore, { SecureStoreEnum } from "@app/services/secure.store";

const httpLink = createHttpLink({
  uri: config.serverUrl,
});

const authLink = setContext(async (request, { headers }) => {
  const token = await SecureStore.getItem(SecureStoreEnum.TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
