import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useTabBarContext } from "../Context";
import { useDeviceOrientation } from "../Hooks";
import { BookDetails, Bookmarks, Home, Search, Settings } from "../Screens";
import { SharedScreenParamList } from "./types";

const { Navigator, Screen } =
  createSharedElementStackNavigator<SharedScreenParamList>();
const SharedElementStackNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        screenListeners={{
          state: ({ data }) => {
            console.log(data);
          },
          focus: ({ data }) => {
            console.log(data);
          },
        }}
      >
        <Screen name="Home" component={Home} />
        <Screen
          name="Bookmarks"
          component={Bookmarks}
          options={{ animationEnabled: false }}
        />
        <Screen
          name="Settings"
          component={Settings}
          options={{ animationEnabled: false }}
        />
        <Screen name="Search" component={Search} />
        <Screen
          name="BookDetails"
          component={BookDetails}
          sharedElements={({ params }) => [
            {
              id: `image-${params.imdbID}`,
              animation: "fade-in",
              resize: "none",
            },
          ]}
        />
      </Navigator>
    </View>
  );
};

export default SharedElementStackNavigator;
