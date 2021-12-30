import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookmarksContext } from "../../../Context";
import { Movie } from "../Home/components";

const Bookmarks = () => {
  const { bookmarks, dispatch } = useBookmarksContext();
  return (
    <SafeAreaView>
      <FlatList
        data={bookmarks}
        renderItem={({ item }) => <Movie data={item} variant="vertical" />}
        numColumns={2}
        keyExtractor={(item) => item.imdbID}
      />
    </SafeAreaView>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({});
