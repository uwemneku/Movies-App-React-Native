import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TabBarContext from "./Context";

const Provider: FC = ({ children }) => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  return (
    <TabBarContext.Provider value={{ isTabBarVisible, setIsTabBarVisible }}>
      {children}
    </TabBarContext.Provider>
  );
};

export default Provider;

const styles = StyleSheet.create({});
