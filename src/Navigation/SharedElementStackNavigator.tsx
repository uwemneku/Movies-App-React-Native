import React from "react";
import { StyleSheet, View } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { BookDetails, Home } from "../Screens";
import { SharedScreenParamList } from "./types";

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
            {
              id: `image-${params.imdbID}`,
              animation: "fade-in",
              resize: "none",
            },
          ]}
        />
        <Screen name="Home" component={Home} />
      </Navigator>
    </View>
  );
};

export default SharedElementStackNavigator;

const styles = StyleSheet.create({});
