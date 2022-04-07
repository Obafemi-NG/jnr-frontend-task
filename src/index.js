import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  // useQuery,
  // gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

// const CATEGORY_NAME = gql`
//   query {
//     categories {
//       name
//     }
//   }
// `;

// export const CategoryName = () => {
//   const { loading, error, data } = useQuery(CATEGORY_NAME);
//   if (error) return <p> Error! {error.message} </p>;
//   if (loading) return <p> Loading... </p>;
//   console.log(data);
// };

// client
//   .query({
//     query: gql`
//       query {
//         categories {
//           name
//           products {
//             id
//             name
//             inStock
//             description
//             gallery
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
