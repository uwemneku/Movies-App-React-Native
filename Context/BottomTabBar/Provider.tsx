import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import TabBarContext from "./Context";

const Provider: FC = ({ children }) => {
  //   const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  const isTabBarVisible = useSharedValue(true);
  return (
    <TabBarContext.Provider value={{ isTabBarVisible }}>
      {children}
    </TabBarContext.Provider>
  );
};

export default Provider;

const styles = StyleSheet.create({});
