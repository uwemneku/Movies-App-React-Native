import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const NewBooks = () => {
  const [isBookmarked, setisBookmarked] = useState(false);
  const [rating, setRating] = useState<number>(2);
  const toggleBookmark = () => setisBookmarked(!isBookmarked);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../../assets/smallBook.png")}
        width={126}
        height={192}
        resizeMethod="auto"
        resizeMode="contain"
      />
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={styles.heading}>Fashionopolis</Text>
        <Text>Dana Thomas</Text>
        <View style={{ flexDirection: "row" }}>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  setRating(index);
                }}
              >
                <Star {...{ index, rating }} />
              </Pressable>
            );
          })}
        </View>
      </View>
      <Ionicons
        name={isBookmarked ? "bookmark" : "bookmark-outline"}
        size={30}
        color={"black"}
        onPress={toggleBookmark}
      />
    </View>
  );
};

export default NewBooks;

const Star = ({ rating, index }: { rating: number; index: number }) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(index <= rating);
  }, [rating]);
  return (
    <View style={styles.rating}>
      <Ionicons
        name={isActive ? "ios-star" : "star-outline"}
        size={15}
        color="#FFD700"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    marginRight: 5,
  },
});
