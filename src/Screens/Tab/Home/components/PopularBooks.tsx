import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { AppImage, globalStyles, Loading } from "../../../../components";
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
interface Props {
  index: number;
  title: string;
}
const PopularBooks = ({ index: id, title }: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const { data, isLoading, isError } = api.useGetMoviesQuery(title);
  const handleNavigation = () => {
    if (data) {
      const {
        Poster: image,
        Director,
        Plot: description,
        imdbRating: rating,
      } = data;
      navigation.navigate("bookDetails", {
        image,
        id,
        title,
        Director,
        description,
        rating,
      });
    }
  };
  useEffect(() => {
    data && Image.prefetch(data.Poster).then((e) => console.log(e));
  }, [data]);

  return (
    <>
      {data ? (
        <Pressable onPress={handleNavigation}>
          <SharedElement id={`image-${id}`}>
            <AppImage height={192} width={126} uri={data.Poster} />
          </SharedElement>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.heading}>
            {data.Title}
          </Text>
          <Text style={globalStyles.author}>{data.Director}</Text>
        </Pressable>
      ) : (
        <Loading width={126} height={192} />
      )}
    </>
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
