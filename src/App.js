import React, { Component } from "react";
import { ItemsOverview } from "./components/items-overview/items-overview";
import { Header } from "./components/header/header";
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ItemsOverview />
      </div>
    );
  }
}

export default App;
