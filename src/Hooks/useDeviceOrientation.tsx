import { useWindowDimensions } from "react-native";

const useDeviceOrientation = () => {
  const { width, height } = useWindowDimensions();
  return width > height ? "landscape" : "portrait";
};

export default useDeviceOrientation;

// LinkedIn: https://www.linkedin.com/in/uwemisrael/
