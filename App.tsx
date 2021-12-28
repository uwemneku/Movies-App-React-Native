import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MainNavigator } from "./src/Navigation";
import "react-native-gesture-handler";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import api from "./src/services/api";

const App = () => {
  return (
    <ApiProvider api={api}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ApiProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
