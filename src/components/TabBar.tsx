import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, FC } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTabBarContext } from "../Context";
import { useDeviceOrientation } from "../Hooks";
import { SharedScreenParamList } from "../Navigation/types";

type ScreenProps = StackNavigationProp<SharedScreenParamList>;
const TabBar = () => {
  const navigation = useNavigation<ScreenProps>();
  /**
   * A shared value to track the current tab index.
   * This is preferred to using a state because it helps prevent the entire
   * component from rerendering when the tab index changes.
   */
  const currentIndex = useSharedValue(1);
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
      <View
        style={[
          styles.tabBar,
          { width: width - (isOrientationLandscape ? 100 : 40) },
        ]}
      >
        {tabRoutes.map((route, index) => {
          const onPress = () => {
            currentIndex.value = index; // triggers opacity animation of the icon
            navigation.navigate(route);
          };
          return (
            <Pressable key={route} {...{ onPress }}>
              <IconWrapper {...{ index, currentIndex }}>
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
                />
              </IconWrapper>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
};

interface WrapperProps {
  index: number;
  currentIndex: Animated.SharedValue<number>;
}
/**This components allows us to change the opacity of its children based on a shared value (currentIndex) */
const IconWrapper: FC<WrapperProps> = ({ index, currentIndex, children }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(index === currentIndex.value ? 1 : 0.2),
  }));
  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
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

export default React.memo(TabBar);
