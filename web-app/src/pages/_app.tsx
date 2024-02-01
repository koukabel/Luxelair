

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import createApolloClient from "./apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
 
        <Component {...pageProps} />
   
    </ApolloProvider>
  );
}