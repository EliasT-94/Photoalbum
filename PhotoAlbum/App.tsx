import React, { Component } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";

import store from "./store";
import RootComponent from "./src/containers/RootContainer";

export default class App extends Component<any> {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
          <RootComponent />
        </PaperProvider>
      </StoreProvider>
    );
  }
}