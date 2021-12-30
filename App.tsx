import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MainNavigator } from "./src/Navigation";
import "react-native-gesture-handler";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import api from "./src/services/api";
import { BookmarkProvider } from "./src/Context";

const App = () => {
  return (
    <ApiProvider api={api}>
      <BookmarkProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </BookmarkProvider>
    </ApiProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
