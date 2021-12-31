import { useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTabBarContext } from "../Context";
import { SharedScreenParamList } from "../Navigation/types";

// This hooks is used to toggle the visibility of the bottom tab bar when navigating to a new screen.
const useToggleTabBarVisibility = (
  navigation: StackNavigationProp<SharedScreenParamList>
) => {
  const { isTabBarVisible } = useTabBarContext();

  //Show the tab bar when navigating back to the previous screen.
  useFocusEffect(
    useCallback(() => {
      isTabBarVisible.value = false;
    }, [])
  );

  //Hide the tab bar when navigating to a new screen.
  useEffect(() => {
    const showTabBar = () => (isTabBarVisible.value = true);
    navigation.addListener("beforeRemove", showTabBar);

    return () => {
      navigation.removeListener("beforeRemove", showTabBar);
    };
  }, []);
};

export default useToggleTabBarVisibility;
