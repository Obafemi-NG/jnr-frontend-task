import React, { Component, Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import DescriptionPage from "./pages/description-page/description-page";
import ListingPage from "./pages/listing-page/listing-page";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/:productId" element={<DescriptionPage />} />
        </Routes>
      </Fragment>
    );
  }
}

export default App;
