import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";

import store from "./store";
import RootComponent from "./src/containers/RootComponent";

export default class App extends Component<any> {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
          <Appbar>
            <Appbar.Header>
              <Text style={styles.welcome}>Mighty Album Application</Text>
            </Appbar.Header>
          </Appbar>
          <RootComponent />
        </PaperProvider>
      </StoreProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
