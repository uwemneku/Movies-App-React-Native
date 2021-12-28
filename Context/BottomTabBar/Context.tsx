import React, { createContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Value } from "react-native-reanimated";

type context = {
  isTabBarVisible: Animated.SharedValue<boolean>;
};

const TabBarContext = createContext({} as context);
export const useTabBarContext = () => React.useContext(TabBarContext);
export default TabBarContext;

const styles = StyleSheet.create({});
