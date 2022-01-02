import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  width: number;
  height: number;
}
const LoadingBooks = ({ height, width }: Props) => {
  const loop = useSharedValue(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      loop.value = withTiming(loop.value === 1 ? 0 : 1, { duration: 500 });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(loop.value, [0, 1], ["black", "white"]),
  }));

  return <Animated.View style={[{ width, height }, animatedContainerStyle]} />;
};

export default React.memo(LoadingBooks);

const styles = StyleSheet.create({});
