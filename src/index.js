import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";

const container = document.getElementById("root");

const client = new ApolloClient({
  uri: "https://localhost:4000",
  cache: new InMemoryCache(),
});

const root = ReactDOMClient.createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
