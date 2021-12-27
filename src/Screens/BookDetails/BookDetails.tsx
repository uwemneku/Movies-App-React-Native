import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { RootParamList } from "../../Navigation/types";

type BookDetailsScreenProps = StackScreenProps<RootParamList, "bookDetails">;

const BookDetails = ({ navigation, route }: BookDetailsScreenProps) => {
  const { id, image } = route.params;
  return (
    <View>
      <Text></Text>
      <SharedElement id={`image-${id}`}>
        <Image
          source={require("../../../assets/bigBook.png")}
          width={126}
          height={192}
          resizeMethod="auto"
          resizeMode="contain"
        />
      </SharedElement>
    </View>
  );
};

export default BookDetails;

const styles = StyleSheet.create({});
