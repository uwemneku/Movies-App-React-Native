import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import {
  AppImage,
  globalStyles,
  Loading,
  Rating,
} from "../../../../components";
import { StoredMovies } from "../../../../models/movie";
import {
  BottomTabParamList,
  RootParamList,
  SharedScreenParamList,
} from "../../../../Navigation/types";
import api from "../../../../services/api";

type HomeScreenNavigationProps = StackNavigationProp<
  SharedScreenParamList,
  "Home"
>;

type Props1 = CompositeNavigationProp<
  StackNavigationProp<RootParamList>,
  StackNavigationProp<SharedScreenParamList>
>;

interface Props {
  data: StoredMovies;
  variant?: "vertical" | "horizontal";
}
const Movie = ({ data, variant = "horizontal" }: Props) => {
  const navigation = useNavigation<Props1>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const toggleBookmark = () => setIsBookmarked(!isBookmarked);
  const isHorizontal = variant === "horizontal";
  const handleNavigation = () => {
    navigation.navigate("bookDetails", data);
  };

  return (
    <Pressable
      onPress={handleNavigation}
      style={{
        flexDirection: isHorizontal ? "row" : "column",
        width: !isHorizontal ? 150 : undefined,
      }}
    >
      <SharedElement id={`image-${data.imdbID}`}>
        <AppImage height={192} width={126} uri={data.Poster} />
      </SharedElement>
      <View style={{ flex: 1, padding: isHorizontal ? 10 : 0 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.heading, { marginVertical: isHorizontal ? 5 : 10 }]}
        >
          {data.Title}
        </Text>
        <Text numberOfLines={2} style={globalStyles.author}>
          {data.Director}
        </Text>

        {isHorizontal && (
          <View>
            <Rating />
            <Text numberOfLines={2}>{data.Actors}</Text>
          </View>
        )}
      </View>
      {isHorizontal && (
        <Ionicons
          name={isBookmarked ? "bookmark" : "bookmark-outline"}
          size={30}
          color={"black"}
          onPress={toggleBookmark}
        />
      )}
    </Pressable>
  );
};

export default Movie;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
