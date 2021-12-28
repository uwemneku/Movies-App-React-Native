import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  uri: string;
  width: number;
  height: number;
  getURI?: (uri: string) => void;
}
const AppImage = ({ height, uri, width, getURI }: Props) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const loop = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(loop.value, [0, 1], ["black", "white"]),
  }));

  const animatedImageStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isImageLoading ? 0 : 1, { duration: 500 }),
  }));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      loop.value = withTiming(loop.value === 1 ? 0 : 1, { duration: 500 });
    }, 250);

    !isImageLoading && clearInterval(interval);
    return () => clearInterval(interval);
  }, [isImageLoading]);

  return (
    <Animated.View style={[{ width, height }, animatedContainerStyle]}>
      <Animated.Image
        {...{ height, width, source: { uri } }}
        style={[{ width, height }, animatedImageStyle]}
        onLoad={(e) => {
          setIsImageLoading(false);
          getURI && getURI(e.nativeEvent.source.uri);
          console.log(e.nativeEvent.source.uri);
        }}
        resizeMethod="auto"
        resizeMode="cover"
      />
    </Animated.View>
  );
};

export default AppImage;
