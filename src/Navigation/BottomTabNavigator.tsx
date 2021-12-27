import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Bookmarks, Cart, Home, Settings } from "../Screens";
import { BottomTabParamList } from "./types";

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();
const BottomTabNavigator = () => {
  return (
    <Navigator
      tabBar={TabBar}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Cart" component={Cart} />
      <Screen name="Settings" component={Settings} />
      <Screen name="Bookmarks" component={Bookmarks} />
    </Navigator>
  );
};

export default BottomTabNavigator;

const TabBar = ({ navigation, state }: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <Text>{"dddd"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabBar: {
    padding: 20,
    // paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 10,
    marginVertical: 20,
    elevation: 0.5,
  },
});
