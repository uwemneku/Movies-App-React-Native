import React, { createContext } from "react";
import { StyleSheet, Text, View } from "react-native";

const TabBarContext = createContext({
  isTabBarVisible: true,
  setIsTabBarVisible: (state: boolean) => {},
});
export const useTabBarContext = () => React.useContext(TabBarContext);
export default TabBarContext;

const styles = StyleSheet.create({});
