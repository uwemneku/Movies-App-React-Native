import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { BookDetails, Home, Search } from "../Screens";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootParamList, SharedScreenParamList } from "./types";

const { Navigator, Screen } =
  createSharedElementStackNavigator<SharedScreenParamList>();
const SharedElementStackNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Screen
          name="bookDetails"
          component={BookDetails}
          sharedElements={({ params }) => [
            { id: `image-${params.id}`, animation: "fade" },
          ]}
        />
        <Screen name="Home" component={Home} />
      </Navigator>
    </View>
  );
};

export default SharedElementStackNavigator;

const styles = StyleSheet.create({});
