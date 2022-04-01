import React, { Component } from "react";

import Header from "./components/header/header";
import ListingPage from "./pages/listing-page/listing-page";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ListingPage />
      </div>
    );
  }
}

export default App;
