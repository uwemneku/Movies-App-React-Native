import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useDeviceOrientation } from "../../../../Hooks";

interface Props {
  scrollY: Animated.SharedValue<number>;
  onPress: () => void;
}

const FAB = ({ onPress, scrollY }: Props) => {
  const isOrientationPortrait = useDeviceOrientation() === "portrait";
  const animatedStyle = useAnimatedStyle(() => ({
    right: withSpring(scrollY.value > 100 && isOrientationPortrait ? 20 : -400),
  }));
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Ionicons name="arrow-up" size={30} color="white" {...{ onPress }} />
    </Animated.View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 130,
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});
