import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MainNavigator } from "./src/Navigation";
import "react-native-gesture-handler";

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
