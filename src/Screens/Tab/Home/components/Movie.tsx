import { Ionicons } from "@expo/vector-icons";
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
import { useBookmark } from "../../../../Hooks";
import { StoredMovies } from "../../../../models/movie";
import { SharedScreenParamList } from "../../../../Navigation/types";
import api from "../../../../services/api";

//TODO: Fix the bug with nested navigation
type HomeScreenNavigationProps = StackNavigationProp<SharedScreenParamList>;

interface Props {
  data: StoredMovies;
  variant?: "vertical" | "horizontal";
}
const Movie = ({ data, variant = "horizontal" }: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const [addBookmark, removeBookmark, isBookmarked] = useBookmark(data.imdbID);
  const toggleBookmark = () =>
    isBookmarked ? removeBookmark() : addBookmark(data);
  const isHorizontal = variant === "horizontal";
  const handleNavigation = () => {
    navigation.navigate("BookDetails", data);
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
