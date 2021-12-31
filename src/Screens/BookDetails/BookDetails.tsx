import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { globalStyles } from "../../components";
import { SharedScreenParamList } from "../../Navigation/types";
import { useBookmark, useToggleTabBarVisibility } from "../../Hooks";

type BookDetailsScreenProps = StackScreenProps<
  SharedScreenParamList,
  "BookDetails"
>;

const BookDetails = ({ navigation, route }: BookDetailsScreenProps) => {
  const {
    Actors,
    Director,
    Plot,
    Poster: uri,
    imdbRating,
    Title,
    imdbID,
  } = route.params;
  const [addBookmark, removeBookmark, isBookmarked] = useBookmark();

  useToggleTabBarVisibility(navigation);

  const handleBackNavigation = () => navigation.goBack();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 20,
        }}
      >
        <Ionicons name="arrow-back" size={30} onPress={handleBackNavigation} />
      </View>
      <ScrollView>
        <View style={styles.flexItem}>
          <SharedElement id={`image-${imdbID}`}>
            <View>
              <Image
                source={{ uri }}
                width={10}
                height={10}
                resizeMode="cover"
                style={{ backgroundColor: "red", width: 211, height: 310 }}
              />
            </View>
          </SharedElement>
          <Text
            style={[
              globalStyles.heading,
              { textAlign: "center", marginVertical: 10 },
            ]}
          >
            {Title}
          </Text>
          <Text style={globalStyles.author}>{Director}</Text>
          <View>
            <Text style={globalStyles.author}>{imdbRating}/10</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[globalStyles.author, styles.description]}>{Plot}</Text>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("white", false)}
            onPress={() => addBookmark(route.params)}
          >
            <View style={styles.button}>
              <Text style={{ color: "white", fontSize: 20 }}>
                Add to bookmarks{" "}
                <Ionicons name="bookmarks-outline" color={"white"} size={20} />{" "}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  flexItem: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  description: {
    textAlign: "center",
    marginVertical: 10,
  },
});
