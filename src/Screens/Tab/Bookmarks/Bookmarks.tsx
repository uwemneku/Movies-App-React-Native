import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookmarksContext } from "../../../Context";
import { Movie } from "../Home/components";

const Bookmarks = () => {
  const { bookmarks, dispatch } = useBookmarksContext();
  const { width } = useWindowDimensions();
  const numColumns = Math.round(width / 200);

  return (
    <SafeAreaView>
      <FlatList
        key={numColumns} //forces a render when the number of columns changes. This is needed because the FlatList throws an error when the number of columns changes.
        data={bookmarks}
        renderItem={({ item }) => <Movie data={item} variant="vertical" />}
        columnWrapperStyle={{
          justifyContent: "space-between",
          padding: 20,
        }}
        contentContainerStyle={{ paddingBottom: 300 }}
        numColumns={numColumns}
        keyExtractor={(item) => item.imdbID}
      />
    </SafeAreaView>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({});
