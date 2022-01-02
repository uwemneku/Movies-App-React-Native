import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MainNavigator } from "./src/Navigation";
import "react-native-gesture-handler";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import api from "./src/services/api";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { AppContextWrapper } from "./src/Context";

const App = () => {
  return (
    <ApiProvider api={api}>
      <PortalProvider>
        <AppContextWrapper>
          <NavigationContainer>
            <MainNavigator />
            <PortalHost name="TabBar" />
          </NavigationContainer>
        </AppContextWrapper>
      </PortalProvider>
    </ApiProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
