import React, { Component } from "react";
import { ItemsOverview } from "./components/items-overview/items-overview";
import { Navbar } from "./components/navbar/navbar";
class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <ItemsOverview />
      </div>
    );
  }
}

export default App;
