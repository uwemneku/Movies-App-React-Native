import React, { useEffect, useState } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  /**base64 string or url for the image */
  uri: string;
  width: number;
  height: number;
}
const AppImage = ({ height, uri, width }: Props) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const loop = useSharedValue(0); // this will be used to control the animation of the image container

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(loop.value, [0, 1], ["black", "white"]), // animate the background color of the image container
  }));

  const animatedImageStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isImageLoading ? 0 : 1, { duration: 500 }), // fade in image when loaded
  }));

  useEffect(() => {
    let animationInterval: NodeJS.Timeout;

    //start animation when the component mounts
    animationInterval = setInterval(() => {
      loop.value = withTiming(loop.value === 1 ? 0 : 1, { duration: 500 });
    }, 250);

    //stop animation when the image is loaded
    !isImageLoading && clearInterval(animationInterval);
    return () => clearInterval(animationInterval); //cleanup
  }, [isImageLoading]);

  return (
    <Animated.View style={[{ width, height }, animatedContainerStyle]}>
      <Animated.Image
        {...{ height, width, source: { uri } }}
        style={[{ width, height }, animatedImageStyle]}
        onLoad={(e) => {
          setIsImageLoading(false);
        }}
        resizeMethod="auto"
        resizeMode="cover"
      />
    </Animated.View>
  );
};

export default React.memo(AppImage);
