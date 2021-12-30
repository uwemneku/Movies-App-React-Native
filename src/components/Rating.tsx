import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Rating = () => {
  const [rating, setRating] = useState<number>(2);
  return (
    <View style={{ flexDirection: "row", marginVertical: 10 }}>
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
  );
};

export default Rating;

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
