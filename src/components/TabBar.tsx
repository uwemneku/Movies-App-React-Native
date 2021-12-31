import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useTabBarContext } from "../Context";
import { useDeviceOrientation } from "../Hooks";
import { SharedScreenParamList } from "../Navigation/types";

type ScreenProps = StackNavigationProp<SharedScreenParamList>;
const TabBar = () => {
  const navigation = useNavigation<ScreenProps>();
  const [currentIndex, setcurrentIndex] = useState(1);
  const tabRoutes: (keyof SharedScreenParamList)[] = [
    "Bookmarks",
    "Home",
    "Settings",
  ];
  const { width } = useWindowDimensions();
  const { isTabBarVisible } = useTabBarContext();
  const isOrientationLandscape = useDeviceOrientation() === "landscape";
  const animatedStyle = useAnimatedStyle(() => ({
    bottom: withSpring(isTabBarVisible.value ? 0 : -100),
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingBottom: isOrientationLandscape ? 0 : 10 },
        animatedStyle,
      ]}
    >
      <View style={[styles.tabBar, { width: width - 40 }]}>
        {tabRoutes.map((route, index) => {
          const isFocused = index === currentIndex;
          const onPress = () => {
            setcurrentIndex(index);
            navigation.navigate(route);
          };
          return (
            <Pressable key={route} {...{ onPress }}>
              <Ionicons
                name={
                  index === 0
                    ? "bookmark-outline"
                    : index === 1
                    ? "home-outline"
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

export default TabBar;
