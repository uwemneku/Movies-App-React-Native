import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { BookDetails } from "../Screens";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootParamList } from "./types";

const { Navigator, Screen } =
  createSharedElementStackNavigator<RootParamList>();
const StackNavigator = () => {
  return (
    <Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
      <Screen name="main" component={BottomTabNavigator} />
      <Screen name="bookDetails" component={BookDetails} />
    </Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
