import React, { Component } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";

import store, { persistor } from "./store";
import RootComponent from "./src/containers/RootContainer";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator } from "react-native";

export default class App extends Component<any> {
  render() {
    return (
      <StoreProvider store={store}>
        <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
          <PaperProvider>
            <RootComponent />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}
