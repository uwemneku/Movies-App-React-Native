import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Bookmarks, Cart, Home, Settings } from "../Screens";
import { BottomTabParamList } from "./types";
import { Ionicons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();
const BottomTabNavigator = () => {
  return (
    <Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      sceneContainerStyle={{ backgroundColor: "#fff" }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Cart" component={Cart} />
      <Screen name="Settings" component={Settings} />
      <Screen name="Bookmarks" component={Bookmarks} />
    </Navigator>
  );
};

export default BottomTabNavigator;

const TabBar = ({ navigation, state }: BottomTabBarProps) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
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
    </View>
  );
};
const icons = [
  "home-outline",
  "bookmark-outline",
  "cart-outline",
  "settings-outline",
];
const styles = StyleSheet.create({
  container: {
    bottom: 0,
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
