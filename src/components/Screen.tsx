import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Screen: FC = ({ children }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>{children}</SafeAreaProvider>
    </ScrollView>
  );
};

export default Screen;

const styles = StyleSheet.create({});
