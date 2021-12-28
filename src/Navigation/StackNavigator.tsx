import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Search } from "../Screens";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootParamList } from "./types";

const { Navigator, Screen } = createStackNavigator<RootParamList>();

const StackNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="main" component={BottomTabNavigator} />
      <Screen name="search" component={Search} />
    </Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
