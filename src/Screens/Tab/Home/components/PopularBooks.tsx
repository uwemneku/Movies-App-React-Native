import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import {
  BottomTabParamList,
  RootParamList,
  SharedScreenParamList,
} from "../../../../Navigation/types";

// type HomeScreenNavigationProps = CompositeNavigationProp<
//   StackNavigationProp<RootParamList, "main">,
//   BottomTabNavigationProp<BottomTabParamList>
// >;

type HomeScreenNavigationProps = StackNavigationProp<
  SharedScreenParamList,
  "Home"
>;
interface Props {
  index: number;
}
const PopularBooks = ({ index: id }: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const handleNavigation = () =>
    navigation.navigate("bookDetails", { image: "", id });
  return (
    <Pressable onPress={handleNavigation}>
      <SharedElement id={`image-${id}`}>
        <Image
          source={require("../../../../../assets/bigBook.png")}
          width={126}
          height={192}
          resizeMethod="auto"
          resizeMode="contain"
        />
      </SharedElement>
      <Text style={styles.heading}>Fashionopolis</Text>
      <Text>Dana Thomas</Text>
    </Pressable>
  );
};

export default PopularBooks;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
