import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { Bookmarks, Cart, Settings } from "../Screens";
import { BottomTabParamList } from "./types";
import { Ionicons } from "@expo/vector-icons";
import SharedElementStackNavigator from "./SharedElementStackNavigator";
import { TabBarVisibilityProvider } from "../../Context";
import { useTabBarContext } from "../../Context/BottomTabBarVisibility/Context";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();
const BottomTabNavigator = () => {
  return (
    <TabBarVisibilityProvider>
      <Navigator
        tabBar={(props) => <TabBar {...props} />}
        initialRouteName="BottomTabHome"
        screenOptions={{ headerShown: false }}
        sceneContainerStyle={{ backgroundColor: "#fff" }}
      >
        <Screen name="BottomTabHome" component={SharedElementStackNavigator} />
        <Screen name="Cart" component={Cart} />
        <Screen name="Settings" component={Settings} />
        <Screen name="Bookmarks" component={Bookmarks} />
      </Navigator>
    </TabBarVisibilityProvider>
  );
};

export default BottomTabNavigator;

const TabBar = ({ navigation, state }: BottomTabBarProps) => {
  const { width } = useWindowDimensions();
  const { isTabBarVisible } = useTabBarContext();
  const animatedStyle = useAnimatedStyle(() => ({
    bottom: withSpring(isTabBarVisible.value ? 0 : -100),
  }));
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={[styles.tabBar, { width: width - 40 }]}>
        {state.routes.map((route, index) => {
          const isFocused = index === state.index;
          const onPress = () => {
            navigation.navigate(route.name);
          };
          return (
            <Pressable key={route.name} {...{ onPress }}>
              <Ionicons
                name={
                  index === 0
                    ? "home-outline"
                    : index === 1
                    ? "bookmark-outline"
                    : index === 2
                    ? "cart-outline"
                    : "settings-outline"
                }
                size={30}
                color={"black"}
                style={{ opacity: isFocused ? 1 : 0.2 }}
              />
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "transparent",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 10,
    marginVertical: 20,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
